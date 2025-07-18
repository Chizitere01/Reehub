"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, MessageSquare, X, Star, Clock, CheckCircle } from "lucide-react"
import { useChat } from "../../contexts/ChatContext"
import { useAuth } from "../../contexts/AuthContext"

interface ChatSidebarProps {
  className?: string
  onClose?: () => void
  showNewChatButton?: boolean
  onNewChat?: () => void
}

export function ChatSidebar({ className = "", onClose, showNewChatButton = true, onNewChat }: ChatSidebarProps) {
  const { user } = useAuth()
  const { chatRooms, currentChatRoom, selectChatRoom, isConnected } = useChat()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChatRooms = chatRooms.filter((room) => {
    const otherParticipant = room.participants.find((p) => p.id !== user?.id)
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return date.toLocaleDateString()
  }

  const truncateMessage = (message: string, maxLength = 50) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + "..."
  }

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
          </div>
          <div className="flex items-center space-x-2">
            {showNewChatButton && onNewChat && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNewChat}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="New Chat"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </motion.button>
            )}
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatRooms.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </h3>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? "Try adjusting your search terms"
                : user?.role === "patient"
                  ? "Start a conversation with a physiotherapist"
                  : "Accept patient requests to start conversations"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredChatRooms.map((room) => {
              const otherParticipant = room.participants.find((p) => p.id !== user?.id)
              const isSelected = currentChatRoom?.id === room.id
              const hasUnread = room.unreadCount > 0

              return (
                <motion.div
                  key={room.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  onClick={() => selectChatRoom(room.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? "bg-blue-50 border-r-2 border-blue-600" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={otherParticipant?.avatar || "/placeholder.svg?height=48&width=48"}
                        alt={otherParticipant?.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          otherParticipant?.isOnline ? "bg-green-400" : "bg-gray-400"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium truncate ${hasUnread ? "text-gray-900" : "text-gray-700"}`}>
                          {otherParticipant?.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {room.lastMessage && (
                            <span className="text-xs text-gray-500">
                              {formatTime(new Date(room.lastMessage.timestamp))}
                            </span>
                          )}
                          {hasUnread && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {room.unreadCount > 99 ? "99+" : room.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm truncate ${hasUnread ? "font-medium text-gray-900" : "text-gray-600"}`}
                          >
                            {room.lastMessage
                              ? room.lastMessage.type === "text"
                                ? truncateMessage(room.lastMessage.content)
                                : room.lastMessage.type === "image"
                                  ? "📷 Image"
                                  : "📎 File"
                              : "No messages yet"}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {otherParticipant?.role === "physio" ? otherParticipant.specialization : "Patient"}
                            </span>
                            {otherParticipant?.role === "physio" && otherParticipant.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">{otherParticipant.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info for Physio */}
                  {otherParticipant?.role === "physio" && (
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      {otherParticipant.responseTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{otherParticipant.responseTime}</span>
                        </div>
                      )}
                      {otherParticipant.isVerified && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">{isConnected ? "Connected" : "Connecting..."}</p>
          <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-gray-400">
            <span>🔒 End-to-end encrypted</span>
            <span>📱 Mobile ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}
