"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "./AuthContext"

interface Message {
  id: string
  type: "text" | "image" | "file"
  content: string
  senderId: string
  timestamp: Date
  fileName?: string
  fileSize?: number
  deliveredAt?: Date
  readBy?: string[]
}

interface ChatParticipant {
  id: string
  name: string
  avatar?: string
  role: "patient" | "physio" | "admin"
  isOnline: boolean
  specialization?: string
  rating?: number
  responseTime?: string
  isVerified?: boolean
}

interface ChatRoom {
  id: string
  participants: ChatParticipant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

interface ChatContextType {
  chatRooms: ChatRoom[]
  currentChatRoom: ChatRoom | null
  messages: Message[]
  isConnected: boolean
  typingUsers: string[]
  selectChatRoom: (roomId: string) => void
  sendMessage: (roomId: string, message: Omit<Message, "id" | "timestamp" | "deliveredAt" | "readBy">) => Promise<void>
  createChatRoom: (patientId: string, physioId: string) => Promise<string>
  uploadFile: (file: File) => Promise<string>
  markAsRead: (roomId: string, userId: string) => void
  startTyping: (roomId: string, userId: string) => void
  stopTyping: (roomId: string, userId: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

interface ChatProviderProps {
  children: React.ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const { user } = useAuth()
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)

  // Mock data for demonstration
  const mockParticipants: ChatParticipant[] = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "patient",
      isOnline: true,
    },
    {
      id: "2",
      name: "Dr. Emily Jones",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "physio",
      isOnline: true,
      specialization: "Orthopedic Physiotherapy",
      rating: 4.8,
      responseTime: "Usually responds within 2 hours",
      isVerified: true,
    },
    {
      id: "3",
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "patient",
      isOnline: false,
    },
    {
      id: "4",
      name: "Dr. Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "physio",
      isOnline: true,
      specialization: "Sports Physiotherapy",
      rating: 4.9,
      responseTime: "Usually responds within 1 hour",
      isVerified: true,
    },
  ]

