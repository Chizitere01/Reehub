"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Users,
  AlertTriangle,
  Eye,
  Flag,
  Shield,
  Search,
  Filter,
  Download,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  User,
  TrendingUp,
  Activity,
  X,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

interface ChatReport {
  id: string
  reportedBy: {
    id: string
    name: string
    role: "patient" | "physio"
  }
  chatRoomId: string
  participants: {
    patient: { id: string; name: string }
    physio: { id: string; name: string }
  }
  reason: "inappropriate" | "spam" | "harassment" | "privacy" | "other"
  description: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high" | "urgent"
  reportedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  resolution?: string
}

interface ChatAnalytics {
  totalConversations: number
  activeConversations: number
  totalMessages: number
  reportsCount: number
  averageResponseTime: string
  satisfactionScore: number
  flaggedConversations: number
  complianceScore: number
}

interface ConversationSummary {
  id: string
  participants: {
    patient: { id: string; name: string; avatar?: string }
    physio: { id: string; name: string; avatar?: string; specialization?: string }
  }
  messageCount: number
  lastActivity: Date
  duration: string
  status: "active" | "inactive" | "flagged" | "archived"
  riskLevel: "low" | "medium" | "high"
  complianceFlags: string[]
  satisfactionRating?: number
}

export function AdminChat() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"overview" | "conversations" | "reports" | "analytics">("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "flagged" | "reported">("all")
  const [selectedConversation, setSelectedConversation] = useState<ConversationSummary | null>(null)
  const [showConversationDetails, setShowConversationDetails] = useState(false)

  // Mock data
  const [analytics] = useState<ChatAnalytics>({
    totalConversations: 1247,
    activeConversations: 156,
    totalMessages: 45678,
    reportsCount: 12,
    averageResponseTime: "2.3 hours",
    satisfactionScore: 4.6,
    flaggedConversations: 8,
    complianceScore: 98.5,
  })

  const [reports, setReports] = useState<ChatReport[]>([
    {
      id: "RPT001",
      reportedBy: {
        id: "1",
        name: "John Doe",
        role: "patient",
      },
      chatRoomId: "room_1",
      participants: {
        patient: { id: "1", name: "John Doe" },
        physio: { id: "2", name: "Dr. Emily Jones" },
      },
      reason: "inappropriate",
      description: "Unprofessional language used during consultation discussion",
      status: "pending",
      priority: "high",
      reportedAt: new Date("2025-01-20T14:30:00"),
    },
    {
      id: "RPT002",
      reportedBy: {
        id: "3",
        name: "Sarah Wilson",
        role: "patient",
      },
      chatRoomId: "room_2",
      participants: {
        patient: { id: "3", name: "Sarah Wilson" },
        physio: { id: "4", name: "Dr. Michael Brown" },
      },
      reason: "privacy",
      description: "Sharing personal information inappropriately",
      status: "reviewed",
      priority: "medium",
      reportedAt: new Date("2025-01-19T11:15:00"),
      reviewedAt: new Date("2025-01-20T09:00:00"),
      reviewedBy: "Admin",
      resolution: "Warning issued to physiotherapist. Additional privacy training scheduled.",
    },
  ])

  const [conversations] = useState<ConversationSummary[]>([
    {
      id: "room_1",
      participants: {
        patient: {
          id: "1",
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        physio: {
          id: "2",
          name: "Dr. Emily Jones",
          avatar: "/placeholder.svg?height=40&width=40",
          specialization: "Orthopedic Physiotherapy",
        },
      },
      messageCount: 45,
      lastActivity: new Date("2025-01-20T15:30:00"),
      duration: "5 days",
      status: "flagged",
      riskLevel: "high",
      complianceFlags: ["inappropriate-language", "privacy-concern"],
      satisfactionRating: 3.2,
    },
    {
      id: "room_2",
      participants: {
        patient: {
          id: "3",
          name: "Sarah Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        physio: {
          id: "4",
          name: "Dr. Michael Brown",
          avatar: "/placeholder.svg?height=40&width=40",
          specialization: "Sports Physiotherapy",
        },
      },
      messageCount: 28,
      lastActivity: new Date("2025-01-20T12:45:00"),
      duration: "3 days",
      status: "active",
      riskLevel: "low",
      complianceFlags: [],
      satisfactionRating: 4.8,
    },
    {
      id: "room_3",
      participants: {
        patient: {
          id: "5",
          name: "Raj Patel",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        physio: {
          id: "2",
          name: "Dr. Emily Jones",
          avatar: "/placeholder.svg?height=40&width=40",
          specialization: "Orthopedic Physiotherapy",
        },
      },
      messageCount: 67,
      lastActivity: new Date("2025-01-20T10:20:00"),
      duration: "8 days",
      status: "active",
      riskLevel: "medium",
      complianceFlags: ["long-conversation"],
      satisfactionRating: 4.5,
    },
  ])

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participants.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participants.physio.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && conv.status === "active") ||
      (filterStatus === "flagged" && conv.status === "flagged") ||
      (filterStatus === "reported" && reports.some((r) => r.chatRoomId === conv.id))

    return matchesSearch && matchesFilter
  })

  const handleReportAction = (reportId: string, action: "approve" | "dismiss", resolution?: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: action === "approve" ? "resolved" : "dismissed",
              reviewedAt: new Date(),
              reviewedBy: user?.name || "Admin",
              resolution: resolution || (action === "dismiss" ? "Report dismissed after review" : "Issue resolved"),
            }
          : report,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "archived":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat Administration</h1>
          <p className="text-gray-600">Monitor conversations, handle reports, and ensure platform compliance</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "conversations", label: "Conversations", icon: MessageSquare },
              { id: "reports", label: "Reports", icon: Flag },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {tab.id === "reports" && reports.filter((r) => r.status === "pending").length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {reports.filter((r) => r.status === "pending").length}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Conversations",
                  value: analytics.totalConversations.toLocaleString(),
                  icon: MessageSquare,
                  color: "bg-blue-500",
                  change: "+12%",
                },
                {
                  title: "Active Chats",
                  value: analytics.activeConversations.toString(),
                  icon: Users,
                  color: "bg-green-500",
                  change: "+8%",
                },
                {
                  title: "Pending Reports",
                  value: reports.filter((r) => r.status === "pending").length.toString(),
                  icon: Flag,
                  color: "bg-red-500",
                  change: "-15%",
                },
                {
                  title: "Compliance Score",
                  value: `${analytics.complianceScore}%`,
                  icon: Shield,
                  color: "bg-purple-500",
                  change: "+2%",
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <span className="text-sm text-green-600 font-medium">{metric.change}</span>
                    </div>
                    <div className={`${metric.color} p-3 rounded-lg`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Flagged Conversations */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Flagged Conversations</h3>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="space-y-4">
                  {conversations
                    .filter((conv) => conv.status === "flagged")
                    .slice(0, 3)
                    .map((conv) => (
                      <div key={conv.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={conv.participants.patient.avatar || "/placeholder.svg"}
                              alt={conv.participants.patient.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-medium text-sm">{conv.participants.patient.name}</span>
                            <span className="text-gray-400">↔</span>
                            <img
                              src={conv.participants.physio.avatar || "/placeholder.svg"}
                              alt={conv.participants.physio.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-medium text-sm">{conv.participants.physio.name}</span>
                          </div>
                          <span className={`text-xs font-medium ${getRiskColor(conv.riskLevel)}`}>
                            {conv.riskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {conv.complianceFlags.map((flag) => (
                            <span key={flag} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              {flag.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{conv.messageCount} messages</span>
                          <span>{new Date(conv.lastActivity).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Reports</h3>
                  <Flag className="w-5 h-5 text-orange-500" />
                </div>
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm">{report.reportedBy.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            report.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : report.status === "resolved"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Reason: {report.reason}</span>
                        <span>{new Date(report.reportedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Conversations Tab */}
        {activeTab === "conversations" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Conversations</option>
                    <option value="active">Active</option>
                    <option value="flagged">Flagged</option>
                    <option value="reported">Reported</option>
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Participants
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Messages
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredConversations.map((conversation) => (
                      <motion.tr
                        key={conversation.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              <img
                                src={conversation.participants.patient.avatar || "/placeholder.svg"}
                                alt={conversation.participants.patient.name}
                                className="w-8 h-8 rounded-full border-2 border-white"
                              />
                              <img
                                src={conversation.participants.physio.avatar || "/placeholder.svg"}
                                alt={conversation.participants.physio.name}
                                className="w-8 h-8 rounded-full border-2 border-white"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {conversation.participants.patient.name}
                              </div>
                              <div className="text-sm text-gray-500">{conversation.participants.physio.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{conversation.messageCount}</div>
                          <div className="text-sm text-gray-500">Duration: {conversation.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(conversation.status)}`}
                          >
                            {conversation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getRiskColor(conversation.riskLevel)}`}>
                            {conversation.riskLevel.toUpperCase()}
                          </span>
                          {conversation.complianceFlags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {conversation.complianceFlags.slice(0, 2).map((flag) => (
                                <span key={flag} className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0.5 rounded">
                                  {flag.replace("-", " ")}
                                </span>
                              ))}
                              {conversation.complianceFlags.length > 2 && (
                                <span className="text-xs text-gray-500">
                                  +{conversation.complianceFlags.length - 2} more
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(conversation.lastActivity).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedConversation(conversation)
                                setShowConversationDetails(true)
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded transition-colors"
                              title="More Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Chat Reports Management</h3>
              <div className="space-y-4">
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Flag className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Report #{report.id}</h4>
                          <p className="text-sm text-gray-600">
                            Reported by {report.reportedBy.name} ({report.reportedBy.role})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}
                        >
                          {report.priority}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            report.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : report.status === "resolved"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Conversation Participants</h5>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{report.participants.patient.name} (Patient)</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{report.participants.physio.name} (Physiotherapist)</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Report Details</h5>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-gray-400" />
                          <span className="text-sm capitalize">{report.reason.replace("-", " ")}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{new Date(report.reportedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{report.description}</p>
                    </div>

                    {report.resolution && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Resolution</h5>
                        <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">{report.resolution}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3" />
                          <span>
                            Reviewed by {report.reviewedBy} on{" "}
                            {report.reviewedAt && new Date(report.reviewedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {report.status === "pending" && (
                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const resolution = prompt("Enter resolution details:")
                            if (resolution) {
                              handleReportAction(report.id, "approve", resolution)
                            }
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Resolve</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleReportAction(report.id, "dismiss")}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Dismiss</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedConversation(conversations.find((c) => c.id === report.chatRoomId) || null)
                            setShowConversationDetails(true)
                          }}
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Conversation</span>
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Communication Health */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Communication Health</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Response Time</span>
                    <span className="font-semibold">{analytics.averageResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Satisfaction Score</span>
                    <span className="font-semibold">{analytics.satisfactionScore}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compliance Rate</span>
                    <span className="font-semibold text-green-600">{analytics.complianceScore}%</span>
                  </div>
                </div>
              </div>

              {/* Risk Distribution */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  {[
                    { level: "Low Risk", count: 1156, color: "bg-green-500" },
                    { level: "Medium Risk", count: 83, color: "bg-yellow-500" },
                    { level: "High Risk", count: 8, color: "bg-red-500" },
                  ].map((risk) => (
                    <div key={risk.level} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${risk.color}`} />
                        <span className="text-sm text-gray-600">{risk.level}</span>
                      </div>
                      <span className="font-semibold">{risk.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Trends */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Report Trends</h3>
                <div className="space-y-3">
                  {[
                    { type: "Inappropriate Content", count: 5, trend: "↓" },
                    { type: "Privacy Concerns", count: 4, trend: "→" },
                    { type: "Harassment", count: 2, trend: "↓" },
                    { type: "Spam", count: 1, trend: "↓" },
                  ].map((report) => (
                    <div key={report.type} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{report.type}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{report.count}</span>
                        <span
                          className={`text-sm ${
                            report.trend === "↓"
                              ? "text-green-600"
                              : report.trend === "↑"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {report.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Platform Usage Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Message Volume</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Messages</span>
                      <span className="font-semibold">{analytics.totalMessages.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily Average</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Peak Hour</span>
                      <span className="font-semibold">2:00 PM - 3:00 PM</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">User Engagement</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="font-semibold">892</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Session Duration</span>
                      <span className="font-semibold">12.5 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Return Rate</span>
                      <span className="font-semibold">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Conversation Details Modal */}
        <AnimatePresence>
          {showConversationDetails && selectedConversation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowConversationDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Conversation Details</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowConversationDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    {/* Participants */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Participants</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={selectedConversation.participants.patient.avatar || "/placeholder.svg"}
                            alt={selectedConversation.participants.patient.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{selectedConversation.participants.patient.name}</p>
                            <p className="text-sm text-gray-600">Patient</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={selectedConversation.participants.physio.avatar || "/placeholder.svg"}
                            alt={selectedConversation.participants.physio.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{selectedConversation.participants.physio.name}</p>
                            <p className="text-sm text-gray-600">
                              {selectedConversation.participants.physio.specialization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conversation Stats */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Statistics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">{selectedConversation.messageCount}</p>
                          <p className="text-sm text-gray-600">Messages</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">{selectedConversation.duration}</p>
                          <p className="text-sm text-gray-600">Duration</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className={`text-2xl font-bold ${getRiskColor(selectedConversation.riskLevel)}`}>
                            {selectedConversation.riskLevel.toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-600">Risk Level</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900">
                            {selectedConversation.satisfactionRating || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                      </div>
                    </div>

                    {/* Compliance Flags */}
                    {selectedConversation.complianceFlags.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Compliance Flags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedConversation.complianceFlags.map((flag) => (
                            <span key={flag} className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                              {flag.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Messages</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Flag className="w-4 h-4" />
                        <span>Flag Conversation</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
