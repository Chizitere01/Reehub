"use client"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Calendar } from "lucide-react"
import { mockServices } from "../data/mockData"

export function ServiceDetailPage() {
  const { category } = useParams<{ category: string }>()
  const service = mockServices.find((s) => s.category === category)

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-600 hover:text-blue-700">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-8">
              <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
              <p className="text-blue-100 text-lg">{service.description}</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Specialized Treatments</h2>

                  <div className="space-y-6">
                    {service.subServices.map((subService, index) => (
                      <motion.div
                        key={subService.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="border-l-4 border-blue-500 pl-6"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{subService.name}</h3>
                        <p className="text-gray-600 mb-4">{subService.description}</p>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">What's Included:</h4>
                          <ul className="space-y-1">
                            {subService.inclusions.map((inclusion) => (
                              <li key={inclusion} className="flex items-center text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {inclusion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Our {service.name}?</h3>

                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Certified and experienced physiotherapists</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Personalized treatment plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Home-based care for convenience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Latest treatment techniques and equipment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Flexible scheduling options</span>
                      </li>
                    </ul>

                    <div className="space-y-4">
                      <Link
                        to="/patient/book"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Now
                      </Link>

                      <Link
                        to="/contact"
                        className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                      >
                        Get Free Consultation
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Did You Know?</h4>
                    <p className="text-yellow-700 text-sm">
                      Early intervention with physiotherapy can significantly reduce recovery time and prevent chronic
                      conditions from developing.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
