"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  MessageCircle,
  Navigation,
  CheckCircle,
  XCircle,
  Edit,
  Filter,
} from "lucide-react"

export function PhysioAppointments() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "today" | "completed" | "cancelled">("upcoming")
  const [selectedDate, setSelectedDate] = useState("")

  const appointments = [
    {
      id: "BKG12345",
      patient: {
        name: "John Doe",
        phone: "+91 98765 43210",
        email: "john.doe@email.com",
        age: 45,
        gender: "Male",
      },
      condition: "Knee Pain",
      date: "2025-01-20",
      time: "10:00 AM",
      duration: "60 min",
      status: "confirmed",
      address: "123 Main Street, Andheri West, Mumbai - 400058",
      location: { lat: 19.1334, lng: 72.8267 },
      distance: "2.5 km",
      package: "Single Session",
      amount: 1500,
      sessionNumber: 3,
      totalSessions: 5,
      isFirstTime: false,
      notes: "Patient showing good progress. Continue with current exercises.",
      medicalHistory: "Previous knee surgery in 2020. No complications.",
      equipment: ["Resistance bands", "Ice pack"],
      paymentStatus: "paid",
    },
    {
      id: "BKG12346",
      patient: {
        name: "Sarah Wilson",
        phone: "+91 87654 32109",
        email: "sarah.wilson@email.com",
        age: 38,
        gender: "Female",
      },
      condition: "Back Pain",
      date: "2025-01-20",
      time: "02:00 PM",
      duration: "60 min",
      status: "confirmed",
      address: "456 Oak Avenue, Bandra East, Mumbai - 400051",
      location: { lat: 19.0596, lng: 72.8295 },
      distance: "4.2 km",
      package: "Weekly Package",
      amount: 5000,
      sessionNumber: 1,
      totalSessions: 4,
      isFirstTime: true,
      notes: "Initial assessment required. Patient reports chronic lower back pain.",
      medicalHistory: "No previous back issues. Office worker - long sitting hours.",
      equipment: ["Exercise mat", "Lumbar support"],
      paymentStatus: "paid",
    },
    {
      id: "BKG12347",
      patient: {
        name: "Raj Patel",
        phone: "+91 76543 21098",
        email: "raj.patel@email.com",
        age: 29,
        gender: "Male",
      },
      condition: "Sports Injury",
      date: "2025-01-21",
      time: "04:00 PM",
      duration: "60 min",
      status: "confirmed",
      address: "789 Sports Complex, Powai, Mumbai - 400076",
      location: { lat: 19.1197, lng: 72.9073 },
      distance: "6.8 km",
      package: "Single Session",
      amount: 1500,
      sessionNumber: 2,
      totalSessions: 3,
      isFirstTime: false,
      notes: "Tennis elbow showing improvement. Reduce intensity slightly.",
      medicalHistory: "Regular tennis player. No previous injuries.",
      equipment: ["Elbow brace", "Resistance bands"],
      paymentStatus: "paid",
    },
    {
      id: "BKG12348",
      patient: {
        name: "Priya Sharma",
        phone: "+91 65432 10987",
        email: "priya.sharma@email.com",
        age: 52,
        gender: "Female",
      },
      condition: "Arthritis Management",
      date: "2025-01-15",
      time: "11:00 AM",
      duration: "60 min",
      status: "completed",
      address: "321 Residential Area, Juhu, Mumbai - 400049",
      location: { lat: 19.1075, lng: 72.8263 },
      distance: "3.1 km",
      package: "Monthly Package",
      amount: 18000,
      sessionNumber: 8,
      totalSessions: 16,
      isFirstTime: false,
      notes: "Excellent progress. Patient can now climb stairs without pain.",
      medicalHistory: "Diagnosed with osteoarthritis 2 years ago.",
      equipment: ["Joint support", "Heat therapy pad"],
      paymentStatus: "paid",
      rating: 5,
      feedback: "Dr. Emily is amazing! My knee pain has reduced significantly.",
      completedAt: "2025-01-15 12:00 PM",
    },
    {
      id: "BKG12349",
      patient: {
        name: "Vikram Shah",
        phone: "+91 54321 09876",
        email: "vikram.shah@email.com",
        age: 31,
        gender: "Male",
      },
      condition: "Neck Pain",
      date: "2025-01-16",
      time: "09:00 AM",
      duration: "60 min",
      status: "cancelled",
      address: "654 Business District, Worli, Mumbai - 400025",
      location: { lat: 19.0176, lng: 72.8562 },
      distance: "5.5 km",
      package: "Single Session",
      amount: 1500,
      sessionNumber: 1,
      totalSessions: 1,
      isFirstTime: true,
      notes: "Patient cancelled due to work emergency.",
      medicalHistory: "Cervical spondylosis from desk work.",
      equipment: ["Neck pillow", "Heat pack"],
      paymentStatus: "refunded",
      cancellationReason: "Work emergency",
      cancelledAt: "2025-01-15 08:30 PM",
    },
  ]

  const handleStartSession = (appointmentId: string) => {
    alert(`Starting session for appointment ${appointmentId}`)
  }

  const handleCompleteSession = (appointmentId: string) => {
    alert(`Marking session ${appointmentId} as completed`)
  }

  const handleReschedule = (appointmentId: string) => {
    alert(`Rescheduling appointment ${appointmentId}`)
  }

  const handleCancel = (appointmentId: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      alert(`Appointment ${appointmentId} has been cancelled`)
    }
  }

  const handleNavigate = (location: any) => {
    alert(`Opening navigation to coordinates: ${location.lat}, ${location.lng}`)
  }

  const handleContact = (patient: any) => {
    alert(`Contacting ${patient.name} at ${patient.phone}`)
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesTab = (() => {
      const today = new Date().toISOString().split("T")[0]
      switch (activeTab) {
        case "today":
          return appointment.date === today
        case "upcoming":
          return appointment.status === "confirmed" && appointment.date >= today
        case "completed":
          return appointment.status === "completed"
        case "cancelled":
          return appointment.status === "cancelled"
        default:
          return true
      }
    })()

    const matchesDate = !selectedDate || appointment.date === selectedDate

    return matchesTab && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderAppointmentCard = (appointment: any) => (
    <motion.div
      key={appointment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{appointment.patient.name}</h3>
            {appointment.isFirstTime && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New Patient</span>
            )}
          </div>
          <p className="text-gray-600 font-medium">{appointment.condition}</p>
          <p className="text-sm text-gray-500">
            Session {appointment.sessionNumber} of {appointment.totalSessions}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900">₹{appointment.amount}</p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(appointment.paymentStatus)}`}
          >
            {appointment.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <div>
              <span>
                {appointment.patient.age}y, {appointment.patient.gender}
              </span>
              <p className="text-sm text-gray-500">{appointment.patient.email}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{appointment.patient.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <div>
              <span className="text-sm">{appointment.address}</span>
              <p className="text-xs text-gray-500">{appointment.distance} away</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(appointment.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {appointment.time} ({appointment.duration})
            </span>
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-medium">Package:</span> {appointment.package}
          </div>
        </div>
      </div>

      {appointment.notes && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-1">Session Notes</h4>
          <p className="text-sm text-blue-800">{appointment.notes}</p>
        </div>
      )}

      {appointment.medicalHistory && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-1">Medical History</h4>
          <p className="text-sm text-gray-700">{appointment.medicalHistory}</p>
        </div>
      )}

      {appointment.equipment && appointment.equipment.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Required Equipment</h4>
          <div className="flex flex-wrap gap-2">
            {appointment.equipment.map((item, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {appointment.rating && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-green-900 mr-2">Patient Rating:</span>
            <div className="flex">
              {[...Array(appointment.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </div>
          {appointment.feedback && <p className="text-sm text-green-800">"{appointment.feedback}"</p>}
        </div>
      )}

      {appointment.cancellationReason && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            <span className="font-medium">Cancellation Reason:</span> {appointment.cancellationReason}
          </p>
          <p className="text-xs text-red-600 mt-1">Cancelled at: {appointment.cancelledAt}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {appointment.status === "confirmed" && (
          <>
            <button
              onClick={() => handleStartSession(appointment.id)}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Start Session
            </button>
            <button
              onClick={() => handleReschedule(appointment.id)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Reschedule
            </button>
          </>
        )}

        <button
          onClick={() => handleContact(appointment.patient)}
          className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Contact
        </button>

        <button
          onClick={() => handleNavigate(appointment.location)}
          className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          <Navigation className="w-4 h-4 mr-1" />
          Navigate
        </button>

        {appointment.status === "confirmed" && (
          <button
            onClick={() => handleCancel(appointment.id)}
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Cancel
          </button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your physiotherapy sessions and patient appointments</p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Conditions</option>
                <option>Back Pain</option>
                <option>Knee Pain</option>
                <option>Sports Injury</option>
                <option>Arthritis</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">Showing {filteredAppointments.length} appointments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                {
                  key: "today",
                  label: "Today",
                  count: appointments.filter((a) => a.date === new Date().toISOString().split("T")[0]).length,
                },
                {
                  key: "upcoming",
                  label: "Upcoming",
                  count: appointments.filter(
                    (a) => a.status === "confirmed" && a.date >= new Date().toISOString().split("T")[0],
                  ).length,
                },
                {
                  key: "completed",
                  label: "Completed",
                  count: appointments.filter((a) => a.status === "completed").length,
                },
                {
                  key: "cancelled",
                  label: "Cancelled",
                  count: appointments.filter((a) => a.status === "cancelled").length,
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

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => renderAppointmentCard(appointment))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600">
                {activeTab === "today"
                  ? "No appointments scheduled for today"
                  : `No ${activeTab} appointments at the moment`}
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
            <div className="text-2xl font-bold text-blue-600">
              {appointments.filter((a) => a.date === new Date().toISOString().split("T")[0]).length}
            </div>
            <div className="text-sm text-gray-600">Today's Sessions</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {appointments.filter((a) => a.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              ₹
              {appointments
                .filter((a) => a.status === "completed")
                .reduce((sum, a) => sum + a.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Earned</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
