"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Paperclip,
  ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Check,
  CheckCheck,
  Clock,
  X,
  Download,
} from "lucide-react"
import { useChat } from "../../contexts/ChatContext"
import { useAuth } from "../../contexts/AuthContext"
import { MessageSquare } from "lucide-react" // Declare MessageSquare here

interface ChatInterfaceProps {
  className?: string
}

export function ChatInterface({ className = "" }: ChatInterfaceProps) {
  const { user } = useAuth()
  const { currentChatRoom, messages, sendMessage, uploadFile, typingUsers, isConnected, markAsRead } = useChat()

  const [messageText, setMessageText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mark messages as read when chat room changes
  useEffect(() => {
    if (currentChatRoom && user) {
      markAsRead(currentChatRoom.id, user.id)
    }
  }, [currentChatRoom, user, markAsRead])

  // Handle typing indicator
  useEffect(() => {
    if (isTyping) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [isTyping])

  const handleSendMessage = async () => {
    if (!messageText.trim() || !currentChatRoom || !user) return

    try {
      await sendMessage(currentChatRoom.id, {
        type: "text",
        content: messageText.trim(),
        senderId: user.id,
      })
      setMessageText("")
      setIsTyping(false)
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!currentChatRoom || !user) return

    setSelectedFile(file)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      const fileUrl = await uploadFile(file)

      clearInterval(progressInterval)
      setUploadProgress(100)

      await sendMessage(currentChatRoom.id, {
        type: file.type.startsWith("image/") ? "image" : "file",
        content: fileUrl,
        senderId: user.id,
        fileName: file.name,
        fileSize: file.size,
      })

      setTimeout(() => {
        setSelectedFile(null)
        setUploadProgress(0)
      }, 1000)
    } catch (error) {
      console.error("Failed to upload file:", error)
      setSelectedFile(null)
      setUploadProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    } else if (e.key !== "Enter") {
      if (!isTyping) {
        setIsTyping(true)
      }
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`

    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true)
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getMessageStatus = (message: any) => {
    if (message.senderId !== user?.id) return null

    if (message.readBy && message.readBy.length > 1) {
      return <CheckCheck className="w-4 h-4 text-blue-500" />
    } else if (message.deliveredAt) {
      return <CheckCheck className="w-4 h-4 text-gray-400" />
    } else {
      return <Check className="w-4 h-4 text-gray-400" />
    }
  }

  const otherParticipant = currentChatRoom?.participants.find((p) => p.id !== user?.id)
  const currentTypingUsers = typingUsers.filter((userId) => userId !== user?.id)

  if (!currentChatRoom) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-600">Choose a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col bg-white ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={otherParticipant?.avatar || "/placeholder.svg?height=40&width=40"}
              alt={otherParticipant?.name}
              className="w-10 h-10 rounded-full"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                otherParticipant?.isOnline ? "bg-green-400" : "bg-gray-400"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{otherParticipant?.name}</h3>
            <p className="text-sm text-gray-600">
              {otherParticipant?.role === "physio" ? otherParticipant.specialization : "Patient"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Voice Call"
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Video Call"
          >
            <Video className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="More Options"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === user?.id
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId
          const showTime =
            index === messages.length - 1 ||
            messages[index + 1].senderId !== message.senderId ||
            new Date(messages[index + 1].timestamp).getTime() - new Date(message.timestamp).getTime() > 300000 // 5 minutes

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {!isOwnMessage && showAvatar && (
                  <img
                    src={otherParticipant?.avatar || "/placeholder.svg?height=32&width=32"}
                    alt={otherParticipant?.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                {!isOwnMessage && !showAvatar && <div className="w-8" />}

                <div
                  className={`relative ${isOwnMessage ? "bg-blue-600 text-white" : "bg-white text-gray-900"} rounded-lg px-4 py-2 shadow-sm`}
                >
                  {message.type === "text" && <p className="text-sm whitespace-pre-wrap">{message.content}</p>}

                  {message.type === "image" && (
                    <div className="space-y-2">
                      <img
                        src={message.content || "/placeholder.svg"}
                        alt="Shared image"
                        className="max-w-full h-auto rounded-lg cursor-pointer"
                        onClick={() => setShowImagePreview(message.content)}
                      />
                      {message.fileName && <p className="text-xs opacity-75">{message.fileName}</p>}
                    </div>
                  )}

                  {message.type === "file" && (
                    <div className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg">
                      <div className="flex-shrink-0">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{message.fileName}</p>
                        {message.fileSize && (
                          <p className="text-xs text-gray-500">{formatFileSize(message.fileSize)}</p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Download className="w-4 h-4 text-gray-500" />
                      </motion.button>
                    </div>
                  )}

                  {showTime && (
                    <div
                      className={`flex items-center justify-end space-x-1 mt-1 ${isOwnMessage ? "text-blue-200" : "text-gray-500"}`}
                    >
                      <span className="text-xs">{formatTime(new Date(message.timestamp))}</span>
                      {isOwnMessage && getMessageStatus(message)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Typing Indicator */}
        <AnimatePresence>
          {currentTypingUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start"
            >
              <div className="flex items-end space-x-2">
                <img
                  src={otherParticipant?.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={otherParticipant?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Progress */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-blue-50 border-t border-blue-200"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {selectedFile.type.startsWith("image/") ? (
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                ) : (
                  <Paperclip className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-900 truncate">{selectedFile.name}</p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-blue-600">{uploadProgress}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-3">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Add Emoji"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={messageText}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none max-h-32"
              rows={1}
              disabled={!isConnected}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!messageText.trim() || !isConnected}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {!isConnected && (
          <div className="flex items-center space-x-2 mt-2 text-sm text-red-600">
            <Clock className="w-4 h-4" />
            <span>Connecting...</span>
          </div>
        )}
      </div>

      {/* Drag Overlay */}
      <AnimatePresence>
        {dragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center z-50"
          >
            <div className="text-center text-white">
              <div className="w-16 h-16 border-4 border-white border-dashed rounded-lg flex items-center justify-center mx-auto mb-4">
                <Paperclip className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drop file to upload</h3>
              <p className="text-blue-200">Release to send the file</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showImagePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setShowImagePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-4xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={showImagePreview || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowImagePreview(null)}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileUpload(file)
          }
        }}
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  )
}
