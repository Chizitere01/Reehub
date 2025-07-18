"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, User, Calendar, Phone, MessageCircle, Check, X, Filter } from "lucide-react"

export function PhysioRequests() {
  const [activeTab, setActiveTab] = useState<"new" | "accepted" | "declined">("new")

  const requests = [
    {
      id: "REQ001",
      patient: {
        name: "Amit Singh",
        phone: "+91 98765 43210",
        email: "amit.singh@email.com",
        age: 35,
        gender: "Male",
      },
      condition: "Shoulder Pain",
      description: "Chronic shoulder pain after gym workout. Need immediate attention.",
      preferredDate: "2025-01-21",
      preferredTime: "Morning (9 AM - 12 PM)",
      location: "Andheri West, Mumbai",
      address: "123 Andheri West, Mumbai - 400058",
      distance: "2.5 km",
      amount: 1500,
      package: "Single Session",
      urgency: "normal",
      requestedAt: "2025-01-19 09:30 AM",
      status: "new",
      medicalHistory: "No previous surgeries. Regular gym-goer.",
      specialRequests: "Prefer morning sessions due to work schedule",
    },
    {
      id: "REQ002",
      patient: {
        name: "Neha Gupta",
        phone: "+91 87654 32109",
        email: "neha.gupta@email.com",
        age: 42,
        gender: "Female",
      },
      condition: "Post-Surgery Rehabilitation",
      description: "ACL surgery rehabilitation. Doctor recommended physiotherapy.",
      preferredDate: "2025-01-22",
      preferredTime: "Afternoon (2 PM - 5 PM)",
      location: "Bandra East, Mumbai",
      address: "456 Bandra East, Mumbai - 400051",
      distance: "4.2 km",
      amount: 5000,
      package: "Weekly Package",
      urgency: "high",
      requestedAt: "2025-01-19 11:15 AM",
      status: "new",
      medicalHistory: "Recent ACL surgery (2 weeks ago). No other complications.",
      specialRequests: "Need gentle approach due to recent surgery",
    },
    {
      id: "REQ003",
      patient: {
        name: "Rajesh Kumar",
        phone: "+91 76543 21098",
        email: "rajesh.kumar@email.com",
        age: 28,
        gender: "Male",
      },
      condition: "Back Pain",
      description: "Lower back pain due to long hours of desk work.",
      preferredDate: "2025-01-23",
      preferredTime: "Evening (6 PM - 8 PM)",
      location: "Powai, Mumbai",
      address: "789 Powai, Mumbai - 400076",
      distance: "6.8 km",
      amount: 1500,
      package: "Single Session",
      urgency: "normal",
      requestedAt: "2025-01-19 02:45 PM",
      status: "new",
      medicalHistory: "No previous back issues. Software engineer.",
      specialRequests: "Prefer evening sessions after work",
    },
    {
      id: "REQ004",
      patient: {
        name: "Priya Patel",
        phone: "+91 65432 10987",
        email: "priya.patel@email.com",
        age: 55,
        gender: "Female",
      },
      condition: "Arthritis Management",
      description: "Knee arthritis pain management and mobility improvement.",
      preferredDate: "2025-01-20",
      preferredTime: "Morning (10 AM - 12 PM)",
      location: "Juhu, Mumbai",
      address: "321 Juhu, Mumbai - 400049",
      distance: "3.1 km",
      amount: 18000,
      package: "Monthly Package",
      urgency: "normal",
      requestedAt: "2025-01-18 04:20 PM",
      status: "accepted",
      medicalHistory: "Diagnosed with osteoarthritis 2 years ago.",
      specialRequests: "Need home equipment recommendations",
    },
    {
      id: "REQ005",
      patient: {
        name: "Vikram Shah",
        phone: "+91 54321 09876",
        email: "vikram.shah@email.com",
        age: 31,
        gender: "Male",
      },
      condition: "Sports Injury",
      description: "Tennis elbow injury from regular playing.",
      preferredDate: "2025-01-19",
      preferredTime: "Morning (8 AM - 10 AM)",
      location: "Worli, Mumbai",
      address: "654 Worli, Mumbai - 400025",
      distance: "5.5 km",
      amount: 1500,
      package: "Single Session",
      urgency: "low",
      requestedAt: "2025-01-18 07:30 PM",
      status: "declined",
      medicalHistory: "Regular tennis player. No previous injuries.",
      specialRequests: "Want to continue playing tennis during recovery",
      declineReason: "Schedule conflict",
    },
  ]

  const handleAccept = (requestId: string) => {
    alert(`Request ${requestId} has been accepted! The patient will be notified.`)
  }

  const handleDecline = (requestId: string) => {
    const reason = prompt("Please provide a reason for declining (optional):")
    alert(`Request ${requestId} has been declined. ${reason ? `Reason: ${reason}` : ""}`)
  }

  const handleContact = (patient: any) => {
    alert(`Contacting ${patient.name} at ${patient.phone}`)
  }

  const filteredRequests = requests.filter((request) => {
    if (activeTab === "new") return request.status === "new"
    if (activeTab === "accepted") return request.status === "accepted"
    if (activeTab === "declined") return request.status === "declined"
    return true
  })

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

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case "Single Session":
        return "bg-green-100 text-green-800"
      case "Weekly Package":
        return "bg-blue-100 text-blue-800"
      case "Monthly Package":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderRequestCard = (request: any) => (
    <motion.div
      key={request.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{request.patient.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
              {request.urgency} priority
            </span>
          </div>
          <p className="text-gray-600 font-medium">{request.condition}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">₹{request.amount}</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPackageColor(request.package)}`}
          >
            {request.package}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 text-sm">{request.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <div>
              <span className="font-medium">
                {request.patient.age}y, {request.patient.gender}
              </span>
              <p className="text-sm text-gray-500">{request.patient.email}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{request.patient.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <div>
              <span className="font-medium">{request.location}</span>
              <p className="text-sm text-gray-500">{request.distance} away</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(request.preferredDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{request.preferredTime}</span>
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-medium">Requested:</span> {request.requestedAt}
          </div>
        </div>
      </div>

      {request.medicalHistory && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-1">Medical History</h4>
          <p className="text-sm text-blue-800">{request.medicalHistory}</p>
        </div>
      )}

      {request.specialRequests && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-1">Special Requests</h4>
          <p className="text-sm text-yellow-800">{request.specialRequests}</p>
        </div>
      )}

      {request.status === "declined" && request.declineReason && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg">
          <h4 className="font-medium text-red-900 mb-1">Decline Reason</h4>
          <p className="text-sm text-red-800">{request.declineReason}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {request.status === "new" && (
          <>
            <button
              onClick={() => handleAccept(request.id)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              Accept Request
            </button>
            <button
              onClick={() => handleDecline(request.id)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </button>
          </>
        )}

        <button
          onClick={() => handleContact(request.patient)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Patient
        </button>

        <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <MapPin className="w-4 h-4 mr-2" />
          View Location
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Requests</h1>
          <p className="text-gray-600">Manage incoming patient requests and build your practice</p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Locations</option>
                <option>Within 5km</option>
                <option>Within 10km</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Conditions</option>
                <option>Back Pain</option>
                <option>Knee Pain</option>
                <option>Sports Injury</option>
                <option>Post-Surgery</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">Showing {filteredRequests.length} requests</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "new", label: "New Requests", count: requests.filter((r) => r.status === "new").length },
                { key: "accepted", label: "Accepted", count: requests.filter((r) => r.status === "accepted").length },
                { key: "declined", label: "Declined", count: requests.filter((r) => r.status === "declined").length },
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

        {/* Requests Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => renderRequestCard(request))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <User className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">
                {activeTab === "new"
                  ? "New patient requests will appear here"
                  : `No ${activeTab} requests at the moment`}
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
            <div className="text-2xl font-bold text-blue-600">{requests.filter((r) => r.status === "new").length}</div>
            <div className="text-sm text-gray-600">New Requests</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {requests.filter((r) => r.status === "accepted").length}
            </div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {requests.filter((r) => r.status === "declined").length}
            </div>
            <div className="text-sm text-gray-600">Declined</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₹{requests.filter((r) => r.status === "accepted").reduce((sum, r) => sum + r.amount, 0)}
            </div>
            <div className="text-sm text-gray-600">Potential Earnings</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
