"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Plus, FileText, MessageCircle, Activity, TrendingUp } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export function PatientDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Upcoming Sessions",
      value: "2",
      icon: Calendar,
      color: "bg-blue-500",
      link: "/patient/appointments",
    },
    {
      title: "Completed Sessions",
      value: "8",
      icon: CheckCircle,
      color: "bg-green-500",
      link: "/patient/appointments",
    },
    {
      title: "Pending Assessments",
      value: "1",
      icon: FileText,
      color: "bg-yellow-500",
      link: "/patient/documents",
    },
    {
      title: "Recovery Progress",
      value: "75%",
      icon: TrendingUp,
      color: "bg-purple-500",
      link: "/patient/documents",
    },
  ]

  const upcomingSessions = [
    {
      id: "1",
      date: "2025-01-20",
      time: "10:00 AM",
      therapist: "Dr. Emily Jones",
      condition: "Knee Pain",
      type: "Home Visit",
    },
    {
      id: "2",
      date: "2025-01-22",
      time: "02:00 PM",
      therapist: "Dr. Emily Jones",
      condition: "Knee Pain",
      type: "Follow-up",
    },
  ]

  const quickActions = [
    {
      title: "Book New Session",
      description: "Schedule your next physiotherapy session",
      icon: Plus,
      link: "/patient/book",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "View Appointments",
      description: "Manage your upcoming appointments",
      icon: Calendar,
      link: "/patient/appointments",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Chat with Therapist",
      description: "Message your physiotherapist",
      icon: MessageCircle,
      link: "/patient/chat",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "View Documents",
      description: "Access your medical records",
      icon: FileText,
      link: "/patient/documents",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ]

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
          <p className="text-gray-600">Here's an overview of your physiotherapy journey</p>
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
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
                <Link to="/patient/appointments" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.condition}</h3>
                          <p className="text-sm text-gray-600">with {session.therapist}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{new Date(session.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{session.time}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {session.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {upcomingSessions.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No upcoming sessions</p>
                  <Link
                    to="/patient/book"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Your First Session
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
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
                      className={`${action.color} text-white p-4 rounded-lg block transition-colors`}
                    >
                      <div className="flex items-center">
                        <action.icon className="w-6 h-6 mr-3" />
                        <div>
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm opacity-90">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Health Tip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg p-6"
            >
              <div className="flex items-center mb-3">
                <Activity className="w-6 h-6 mr-2" />
                <h3 className="font-bold">Today's Health Tip</h3>
              </div>
              <p className="text-sm opacity-90">
                Remember to do your prescribed exercises daily. Consistency is key to faster recovery and better
                results.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
