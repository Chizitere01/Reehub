"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Calendar, Clock, CreditCard, CheckCircle, MapPin, User } from "lucide-react"

interface BookingData {
  condition: string
  subCondition: string
  date: string
  time: string
  package: string
  promoCode: string
  paymentMethod: string
  address: string
  phone: string
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    condition: "",
    subCondition: "",
    date: "",
    time: "",
    package: "",
    promoCode: "",
    paymentMethod: "",
    address: "",
    phone: "",
  })

  const navigate = useNavigate()

  const conditions = [
    {
      name: "Orthopedic",
      subConditions: ["Knee Pain", "Shoulder Pain", "Back Pain", "Neck Pain", "Hip Pain"],
    },
    {
      name: "Neurological",
      subConditions: ["Stroke Recovery", "Parkinson's", "Multiple Sclerosis", "Spinal Cord Injury"],
    },
    {
      name: "Sports Injury",
      subConditions: ["ACL Injury", "Runner's Knee", "Tennis Elbow", "Ankle Sprain"],
    },
  ]

  const packages = [
    {
      name: "Single Session",
      price: "₹1,500",
      duration: "60 minutes",
      description: "One-time physiotherapy session",
    },
    {
      name: "Weekly Package",
      price: "₹5,000",
      duration: "4 sessions",
      description: "Four sessions over one week",
      popular: true,
    },
    {
      name: "Monthly Package",
      price: "₹18,000",
      duration: "16 sessions",
      description: "Comprehensive monthly treatment",
    },
  ]

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Mock payment processing
    alert(
      "Booking confirmed! Payment processed successfully. Booking ID: BKG" +
        Math.random().toString(36).substr(2, 9).toUpperCase(),
    )
    navigate("/patient/appointments")
  }

  const updateBookingData = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Condition</h2>
            <div className="space-y-4">
              {conditions.map((condition) => (
                <div key={condition.name} className="space-y-2">
                  <button
                    onClick={() => updateBookingData("condition", condition.name)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      bookingData.condition === condition.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{condition.name}</h3>
                  </button>

                  {bookingData.condition === condition.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="ml-4 space-y-2"
                    >
                      {condition.subConditions.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => updateBookingData("subCondition", sub)}
                          className={`block w-full text-left p-3 rounded-lg border transition-colors ${
                            bookingData.subCondition === sub
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateBookingData("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Select Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => updateBookingData("time", time)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        bookingData.time === time
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                <MapPin className="inline w-4 h-4 mr-1" />
                Address
              </label>
              <textarea
                value={bookingData.address}
                onChange={(e) => updateBookingData("address", e.target.value)}
                placeholder="Enter your complete address for home visit"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => updateBookingData("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Choose Package</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                    bookingData.package === pkg.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${pkg.popular ? "ring-2 ring-blue-200" : ""}`}
                  onClick={() => updateBookingData("package", pkg.name)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                    <div className="text-sm text-gray-600 mb-4">{pkg.duration}</div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Promo Code (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bookingData.promoCode}
                  onChange={(e) => updateBookingData("promoCode", e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

            <div className="space-y-4">
              {["UPI", "Credit/Debit Card", "Net Banking"].map((method) => (
                <button
                  key={method}
                  onClick={() => updateBookingData("paymentMethod", method)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    bookingData.paymentMethod === method
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="font-medium">{method}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Condition:</span>
                  <span>
                    {bookingData.condition} - {bookingData.subCondition}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>
                    {bookingData.date} at {bookingData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span>{bookingData.package}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>₹1,500</span>
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? <CheckCircle className="w-6 h-6" /> : <span>{step}</span>}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep === 4 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Booking
                <CheckCircle className="w-5 h-5 ml-2" />
              </motion.button>
            ) : (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!bookingData.condition || !bookingData.subCondition)) ||
                  (currentStep === 2 &&
                    (!bookingData.date || !bookingData.time || !bookingData.address || !bookingData.phone)) ||
                  (currentStep === 3 && !bookingData.package)
                }
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
