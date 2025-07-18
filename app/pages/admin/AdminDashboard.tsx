"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Users, Calendar, DollarSign, TrendingUp, UserCheck, AlertCircle, Star } from "lucide-react"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/users?filter=patients",
    },
    {
      title: "Active Physiotherapists",
      value: "89",
      change: "+5%",
      changeType: "increase",
      icon: UserCheck,
      color: "bg-green-500",
      link: "/admin/users?filter=physios",
    },
    {
      title: "Active Bookings",
      value: "156",
      change: "+8%",
      changeType: "increase",
      icon: Calendar,
      color: "bg-purple-500",
      link: "/admin/bookings",
    },
    {
      title: "Monthly Revenue",
      value: "₹2,34,500",
      change: "+15%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-orange-500",
      link: "/admin/bookings?view=revenue",
    },
  ]

  const recentBookings = [
    {
      id: "BKG12345",
      patient: "John Doe",
      physio: "Dr. Emily Jones",
      condition: "Knee Pain",
      date: "2025-01-20",
      status: "confirmed",
      amount: 1500,
    },
    {
      id: "BKG12346",
      patient: "Sarah Wilson",
      physio: "Dr. Michael Brown",
      condition: "Back Pain",
      date: "2025-01-21",
      status: "pending",
      amount: 5000,
    },
    {
      id: "BKG12347",
      patient: "Raj Patel",
      physio: "Dr. Emily Jones",
      condition: "Sports Injury",
      date: "2025-01-22",
      status: "confirmed",
      amount: 1500,
    },
  ]

  const pendingApprovals = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      type: "Physiotherapist Application",
      date: "2025-01-18",
      specialty: "Neurological Rehabilitation",
    },
    {
      id: "2",
      name: "Dr. Amit Kumar",
      type: "Physiotherapist Application",
      date: "2025-01-17",
      specialty: "Sports Physiotherapy",
    },
  ]

  const quickActions = [
    {
      title: "Approve Physiotherapists",
      description: "Review pending applications",
      icon: UserCheck,
      link: "/admin/users?tab=pending",
      color: "bg-blue-600 hover:bg-blue-700",
      count: pendingApprovals.length,
    },
    {
      title: "Manage Bookings",
      description: "Oversee all appointments",
      icon: Calendar,
      link: "/admin/bookings",
      color: "bg-green-600 hover:bg-green-700",
      count: recentBookings.length,
    },
    {
      title: "Create Promotions",
      description: "Add new promo codes",
      icon: TrendingUp,
      link: "/admin/promos",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "View Reports",
      description: "Analytics and insights",
      icon: TrendingUp,
      link: "/admin/reports",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of ReeHub platform performance and management</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to={stat.link}
                className="bg-white rounded-lg shadow-lg p-6 block hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                <Link to="/admin/bookings" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.id}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.patient} → {booking.physio}
                        </p>
                        <p className="text-sm text-gray-500">{booking.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{booking.amount}</p>
                        <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Pending Approvals */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>

              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      to={action.link}
                      className={`${action.color} text-white p-4 rounded-lg block transition-colors relative`}
                    >
                      <div className="flex items-center">
                        <action.icon className="w-6 h-6 mr-3" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm opacity-90">{action.description}</p>
                        </div>
                        {action.count && (
                          <span className="bg-white text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                            {action.count}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pending Approvals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>

              <div className="space-y-3">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{approval.name}</p>
                        <p className="text-sm text-gray-600">{approval.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{new Date(approval.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/admin/users?tab=pending"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Review All Applications
              </Link>
            </motion.div>

            {/* System Health */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg p-6"
            >
              <div className="flex items-center mb-3">
                <Star className="w-6 h-6 mr-2" />
                <h3 className="font-bold">System Status</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Platform Uptime</span>
                  <span className="font-semibold">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Sessions</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span className="font-semibold">120ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
