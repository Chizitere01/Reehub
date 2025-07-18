"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  MessageSquare,
  UserCircle,
  LogOut,
  ChevronDown,
  Settings,
  Calendar,
  DollarSign,
  Users,
  Flag,
  BarChart,
  Home,
  BookOpen,
  PlusCircle,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useChat } from "../contexts/ChatContext"

export function Navbar() {
  const { user, logout } = useAuth()
  const { chatRooms } = useChat()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false) // Close mobile menu on route change
    setIsUserMenuOpen(false) // Close user menu on route change
  }, [location.pathname])

  const unreadChatCount = chatRooms.reduce((total, room) => total + room.unreadCount, 0)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Join Our Team", path: "/join-team" },
    { name: "Contact", path: "/contact" },
  ]

  const userDashboardLinks =
    user?.role === "patient"
      ? [
          { name: "Dashboard", path: "/patient/dashboard", icon: Home },
          { name: "Appointments", path: "/patient/appointments", icon: Calendar },
          { name: "Documents", path: "/patient/documents", icon: BookOpen },
          { name: "Chat", path: "/patient/chat", icon: MessageSquare, badge: unreadChatCount },
          { name: "Book Session", path: "/patient/book", icon: PlusCircle },
          { name: "Settings", path: "/patient/settings", icon: Settings },
        ]
      : user?.role === "physio"
        ? [
            { name: "Dashboard", path: "/physio/dashboard", icon: Home },
            { name: "Requests", path: "/physio/requests", icon: Users },
            { name: "Appointments", path: "/physio/appointments", icon: Calendar },
            { name: "Earnings", path: "/physio/earnings", icon: DollarSign },
            { name: "Chat", path: "/physio/chat", icon: MessageSquare, badge: unreadChatCount },
            { name: "Settings", path: "/physio/settings", icon: Settings },
          ]
        : user?.role === "admin"
          ? [
              { name: "Dashboard", path: "/admin/dashboard", icon: Home },
              { name: "Users", path: "/admin/users", icon: Users },
              { name: "Bookings", path: "/admin/bookings", icon: Calendar },
              { name: "Promotions", path: "/admin/promos", icon: Flag },
              { name: "Chat Admin", path: "/admin/chat", icon: MessageSquare },
              { name: "Analytics", path: "/admin/analytics", icon: BarChart },
            ]
          : []

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              ReeHub
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section: Auth/User Menu & Mobile Toggle */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors"
                >
                  <UserCircle className="w-6 h-6" />
                  <span className="font-medium hidden sm:block">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        Signed in as <span className="font-semibold">{user.email}</span>
                      </div>
                      {userDashboardLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <link.icon className="w-4 h-4" />
                          <span>{link.name}</span>
                          {link.badge && link.badge > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                              {link.badge > 99 ? "99+" : link.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg pb-4"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                    location.pathname === link.path ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userDashboardLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center space-x-2 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                      {link.badge && link.badge > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {link.badge > 99 ? "99+" : link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
