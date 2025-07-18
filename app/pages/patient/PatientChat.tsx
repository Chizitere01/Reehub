"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Plus, Search, Filter, Star, Clock, CheckCircle, X } from "lucide-react"
import { ChatSidebar } from "../../components/chat/ChatSidebar"
import { ChatInterface } from "../../components/chat/ChatInterface"
import { useChat } from "../../contexts/ChatContext"
import { useAuth } from "../../contexts/AuthContext"

interface PhysiotherapistCard {
  id: string
  name: string
  avatar: string
  specialization: string
  rating: number
  responseTime: string
  isOnline: boolean
  hasActiveChat: boolean
}

export function PatientChat() {
  const { user } = useAuth()
  const { chatRooms, currentChatRoom, isConnected, createChatRoom } = useChat()
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mock physiotherapists data
  const [physiotherapists] = useState<PhysiotherapistCard[]>([
    {
      id: "2",
      name: "Dr. Emily Jones",
      avatar: "/placeholder.svg?height=60&width=60",
      specialization: "Orthopedic Physiotherapy",
      rating: 4.8,
      responseTime: "Usually responds within 2 hours",
      isOnline: true,
      hasActiveChat: true,
    },
    {
      id: "4",
      name: "Dr. Michael Brown",
      avatar: "/placeholder.svg?height=60&width=60",
      specialization: "Sports Physiotherapy",
      rating: 4.9,
      responseTime: "Usually responds within 1 hour",
      isOnline: true,
      hasActiveChat: false,
    },
    {
      id: "6",
      name: "Dr. Sarah Davis",
      avatar: "/placeholder.svg?height=60&width=60",
      specialization: "Neurological Rehabilitation",
      rating: 4.7,
      responseTime: "Usually responds within 3 hours",
      isOnline: false,
      hasActiveChat: false,
    },
    {
      id: "7",
      name: "Dr. Raj Kumar",
      avatar: "/placeholder.svg?height=60&width=60",
      specialization: "Pediatric Physiotherapy",
      rating: 4.6,
      responseTime: "Usually responds within 4 hours",
      isOnline: true,
      hasActiveChat: false,
    },
  ])

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

  const filteredPhysiotherapists = physiotherapists.filter((physio) => {
    const matchesSearch =
      physio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      physio.specialization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty =
      selectedSpecialty === "all" || physio.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase())

    return matchesSearch && matchesSpecialty
  })

  const handleStartChat = async (physioId: string) => {
    if (!user) return

    try {
      const roomId = await createChatRoom(user.id, physioId)
      setShowNewChatModal(false)
      // The chat room will be automatically selected by the context
    } catch (error) {
      console.error("Failed to create chat room:", error)
    }
  }

  const unreadCount = chatRooms.reduce((total, room) => total + room.unreadCount, 0)
  const specialties = ["all", "orthopedic", "sports", "neurological", "pediatric"]

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
                <MessageSquare className="w-5 h-5" />
              </motion.button>
              <h1 className="text-xl font-bold text-gray-900">My Conversations</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewChatModal(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
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
          <ChatSidebar
            className="h-full"
            onClose={isMobile ? () => setIsSidebarOpen(false) : undefined}
            showNewChatButton={!isMobile}
            onNewChat={() => setShowNewChatModal(true)}
          />
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
                  <h1 className="text-xl font-bold text-gray-900">My Conversations</h1>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
                    <span className="text-sm text-gray-600">{isConnected ? "Online" : "Offline"}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewChatModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Chat</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            {currentChatRoom ? (
              <ChatInterface className="h-full" />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex items-center justify-center bg-gray-50"
              >
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {chatRooms.length === 0 ? "Start Your First Conversation" : "Select a Conversation"}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {chatRooms.length === 0
                      ? "Connect with qualified physiotherapists for personalized care and support."
                      : "Choose a conversation from the sidebar to continue chatting with your physiotherapist."}
                  </p>
                  {chatRooms.length === 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNewChatModal(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Start New Chat</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      <AnimatePresence>
        {showNewChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowNewChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Start New Conversation</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewChatModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search physiotherapists..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty === "all"
                            ? "All Specialties"
                            : specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPhysiotherapists.map((physio) => (
                    <motion.div
                      key={physio.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={physio.avatar || "/placeholder.svg"}
                            alt={physio.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              physio.isOnline ? "bg-green-400" : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{physio.name}</h4>
                            {physio.hasActiveChat && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{physio.specialization}</p>
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{physio.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">{physio.responseTime}</span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleStartChat(physio.id)}
                            disabled={physio.hasActiveChat}
                            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                              physio.hasActiveChat
                                ? "bg-green-100 text-green-800 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {physio.hasActiveChat ? "Active Chat" : "Start Chat"}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredPhysiotherapists.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No physiotherapists found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
