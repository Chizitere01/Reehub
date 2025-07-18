"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Eye, Mail, Phone, MapPin, Award, Clock } from "lucide-react"

export function AdminUsers() {
  const [activeTab, setActiveTab] = useState<"all" | "patients" | "physios" | "pending">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      role: "patient",
      status: "active",
      joinDate: "2024-12-15",
      location: "Mumbai, Maharashtra",
      totalSessions: 8,
      lastActive: "2025-01-19",
    },
    {
      id: "2",
      name: "Dr. Emily Jones",
      email: "emily.jones@email.com",
      phone: "+91 87654 32109",
      role: "physio",
      status: "active",
      joinDate: "2024-11-20",
      location: "Mumbai, Maharashtra",
      specialties: ["Orthopedic", "Sports"],
      experience: "8 years",
      rating: 4.8,
      totalSessions: 156,
      lastActive: "2025-01-19",
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 76543 21098",
      role: "physio",
      status: "pending",
      joinDate: "2025-01-18",
      location: "Delhi, India",
      specialties: ["Neurological", "Geriatric"],
      experience: "5 years",
      applicationDate: "2025-01-18",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+91 65432 10987",
      role: "patient",
      status: "active",
      joinDate: "2025-01-10",
      location: "Bangalore, Karnataka",
      totalSessions: 3,
      lastActive: "2025-01-18",
    },
  ]

  const handleApprove = (userId: string) => {
    alert(`User ${userId} has been approved and can now start accepting bookings.`)
  }

  const handleReject = (userId: string) => {
    if (confirm("Are you sure you want to reject this application?")) {
      alert(`User ${userId} application has been rejected.`)
    }
  }

  const handleSuspend = (userId: string) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      alert(`User ${userId} has been suspended.`)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "patients" && user.role === "patient") ||
      (activeTab === "physios" && user.role === "physio" && user.status === "active") ||
      (activeTab === "pending" && user.status === "pending")

    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "patient":
        return "bg-blue-100 text-blue-800"
      case "physio":
        return "bg-purple-100 text-purple-800"
      case "admin":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderUserCard = (user: any) => (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {user.role === "physio" ? "Physiotherapist" : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{user.location}</span>
          </div>
        </div>

        <div className="space-y-2">
          {user.role === "physio" && user.specialties && (
            <div className="flex items-center text-sm text-gray-600">
              <Award className="w-4 h-4 mr-2" />
              <span>{user.specialties.join(", ")}</span>
            </div>
          )}
          {user.experience && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{user.experience} experience</span>
            </div>
          )}
          {user.rating && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{user.rating} rating</span>
            </div>
          )}
          <div className="text-sm text-gray-600">
            <span className="font-medium">Sessions:</span> {user.totalSessions || 0}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
        {user.lastActive && <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>}
      </div>

      <div className="flex flex-wrap gap-2">
        {user.status === "pending" ? (
          <>
            <button
              onClick={() => handleApprove(user.id)}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <UserCheck className="w-4 h-4 mr-1" />
              Approve
            </button>
            <button
              onClick={() => handleReject(user.id)}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <UserX className="w-4 h-4 mr-1" />
              Reject
            </button>
          </>
        ) : (
          <>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </button>
            {user.status === "active" && (
              <button
                onClick={() => handleSuspend(user.id)}
                className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                <UserX className="w-4 h-4 mr-1" />
                Suspend
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage patients, physiotherapists, and pending applications</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "All Users", count: users.length },
                { key: "patients", label: "Patients", count: users.filter((u) => u.role === "patient").length },
                {
                  key: "physios",
                  label: "Physiotherapists",
                  count: users.filter((u) => u.role === "physio" && u.status === "active").length,
                },
                {
                  key: "pending",
                  label: "Pending Approval",
                  count: users.filter((u) => u.status === "pending").length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => renderUserCard(user))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <UserCheck className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms" : "No users match the selected criteria"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "patient").length}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "physio" && u.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active Physios</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter((u) => u.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{users.filter((u) => u.status === "active").length}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
