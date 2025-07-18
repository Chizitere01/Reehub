"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
} from "lucide-react"

export function AdminBookings() {
  const [activeTab, setActiveTab] = useState<"all" | "confirmed" | "pending" | "completed" | "cancelled">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const bookings = [
    {
      id: "BKG12345",
      patientName: "John Doe",
      patientEmail: "john.doe@email.com",
      physioName: "Dr. Emily Jones",
      condition: "Knee Pain",
      date: "2025-01-20",
      time: "10:00 AM",
      status: "confirmed",
      address: "123 Main Street, Mumbai",
      package: "Single Session",
      amount: 1500,
      paymentStatus: "paid",
      createdAt: "2025-01-15",
      notes: "Patient has chronic knee pain, requires gentle approach",
    },
    {
      id: "BKG12346",
      patientName: "Sarah Wilson",
      patientEmail: "sarah.wilson@email.com",
      physioName: "Dr. Michael Brown",
      condition: "Back Pain",
      date: "2025-01-21",
      time: "02:00 PM",
      status: "pending",
      address: "456 Oak Avenue, Mumbai",
      package: "Weekly Package",
      amount: 5000,
      paymentStatus: "pending",
      createdAt: "2025-01-18",
      notes: "Lower back pain after office work",
    },
    {
      id: "BKG12347",
      patientName: "Raj Patel",
      patientEmail: "raj.patel@email.com",
      physioName: "Dr. Emily Jones",
      condition: "Sports Injury",
      date: "2025-01-22",
      time: "04:00 PM",
      status: "confirmed",
      address: "789 Sports Complex, Mumbai",
      package: "Single Session",
      amount: 1500,
      paymentStatus: "paid",
      createdAt: "2025-01-19",
      notes: "Tennis elbow injury, needs sports-specific rehabilitation",
    },
    {
      id: "BKG12348",
      patientName: "Priya Sharma",
      patientEmail: "priya.sharma@email.com",
      physioName: "Dr. Amit Kumar",
      condition: "Neck Pain",
      date: "2025-01-15",
      time: "11:00 AM",
      status: "completed",
      address: "321 Residential Area, Mumbai",
      package: "Single Session",
      amount: 1500,
      paymentStatus: "paid",
      createdAt: "2025-01-10",
      notes: "Cervical spondylosis, completed successfully",
      rating: 5,
      feedback: "Excellent service, very professional therapist",
    },
    {
      id: "BKG12349",
      patientName: "Amit Singh",
      patientEmail: "amit.singh@email.com",
      physioName: "Dr. Priya Sharma",
      condition: "Shoulder Pain",
      date: "2025-01-16",
      time: "03:00 PM",
      status: "cancelled",
      address: "654 Business District, Mumbai",
      package: "Single Session",
      amount: 1500,
      paymentStatus: "refunded",
      createdAt: "2025-01-12",
      notes: "Patient cancelled due to emergency",
      cancellationReason: "Personal emergency",
    },
  ]

  const handleEdit = (bookingId: string) => {
    alert(`Edit booking ${bookingId} - This would open an edit modal`)
  }

  const handleCancel = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      alert(`Booking ${bookingId} has been cancelled`)
    }
  }

  const handleDelete = (bookingId: string) => {
    if (confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      alert(`Booking ${bookingId} has been deleted`)
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.physioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.condition.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderBookingCard = (booking: any) => (
    <motion.div
      key={booking.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.id}</h3>
          <p className="text-gray-600">{booking.condition}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <div>
              <span className="font-medium">{booking.patientName}</span>
              <p className="text-sm text-gray-500">{booking.patientEmail}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{booking.time}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>{booking.physioName}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{booking.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <div>
              <span className="font-medium">₹{booking.amount}</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}
              >
                {booking.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Package:</span> {booking.package}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Created:</span> {new Date(booking.createdAt).toLocaleDateString()}
        </div>
        {booking.notes && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Notes:</span> {booking.notes}
          </div>
        )}
      </div>

      {booking.rating && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Patient Rating:</span>
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

      {booking.cancellationReason && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            <span className="font-medium">Cancellation Reason:</span> {booking.cancellationReason}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => alert(`View details for ${booking.id}`)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </button>

        {booking.status !== "completed" && booking.status !== "cancelled" && (
          <button
            onClick={() => handleEdit(booking.id)}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
        )}

        {booking.status === "confirmed" && (
          <button
            onClick={() => handleCancel(booking.id)}
            className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            Cancel
          </button>
        )}

        <button
          onClick={() => handleDelete(booking.id)}
          className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
          <p className="text-gray-600">Oversee and manage all physiotherapy appointments</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by booking ID, patient, therapist, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "All Bookings", count: bookings.length },
                {
                  key: "confirmed",
                  label: "Confirmed",
                  count: bookings.filter((b) => b.status === "confirmed").length,
                },
                { key: "pending", label: "Pending", count: bookings.filter((b) => b.status === "pending").length },
                {
                  key: "completed",
                  label: "Completed",
                  count: bookings.filter((b) => b.status === "completed").length,
                },
                {
                  key: "cancelled",
                  label: "Cancelled",
                  count: bookings.filter((b) => b.status === "cancelled").length,
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

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => renderBookingCard(booking))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms" : "No bookings match the selected criteria"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-600">{bookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {bookings.filter((b) => b.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₹
              {bookings
                .filter((b) => b.paymentStatus === "paid")
                .reduce((sum, b) => sum + b.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
