"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Copy, Eye, Calendar, Percent, DollarSign, Users, TrendingUp } from "lucide-react"

export function AdminPromos() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [promoData, setPromoData] = useState({
    code: "",
    description: "",
    type: "percentage",
    value: "",
    minAmount: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
    isActive: true,
  })

  const promos = [
    {
      id: "1",
      code: "WELCOME20",
      description: "Welcome discount for new users",
      type: "percentage",
      value: 20,
      minAmount: 1000,
      maxDiscount: 500,
      usageLimit: 1000,
      usedCount: 234,
      expiryDate: "2025-12-31",
      isActive: true,
      createdAt: "2024-12-01",
      revenue: 45600,
    },
    {
      id: "2",
      code: "HEALTH50",
      description: "Fixed discount on all services",
      type: "fixed",
      value: 50,
      minAmount: 500,
      maxDiscount: null,
      usageLimit: 500,
      usedCount: 89,
      expiryDate: "2025-06-30",
      isActive: true,
      createdAt: "2025-01-01",
      revenue: 12300,
    },
    {
      id: "3",
      code: "NEWYEAR2025",
      description: "New Year special offer",
      type: "percentage",
      value: 25,
      minAmount: 2000,
      maxDiscount: 1000,
      usageLimit: 200,
      usedCount: 156,
      expiryDate: "2025-01-31",
      isActive: true,
      createdAt: "2024-12-25",
      revenue: 78900,
    },
    {
      id: "4",
      code: "EXPIRED10",
      description: "Expired promotional code",
      type: "percentage",
      value: 10,
      minAmount: 1000,
      maxDiscount: 200,
      usageLimit: 100,
      usedCount: 67,
      expiryDate: "2024-12-31",
      isActive: false,
      createdAt: "2024-11-01",
      revenue: 8900,
    },
  ]

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Promo code "${promoData.code}" created successfully!`)
    setShowCreateModal(false)
    setPromoData({
      code: "",
      description: "",
      type: "percentage",
      value: "",
      minAmount: "",
      maxDiscount: "",
      usageLimit: "",
      expiryDate: "",
      isActive: true,
    })
  }

  const handleToggleStatus = (promoId: string, currentStatus: boolean) => {
    const action = currentStatus ? "deactivate" : "activate"
    if (confirm(`Are you sure you want to ${action} this promo code?`)) {
      alert(`Promo code has been ${action}d successfully!`)
    }
  }

  const handleDelete = (promoId: string) => {
    if (confirm("Are you sure you want to delete this promo code? This action cannot be undone.")) {
      alert("Promo code has been deleted successfully!")
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Promo code "${code}" copied to clipboard!`)
  }

  const getTypeColor = (type: string) => {
    return type === "percentage" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  const getStatusColor = (isActive: boolean, expiryDate: string) => {
    const isExpired = new Date(expiryDate) < new Date()
    if (isExpired) return "bg-red-100 text-red-800"
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusText = (isActive: boolean, expiryDate: string) => {
    const isExpired = new Date(expiryDate) < new Date()
    if (isExpired) return "Expired"
    return isActive ? "Active" : "Inactive"
  }

  const totalStats = {
    totalPromos: promos.length,
    activePromos: promos.filter((p) => p.isActive && new Date(p.expiryDate) >= new Date()).length,
    totalUsage: promos.reduce((sum, p) => sum + p.usedCount, 0),
    totalRevenue: promos.reduce((sum, p) => sum + p.revenue, 0),
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Promotions Management</h1>
              <p className="text-gray-600">Create and manage promotional codes and discounts</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Promo Code
            </button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Promos</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalPromos}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Promos</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.activePromos}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalUsage}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue Impact</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalStats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Promo Codes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{promo.code}</h3>
                    <button
                      onClick={() => handleCopyCode(promo.code)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">{promo.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(promo.type)}`}>
                    {promo.type === "percentage" ? "%" : "₹"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(promo.isActive, promo.expiryDate)}`}
                  >
                    {getStatusText(promo.isActive, promo.expiryDate)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    {promo.type === "percentage" ? (
                      <Percent className="w-4 h-4 mr-2" />
                    ) : (
                      <DollarSign className="w-4 h-4 mr-2" />
                    )}
                    <span className="font-medium">
                      {promo.type === "percentage" ? `${promo.value}% off` : `₹${promo.value} off`}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Min Amount:</span> ₹{promo.minAmount}
                  </div>
                  {promo.maxDiscount && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Max Discount:</span> ₹{promo.maxDiscount}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Usage:</span> {promo.usedCount}/{promo.usageLimit}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Expires:</span> {new Date(promo.expiryDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Revenue:</span> ₹{promo.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Usage Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Usage Progress</span>
                  <span>{Math.round((promo.usedCount / promo.usageLimit) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((promo.usedCount / promo.usageLimit) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => alert(`View analytics for ${promo.code}`)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Analytics
                </button>
                <button
                  onClick={() => alert(`Edit promo ${promo.code}`)}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(promo.id, promo.isActive)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                    promo.isActive
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  {promo.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Promo Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Promo Code</h2>
                  <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreatePromo} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code *</label>
                      <input
                        type="text"
                        value={promoData.code}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                        placeholder="e.g., SAVE20"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type *</label>
                      <select
                        value={promoData.type}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, type: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (₹)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={promoData.description}
                      onChange={(e) => setPromoData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the promotion"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value *</label>
                      <input
                        type="number"
                        value={promoData.value}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, value: e.target.value }))}
                        placeholder={promoData.type === "percentage" ? "20" : "100"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount (₹)</label>
                      <input
                        type="number"
                        value={promoData.minAmount}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, minAmount: e.target.value }))}
                        placeholder="1000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Discount (₹)</label>
                      <input
                        type="number"
                        value={promoData.maxDiscount}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, maxDiscount: e.target.value }))}
                        placeholder="500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit *</label>
                      <input
                        type="number"
                        value={promoData.usageLimit}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, usageLimit: e.target.value }))}
                        placeholder="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="date"
                        value={promoData.expiryDate}
                        onChange={(e) => setPromoData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={promoData.isActive}
                      onChange={(e) => setPromoData((prev) => ({ ...prev, isActive: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Activate immediately
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Promo Code
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
