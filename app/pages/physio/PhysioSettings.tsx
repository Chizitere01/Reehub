"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Calendar, DollarSign, Shield, Star, Save } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export function PhysioSettings() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 87654 32109",
    specialties: ["Orthopedic", "Sports"],
    experience: "8 years",
    qualification: "MPT in Orthopedic Physiotherapy",
    license: "PT12345678",
    bio: "Experienced physiotherapist specializing in orthopedic and sports injuries. Passionate about helping patients recover and achieve their health goals.",
    address: "Andheri West, Mumbai, Maharashtra",
    languages: ["English", "Hindi", "Marathi"],
    certifications: ["Manual Therapy Certification", "Sports Injury Specialist"],
  })

  const [availabilityData, setAvailabilityData] = useState({
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    workingHours: {
      start: "09:00",
      end: "18:00",
    },
    maxSessionsPerDay: 8,
    sessionDuration: 60,
    breakBetweenSessions: 15,
    travelRadius: 10,
    homeVisitFee: 100,
  })

  const [pricingData, setPricingData] = useState({
    singleSession: 1500,
    weeklyPackage: 5000,
    monthlyPackage: 18000,
    emergencyRate: 2000,
    cancellationPolicy: "24 hours",
    acceptsInsurance: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newRequests: true,
    appointmentReminders: true,
    paymentUpdates: true,
    patientMessages: true,
    systemUpdates: false,
    marketingEmails: false,
    smsNotifications: true,
    emailNotifications: true,
  })

  const [reviews] = useState([
    {
      id: "1",
      patient: "John Doe",
      rating: 5,
      comment: "Excellent physiotherapist! Very professional and helped me recover quickly.",
      date: "2025-01-15",
      condition: "Knee Pain",
    },
    {
      id: "2",
      patient: "Sarah Wilson",
      rating: 5,
      comment: "Dr. Emily is amazing. My back pain is completely gone after her treatment.",
      date: "2025-01-12",
      condition: "Back Pain",
    },
    {
      id: "3",
      patient: "Raj Patel",
      rating: 4,
      comment: "Good treatment for my tennis elbow. Would recommend to others.",
      date: "2025-01-10",
      condition: "Sports Injury",
    },
  ])

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profile updated successfully!")
  }

  const handleAvailabilitySave = () => {
    alert("Availability settings updated!")
  }

  const handlePricingSave = () => {
    alert("Pricing updated successfully!")
  }

  const handleNotificationSave = () => {
    alert("Notification preferences updated!")
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "availability", label: "Availability", icon: Calendar },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "security", label: "Security", icon: Shield },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Profile</h2>

            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={profileData.qualification}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, qualification: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                <input
                  type="text"
                  value={profileData.license}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, license: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Area</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Specialties</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Orthopedic",
                    "Neurological",
                    "Sports",
                    "Pediatric",
                    "Geriatric",
                    "Cardiopulmonary",
                    "Women's Health",
                  ].map((specialty) => (
                    <label key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.specialties.includes(specialty)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData((prev) => ({
                              ...prev,
                              specialties: [...prev.specialties, specialty],
                            }))
                          } else {
                            setProfileData((prev) => ({
                              ...prev,
                              specialties: prev.specialties.filter((s) => s !== specialty),
                            }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Profile
              </button>
            </form>
          </motion.div>
        )

      case "availability":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Availability Settings</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Days</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={availabilityData.workingDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAvailabilityData((prev) => ({
                              ...prev,
                              workingDays: [...prev.workingDays, day],
                            }))
                          } else {
                            setAvailabilityData((prev) => ({
                              ...prev,
                              workingDays: prev.workingDays.filter((d) => d !== day),
                            }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={availabilityData.workingHours.start}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, start: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={availabilityData.workingHours.end}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, end: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Sessions/Day</label>
                  <input
                    type="number"
                    value={availabilityData.maxSessionsPerDay}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({ ...prev, maxSessionsPerDay: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (min)</label>
                  <input
                    type="number"
                    value={availabilityData.sessionDuration}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({ ...prev, sessionDuration: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Break Between Sessions (min)</label>
                  <input
                    type="number"
                    value={availabilityData.breakBetweenSessions}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({
                        ...prev,
                        breakBetweenSessions: Number.parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Radius (km)</label>
                  <input
                    type="number"
                    value={availabilityData.travelRadius}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({ ...prev, travelRadius: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Home Visit Fee (₹)</label>
                  <input
                    type="number"
                    value={availabilityData.homeVisitFee}
                    onChange={(e) =>
                      setAvailabilityData((prev) => ({ ...prev, homeVisitFee: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleAvailabilitySave}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Availability
              </button>
            </div>
          </motion.div>
        )

      case "pricing":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Packages</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Single Session (₹)</label>
                  <input
                    type="number"
                    value={pricingData.singleSession}
                    onChange={(e) =>
                      setPricingData((prev) => ({ ...prev, singleSession: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Package (₹)</label>
                  <input
                    type="number"
                    value={pricingData.weeklyPackage}
                    onChange={(e) =>
                      setPricingData((prev) => ({ ...prev, weeklyPackage: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Package (₹)</label>
                  <input
                    type="number"
                    value={pricingData.monthlyPackage}
                    onChange={(e) =>
                      setPricingData((prev) => ({ ...prev, monthlyPackage: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Rate (₹)</label>
                  <input
                    type="number"
                    value={pricingData.emergencyRate}
                    onChange={(e) =>
                      setPricingData((prev) => ({ ...prev, emergencyRate: Number.parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
                <select
                  value={pricingData.cancellationPolicy}
                  onChange={(e) => setPricingData((prev) => ({ ...prev, cancellationPolicy: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="24 hours">24 hours notice</option>
                  <option value="48 hours">48 hours notice</option>
                  <option value="72 hours">72 hours notice</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptsInsurance"
                  checked={pricingData.acceptsInsurance}
                  onChange={(e) => setPricingData((prev) => ({ ...prev, acceptsInsurance: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="acceptsInsurance" className="ml-2 text-sm text-gray-700">
                  Accept insurance payments
                </label>
              </div>

              <button
                onClick={handlePricingSave}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Pricing
              </button>
            </div>
          </motion.div>
        )

      case "notifications":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

            <div className="space-y-6">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {key === "newRequests" && "Get notified when patients send new requests"}
                      {key === "appointmentReminders" && "Receive reminders for upcoming appointments"}
                      {key === "paymentUpdates" && "Get notified about payment status changes"}
                      {key === "patientMessages" && "Receive notifications for patient messages"}
                      {key === "systemUpdates" && "Get notified about system updates and maintenance"}
                      {key === "marketingEmails" && "Receive promotional emails and offers"}
                      {key === "smsNotifications" && "Receive notifications via SMS"}
                      {key === "emailNotifications" && "Receive notifications via email"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotificationSettings((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}

              <button
                onClick={handleNotificationSave}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Preferences
              </button>
            </div>
          </motion.div>
        )

      case "reviews":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Positive Reviews</div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.patient}</h3>
                      <p className="text-sm text-gray-600">{review.condition}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case "security":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Security</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Change Password</span>
                      <span className="text-blue-600">Update</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Two-Factor Authentication</span>
                      <span className="text-gray-500">Not Enabled</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Login Sessions</span>
                      <span className="text-blue-600">Manage</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Profile Visibility</span>
                      <span className="text-green-600">Public</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Data Export</span>
                      <span className="text-blue-600">Download</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your professional profile and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
