"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Phone, MessageCircle, MoreHorizontal, CheckCircle, XCircle, Edit } from "lucide-react"
import { mockBookings } from "../../data/mockData"

export function PatientAppointments() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming")

  const handleReschedule = (bookingId: string) => {
    alert(`Reschedule booking ${bookingId} - This would open a date/time picker`)
  }

  const handleCancel = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      alert(`Booking ${bookingId} has been cancelled`)
    }
  }

  const upcomingBookings = mockBookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const completedBookings = [
    {
      ...mockBookings[0],
      id: "BKG12340",
      date: "2025-01-15",
      status: "completed" as const,
      rating: 5,
      feedback: "Excellent session, very helpful therapist",
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
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderBookingCard = (booking: any, showActions = true) => (
    <motion.div
      key={booking.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.condition}</h3>
          <p className="text-gray-600">Booking ID: {booking.id}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
          {showActions && (
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{booking.address}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{booking.physioName}</span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Package:</span> {booking.package}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Amount:</span> ₹{booking.amount}
          </div>
        </div>
      </div>

      {booking.rating && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Your Rating:</span>
            <div className="flex">
              {[...Array(booking.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </div>
          {booking.feedback && <p className="text-sm text-gray-600">"{booking.feedback}"</p>}
        </div>
      )}

      {showActions && booking.status !== "completed" && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleReschedule(booking.id)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Reschedule
          </button>
          <button
            onClick={() => handleCancel(booking.id)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </button>
        </div>
      )}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your physiotherapy sessions and appointments</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "upcoming", label: "Upcoming", count: upcomingBookings.length },
                { key: "completed", label: "Completed", count: completedBookings.length },
                { key: "cancelled", label: "Cancelled", count: 0 },
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

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "upcoming" && (
            <>
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => renderBookingCard(booking))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-600 mb-6">
                    Book your next physiotherapy session to continue your recovery journey
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Book New Session
                  </button>
                </motion.div>
              )}
            </>
          )}

          {activeTab === "completed" && (
            <>
              {completedBookings.length > 0 ? (
                completedBookings.map((booking) => renderBookingCard(booking, false))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed sessions yet</h3>
                  <p className="text-gray-600">Your completed sessions will appear here</p>
                </motion.div>
              )}
            </>
          )}

          {activeTab === "cancelled" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cancelled appointments</h3>
              <p className="text-gray-600">Your cancelled sessions will appear here</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
