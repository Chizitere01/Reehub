"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you for subscribing with email: ${email}`)
    setEmail("")
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">ReeHub</h3>
            <p className="text-gray-300">
              Connecting patients with certified physiotherapists for quality home-based care.
            </p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/services" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Services
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <Link to="/blog" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Blog
              </Link>
              <Link to="/join-team" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Join Our Team
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">info@reehub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-gray-300 text-sm">Subscribe to get updates on health tips and offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} ReeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
