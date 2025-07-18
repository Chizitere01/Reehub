"use client"
import { motion } from "framer-motion"
import { FileText, Download, Eye, Upload, Calendar, User } from "lucide-react"

export function PatientDocuments() {
  const documents = [
    {
      id: "1",
      name: "Initial Assessment Report",
      type: "Assessment",
      date: "2025-01-15",
      therapist: "Dr. Emily Jones",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Exercise Plan - Week 1",
      type: "Exercise Plan",
      date: "2025-01-16",
      therapist: "Dr. Emily Jones",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Progress Report - Session 5",
      type: "Progress Report",
      date: "2025-01-18",
      therapist: "Dr. Emily Jones",
      size: "1.2 MB",
    },
  ]

  const getDocumentIcon = (type: string) => {
    return FileText
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Assessment":
        return "bg-blue-100 text-blue-800"
      case "Exercise Plan":
        return "bg-green-100 text-green-800"
      case "Progress Report":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
          <p className="text-gray-600">Access your medical records, assessments, and treatment plans</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Documents List */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Medical Records</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {documents.map((doc, index) => {
                  const IconComponent = getDocumentIcon(doc.type)
                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(doc.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {doc.therapist}
                              </div>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(doc.type)}`}>
                            {doc.type}
                          </span>
                          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {documents.length === 0 && (
                <div className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                  <p className="text-gray-600 mb-6">Your medical records and treatment documents will appear here</p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Upload Your First Document
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Document Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Assessments</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Exercise Plans</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Progress Reports</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">1</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-6"
            >
              <h3 className="font-bold text-blue-800 mb-2">📋 Document Tips</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Keep all documents organized in one place</li>
                <li>• Download important reports for your records</li>
                <li>• Share documents with other healthcare providers if needed</li>
                <li>• Upload any relevant medical history</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  Request Assessment Report
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  Download All Documents
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  Share with Doctor
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