  // Initialize mock chat rooms
  useEffect(() => {
    if (!user) return

    const mockChatRooms: ChatRoom[] = [
      {
        id: "room_1",
        participants: [mockParticipants.find((p) => p.id === "1")!, mockParticipants.find((p) => p.id === "2")!],
        lastMessage: {
          id: "msg_1",
          type: "text",
          content: "Thank you for the session today. I'm feeling much better!",
          senderId: "1",
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          deliveredAt: new Date(Date.now() - 299000),
          readBy: ["1", "2"],
        },
        unreadCount: user.id === "2" ? 0 : 1,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 300000),
      },
      {
        id: "room_2",
        participants: [mockParticipants.find((p) => p.id === "3")!, mockParticipants.find((p) => p.id === "4")!],
        lastMessage: {
          id: "msg_2",
          type: "text",
          content: "I'll send you the exercise plan shortly.",
          senderId: "4",
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          deliveredAt: new Date(Date.now() - 1799000),
          readBy: ["4"],
        },
        unreadCount: user.id === "3" ? 1 : 0,
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date(Date.now() - 1800000),
      },
    ]

    // Filter chat rooms based on user participation
    const userChatRooms = mockChatRooms.filter((room) => room.participants.some((p) => p.id === user.id))

    setChatRooms(userChatRooms)
  }, [user])

  // Mock WebSocket connection
  useEffect(() => {
    if (!user) return

    // Simulate WebSocket connection
    const connectWebSocket = () => {
      setIsConnected(false)

      // Simulate connection delay
      setTimeout(() => {
        setIsConnected(true)
        console.log("Chat WebSocket connected")
      }, 1000)

      // Simulate periodic connection issues
      const connectionInterval = setInterval(() => {
        const shouldDisconnect = Math.random() < 0.1 // 10% chance
        if (shouldDisconnect) {
          setIsConnected(false)
          setTimeout(() => setIsConnected(true), 2000)
        }
      }, 30000) // Check every 30 seconds

      return () => clearInterval(connectionInterval)
    }

    const cleanup = connectWebSocket()
    return cleanup
  }, [user])

  // Mock messages for current chat room
  useEffect(() => {
    if (!currentChatRoom) {
      setMessages([])
      return
    }

    const mockMessages: Message[] = [
      {
        id: "msg_1",
        type: "text",
        content: "Hello! I'm looking forward to our session today.",
        senderId: currentChatRoom.participants[0].id,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        deliveredAt: new Date(Date.now() - 3599000),
        readBy: [currentChatRoom.participants[0].id, currentChatRoom.participants[1].id],
      },
      {
        id: "msg_2",
        type: "text",
        content: "Great! I've reviewed your medical history. Let's start with some basic exercises.",
        senderId: currentChatRoom.participants[1].id,
        timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
        deliveredAt: new Date(Date.now() - 3299000),
        readBy: [currentChatRoom.participants[0].id, currentChatRoom.participants[1].id],
      },
      {
        id: "msg_3",
        type: "image",
        content: "/placeholder.svg?height=200&width=300",
        senderId: currentChatRoom.participants[1].id,
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        fileName: "exercise_plan.jpg",
        deliveredAt: new Date(Date.now() - 1799000),
        readBy: [currentChatRoom.participants[1].id],
      },
      {
        id: "msg_4",
        type: "text",
        content: "Thank you for the exercise plan! I'll start with these today.",
        senderId: currentChatRoom.participants[0].id,
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        deliveredAt: new Date(Date.now() - 899000),
        readBy: [currentChatRoom.participants[0].id, currentChatRoom.participants[1].id],
      },
      {
        id: "msg_5",
        type: "text",
        content:
          "Perfect! Remember to take it slow and stop if you feel any pain. How are you feeling after yesterday's session?",
        senderId: currentChatRoom.participants[1].id,
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        deliveredAt: new Date(Date.now() - 599000),
        readBy: [currentChatRoom.participants[1].id],
      },
    ]

    setMessages(mockMessages)
  }, [currentChatRoom])

  const selectChatRoom = useCallback(
    (roomId: string) => {
      const room = chatRooms.find((r) => r.id === roomId)
      if (room) {
        setCurrentChatRoom(room)
        // Mark as read
        if (user) {
          markAsRead(roomId, user.id)
        }
      }
    },
    [chatRooms, user],
  )

  const sendMessage = useCallback(
    async (roomId: string, messageData: Omit<Message, "id" | "timestamp" | "deliveredAt" | "readBy">) => {
      if (!isConnected) {
        throw new Error("Not connected to chat server")
      }

      const newMessage: Message = {
        ...messageData,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        deliveredAt: new Date(),
        readBy: [messageData.senderId],
      }

      // Add message to current messages
      setMessages((prev) => [...prev, newMessage])

      // Update chat room's last message
      setChatRooms((prev) =>
        prev.map((room) =>
          room.id === roomId
            ? {
                ...room,
                lastMessage: newMessage,
                updatedAt: new Date(),
                unreadCount: messageData.senderId === user?.id ? room.unreadCount : room.unreadCount + 1,
              }
            : room,
        ),
      )

      // Simulate message delivery and read receipts
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id
              ? { ...msg, readBy: [...(msg.readBy || []), ...(currentChatRoom?.participants.map((p) => p.id) || [])] }
              : msg,
          ),
        )
      }, 1000)

      // Stop typing indicator
      if (user) {
        stopTyping(roomId, user.id)
      }
    },
    [isConnected, user, currentChatRoom],
  )

  const createChatRoom = useCallback(
    async (patientId: string, physioId: string): Promise<string> => {
      if (!isConnected) {
        throw new Error("Not connected to chat server")
      }

      // Check if chat room already exists
      const existingRoom = chatRooms.find(
        (room) => room.participants.some((p) => p.id === patientId) && room.participants.some((p) => p.id === physioId),
      )

      if (existingRoom) {
        setCurrentChatRoom(existingRoom)
        return existingRoom.id
      }

      // Create new chat room
      const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const patient = mockParticipants.find((p) => p.id === patientId)
      const physio = mockParticipants.find((p) => p.id === physioId)

      if (!patient || !physio) {
        throw new Error("Participants not found")
      }

      const newRoom: ChatRoom = {
        id: roomId,
        participants: [patient, physio],
        unreadCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setChatRooms((prev) => [newRoom, ...prev])
      setCurrentChatRoom(newRoom)

      return roomId
    },
    [isConnected, chatRooms],
  )

  const uploadFile = useCallback(
    async (file: File): Promise<string> => {
      if (!isConnected) {
        throw new Error("Not connected to chat server")
      }

      // Simulate file upload
      return new Promise((resolve) => {
        setTimeout(() => {
          // Return a mock URL
          const fileUrl = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(file.name)}`
          resolve(fileUrl)
        }, 2000)
      })
    },
    [isConnected],
  )

  const markAsRead = useCallback(
    (roomId: string, userId: string) => {
      setChatRooms((prev) =>
        prev.map((room) =>
          room.id === roomId ? { ...room, unreadCount: userId === user?.id ? 0 : room.unreadCount } : room,
        ),
      )

      // Mark messages as read
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          readBy: msg.readBy?.includes(userId) ? msg.readBy : [...(msg.readBy || []), userId],
        })),
      )
    },
    [user],
  )

  const startTyping = useCallback((roomId: string, userId: string) => {
    setTypingUsers((prev) => (prev.includes(userId) ? prev : [...prev, userId]))
  }, [])

  const stopTyping = useCallback((roomId: string, userId: string) => {
    setTypingUsers((prev) => prev.filter((id) => id !== userId))
  }, [])

  const value: ChatContextType = {
    chatRooms,
    currentChatRoom,
    messages,
    isConnected,
    typingUsers,
    selectChatRoom,
    sendMessage,
    createChatRoom,
    uploadFile,
    markAsRead,
    startTyping,
    stopTyping,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
