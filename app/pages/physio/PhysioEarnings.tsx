"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Calendar, Download, Eye, Filter, BarChart3 } from "lucide-react"

export function PhysioEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth")
  const [selectedYear, setSelectedYear] = useState("2025")

  const earningsData = {
    thisWeek: {
      total: 12500,
      sessions: 8,
      average: 1562.5,
      change: 15,
      changeType: "increase",
    },
    thisMonth: {
      total: 45600,
      sessions: 32,
      average: 1425,
      change: 22,
      changeType: "increase",
    },
    lastMonth: {
      total: 37400,
      sessions: 28,
      average: 1335.7,
      change: -8,
      changeType: "decrease",
    },
    thisYear: {
      total: 156800,
      sessions: 112,
      average: 1400,
      change: 35,
      changeType: "increase",
    },
  }

  const monthlyEarnings = [
    { month: "Jan 2025", earnings: 45600, sessions: 32, patients: 18 },
    { month: "Dec 2024", earnings: 37400, sessions: 28, patients: 16 },
    { month: "Nov 2024", earnings: 42300, sessions: 30, patients: 17 },
    { month: "Oct 2024", earnings: 38900, sessions: 26, patients: 15 },
    { month: "Sep 2024", earnings: 41200, sessions: 29, patients: 16 },
    { month: "Aug 2024", earnings: 39800, sessions: 27, patients: 15 },
  ]

  const recentTransactions = [
    {
      id: "TXN001",
      date: "2025-01-19",
      patient: "John Doe",
      service: "Knee Pain Session",
      amount: 1500,
      status: "completed",
      paymentMethod: "UPI",
      sessionDuration: "60 min",
    },
    {
      id: "TXN002",
      date: "2025-01-19",
      patient: "Sarah Wilson",
      service: "Back Pain Assessment",
      amount: 1500,
      status: "completed",
      paymentMethod: "Card",
      sessionDuration: "60 min",
    },
    {
      id: "TXN003",
      date: "2025-01-18",
      patient: "Raj Patel",
      service: "Sports Injury Session",
      amount: 1500,
      status: "completed",
      paymentMethod: "Net Banking",
      sessionDuration: "60 min",
    },
    {
      id: "TXN004",
      date: "2025-01-18",
      patient: "Priya Sharma",
      service: "Weekly Package - Session 2",
      amount: 1250,
      status: "completed",
      paymentMethod: "UPI",
      sessionDuration: "60 min",
    },
    {
      id: "TXN005",
      date: "2025-01-17",
      patient: "Amit Singh",
      service: "Shoulder Pain Session",
      amount: 1500,
      status: "pending",
      paymentMethod: "Card",
      sessionDuration: "60 min",
    },
  ]

  const packageBreakdown = [
    {
      package: "Single Session",
      sessions: 18,
      earnings: 27000,
      percentage: 59.2,
      avgRate: 1500,
    },
    {
      package: "Weekly Package",
      sessions: 10,
      earnings: 12500,
      percentage: 27.4,
      avgRate: 1250,
    },
    {
      package: "Monthly Package",
      sessions: 4,
      earnings: 6100,
      percentage: 13.4,
      avgRate: 1525,
    },
  ]

  const topConditions = [
    { condition: "Back Pain", sessions: 12, earnings: 15000, percentage: 32.9 },
    { condition: "Knee Pain", sessions: 8, earnings: 12000, percentage: 26.3 },
    { condition: "Sports Injury", sessions: 6, earnings: 9000, percentage: 19.7 },
    { condition: "Neck Pain", sessions: 4, earnings: 6000, percentage: 13.2 },
    { condition: "Arthritis", sessions: 2, earnings: 3600, percentage: 7.9 },
  ]

  const currentData = earningsData[selectedPeriod as keyof typeof earningsData]

  const handleDownloadReport = () => {
    alert("Downloading earnings report...")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings Dashboard</h1>
              <p className="text-gray-600">Track your income and financial performance</p>
            </div>
            <button
              onClick={handleDownloadReport}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </button>
          </div>
        </motion.div>

        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisYear">This Year</option>
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">₹{currentData.total.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      currentData.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {currentData.changeType === "increase" ? "+" : ""}
                    {currentData.change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs previous period</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{currentData.sessions}</p>
                <p className="text-sm text-gray-500 mt-2">Sessions completed</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average per Session</p>
                <p className="text-3xl font-bold text-gray-900">₹{Math.round(currentData.average)}</p>
                <p className="text-sm text-gray-500 mt-2">Per session rate</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-3xl font-bold text-gray-900">{currentData.change}%</p>
                <p className="text-sm text-gray-500 mt-2">Period over period</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Earnings Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Monthly Earnings Trend</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {monthlyEarnings.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{month.month}</h3>
                      <p className="text-sm text-gray-600">
                        {month.sessions} sessions • {month.patients} patients
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{month.earnings.toLocaleString()}</p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(month.earnings / Math.max(...monthlyEarnings.map((m) => m.earnings))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Package Breakdown */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Package Breakdown</h3>

              <div className="space-y-4">
                {packageBreakdown.map((pkg) => (
                  <div key={pkg.package} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{pkg.package}</span>
                      <span className="text-sm font-bold text-gray-900">₹{pkg.earnings.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pkg.percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{pkg.sessions} sessions</span>
                      <span>₹{pkg.avgRate} avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Conditions</h3>

              <div className="space-y-3">
                {topConditions.map((condition) => (
                  <div key={condition.condition} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{condition.condition}</p>
                      <p className="text-sm text-gray-500">{condition.sessions} sessions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{condition.earnings.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{condition.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{transaction.patient}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div>
                        <p>{transaction.service}</p>
                        <p className="text-xs text-gray-500">{transaction.sessionDuration}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Financial Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">This Month</h3>
            <p className="text-3xl font-bold mb-1">₹{currentData.total.toLocaleString()}</p>
            <p className="text-green-100 text-sm">
              {currentData.changeType === "increase" ? "↗" : "↘"} {Math.abs(currentData.change)}% from last month
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">Average Session</h3>
            <p className="text-3xl font-bold mb-1">₹{Math.round(currentData.average)}</p>
            <p className="text-blue-100 text-sm">Across all service types</p>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">Total Sessions</h3>
            <p className="text-3xl font-bold mb-1">{currentData.sessions}</p>
            <p className="text-purple-100 text-sm">Completed successfully</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
