"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { mockServices } from "../data/mockData"

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive physiotherapy services designed to help you recover, strengthen, and maintain optimal health
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mockServices.map((service, index) => (
            <motion.div
              key={service.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Specialized Treatments:</h3>
                  {service.subServices.map((subService) => (
                    <div key={subService.name} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900">{subService.name}</h4>
                      <p className="text-sm text-gray-600">{subService.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    to={`/services/${service.category}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Recovery Journey?</h2>
            <p className="text-blue-100 mb-6">Book a consultation with our certified physiotherapists today</p>
            <Link
              to="/patient/book"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
