"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, DollarSign, Users, Star, Clock, TrendingUp, MapPin, Phone, MessageCircle } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export function PhysioDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Today's Appointments",
      value: "4",
      change: "+2 from yesterday",
      changeType: "increase",
      icon: Calendar,
      color: "bg-blue-500",
      link: "/physio/appointments?filter=today",
    },
    {
      title: "This Week's Earnings",
      value: "₹12,500",
      change: "+15% from last week",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-green-500",
      link: "/physio/earnings",
    },
    {
      title: "Active Patients",
      value: "23",
      change: "+3 new patients",
      changeType: "increase",
      icon: Users,
      color: "bg-purple-500",
      link: "/physio/appointments?filter=patients",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2 this month",
      changeType: "increase",
      icon: Star,
      color: "bg-orange-500",
      link: "/physio/settings?tab=reviews",
    },
  ]

  const todayAppointments = [
    {
      id: "BKG12345",
      patient: "John Doe",
      condition: "Knee Pain",
      time: "10:00 AM",
      duration: "60 min",
      type: "Home Visit",
      address: "123 Main Street, Mumbai",
      phone: "+91 98765 43210",
      status: "confirmed",
      isFirstTime: false,
      notes: "Follow-up session for knee rehabilitation",
    },
    {
      id: "BKG12346",
      patient: "Sarah Wilson",
      condition: "Back Pain",
      time: "02:00 PM",
      duration: "60 min",
      type: "Home Visit",
      address: "456 Oak Avenue, Mumbai",
      phone: "+91 87654 32109",
      status: "confirmed",
      isFirstTime: true,
      notes: "Initial assessment for lower back pain",
    },
    {
      id: "BKG12347",
      patient: "Raj Patel",
      condition: "Sports Injury",
      time: "04:00 PM",
      duration: "60 min",
      type: "Home Visit",
      address: "789 Sports Complex, Mumbai",
      phone: "+91 76543 21098",
      status: "confirmed",
      isFirstTime: false,
      notes: "Tennis elbow rehabilitation - session 3",
    },
    {
      id: "BKG12348",
      patient: "Priya Sharma",
      condition: "Neck Pain",
      time: "06:00 PM",
      duration: "60 min",
      type: "Home Visit",
      address: "321 Residential Area, Mumbai",
      phone: "+91 65432 10987",
      status: "pending",
      isFirstTime: true,
      notes: "Cervical spondylosis assessment",
    },
  ]

  const pendingRequests = [
    {
      id: "REQ001",
      patient: "Amit Singh",
      condition: "Shoulder Pain",
      preferredDate: "2025-01-21",
      preferredTime: "Morning",
      location: "Andheri, Mumbai",
      distance: "2.5 km",
      amount: 1500,
      package: "Single Session",
      urgency: "normal",
      requestedAt: "2025-01-19 09:30 AM",
    },
    {
      id: "REQ002",
      patient: "Neha Gupta",
      condition: "Post-Surgery Rehab",
      preferredDate: "2025-01-22",
      preferredTime: "Afternoon",
      location: "Bandra, Mumbai",
      distance: "4.2 km",
      amount: 5000,
      package: "Weekly Package",
      urgency: "high",
      requestedAt: "2025-01-19 11:15 AM",
    },
  ]

  const recentEarnings = [
    { date: "2025-01-19", amount: 3000, sessions: 2 },
    { date: "2025-01-18", amount: 4500, sessions: 3 },
    { date: "2025-01-17", amount: 1500, sessions: 1 },
    { date: "2025-01-16", amount: 6000, sessions: 4 },
    { date: "2025-01-15", amount: 3000, sessions: 2 },
  ]

  const quickActions = [
    {
      title: "View Requests",
      description: "Check new patient requests",
      icon: Users,
      link: "/physio/requests",
      color: "bg-blue-600 hover:bg-blue-700",
      count: pendingRequests.length,
    },
    {
      title: "Today's Schedule",
      description: "View today's appointments",
      icon: Calendar,
      link: "/physio/appointments?filter=today",
      color: "bg-green-600 hover:bg-green-700",
      count: todayAppointments.length,
    },
    {
      title: "Earnings Report",
      description: "Check your earnings",
      icon: DollarSign,
      link: "/physio/earnings",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Update Availability",
      description: "Manage your schedule",
      icon: Clock,
      link: "/physio/settings?tab=availability",
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your practice overview for today</p>
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
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
                <Link to="/physio/appointments" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                          {appointment.isFirstTime && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              New Patient
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{appointment.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{appointment.time}</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{appointment.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{appointment.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{appointment.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">{appointment.type}</span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="bg-gray-50 rounded p-2 mb-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Contact
                      </button>
                      <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Start Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {todayAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No appointments scheduled for today</p>
                  <Link
                    to="/physio/requests"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Check New Requests
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
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

            {/* Pending Requests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Pending Requests</h3>
                <Link to="/physio/requests" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {pendingRequests.slice(0, 2).map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{request.patient}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}
                      >
                        {request.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{request.condition}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{request.distance} away</span>
                      <span>₹{request.amount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {pendingRequests.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No pending requests</p>
              )}
            </motion.div>

            {/* Weekly Earnings Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Earnings</h3>

              <div className="space-y-3">
                {recentEarnings.map((earning) => (
                  <div key={earning.date} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{new Date(earning.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{earning.sessions} sessions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{earning.amount}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/physio/earnings"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View Detailed Report
              </Link>
            </motion.div>

            {/* Professional Tip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6"
            >
              <div className="flex items-center mb-3">
                <TrendingUp className="w-6 h-6 mr-2" />
                <h3 className="font-bold">Pro Tip</h3>
              </div>
              <p className="text-sm opacity-90">
                Maintain consistent communication with your patients. Quick responses to messages can improve your
                rating and lead to more bookings.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
