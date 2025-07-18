"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Menu } from "lucide-react"
import { ChatSidebar } from "../components/chat/ChatSidebar"
import { ChatInterface } from "../components/chat/ChatInterface"
import { useChat } from "../contexts/ChatContext"
import { useAuth } from "../contexts/AuthContext"

export function ChatPage() {
  const { user } = useAuth()
  const { chatRooms, currentChatRoom, isConnected } = useChat()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const unreadCount = chatRooms.reduce((total, room) => total + room.unreadCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
              <span className="text-sm text-gray-600">{isConnected ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen lg:h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div
          className={`${
            isMobile
              ? `fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-80 flex-shrink-0"
          }`}
        >
          <ChatSidebar className="h-full" onClose={isMobile ? () => setIsSidebarOpen(false) : undefined} />
        </div>

        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {!isMobile && (
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
                  <span className="text-sm text-gray-600">{isConnected ? "Online" : "Offline"}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            <ChatInterface className="h-full" />
          </div>
        </div>
      </div>

      {/* Welcome Message for New Users */}
      {chatRooms.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-50"
        >
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ReeHub Chat</h2>
            <p className="text-gray-600 mb-6">
              {user?.role === "patient"
                ? "Connect with your physiotherapist for personalized care and support. Book a session to start your conversation."
                : user?.role === "physio"
                  ? "Communicate with your patients to provide better care and support. Accept patient requests to start conversations."
                  : "Monitor and manage all platform conversations from this central hub."}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Secure messaging</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>Real-time chat</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>File sharing</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
