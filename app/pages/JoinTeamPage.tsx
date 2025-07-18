"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Send, CheckCircle, Star, Users, Award } from "lucide-react"

export function JoinTeamPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    specialties: [] as string[],
    qualification: "",
    resume: null as File | null,
  })

  const specialtyOptions = [
    "Orthopedic Physiotherapy",
    "Neurological Rehabilitation",
    "Sports Physiotherapy",
    "Pediatric Physiotherapy",
    "Geriatric Physiotherapy",
    "Cardiopulmonary Physiotherapy",
    "Women's Health Physiotherapy",
  ]

  const benefits = [
    {
      icon: Star,
      title: "Competitive Compensation",
      description: "Attractive pay packages with performance bonuses",
    },
    {
      icon: Users,
      title: "Flexible Schedule",
      description: "Choose your working hours and patient load",
    },
    {
      icon: Award,
      title: "Professional Growth",
      description: "Continuous learning and career advancement opportunities",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock form submission
    alert(
      `Thank you ${formData.name}! Your application has been submitted successfully. We'll review your profile and get back to you within 3-5 business days.`,
    )
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      specialties: [],
      qualification: "",
      resume: null,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSpecialtyChange = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, resume: file }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team of Experts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of India's leading home-based physiotherapy platform. Help us revolutionize healthcare delivery
            while building your practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Form</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Qualification *
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., BPT, MPT, PhD in Physiotherapy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialties * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {specialtyOptions.map((specialty) => (
                      <label key={specialty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(specialty)}
                          onChange={() => handleSpecialtyChange(specialty)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </label>
                    {formData.resume && <p className="mt-2 text-sm text-green-600">✓ {formData.resume.name}</p>}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Benefits & Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Join ReeHub?</h3>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <benefit.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-blue-600 text-white rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">Application Process</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-sm">Submit your application</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-sm">Initial screening call</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-sm">Skills assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <span className="text-sm">Final interview</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <span className="text-sm">Welcome to ReeHub!</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Requirements</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Valid physiotherapy license</li>
                <li>• Minimum 2 years experience</li>
                <li>• Own transportation</li>
                <li>• Smartphone with internet</li>
                <li>• Professional liability insurance</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
