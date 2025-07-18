"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ChatProvider } from "./contexts/ChatContext"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { ProtectedRoute } from "./components/ProtectedRoute"

// Public Pages
import { LandingPage } from "./pages/LandingPage"
import { LoginPage } from "./pages/LoginPage"
import { ServicesPage } from "./pages/ServicesPage"
import { ServiceDetailPage } from "./pages/ServiceDetailPage"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { BlogPage } from "./pages/BlogPage"
import { JoinTeamPage } from "./pages/JoinTeamPage"

// Patient Pages
import { PatientDashboard } from "./pages/patient/PatientDashboard"
import { PatientAppointments } from "./pages/patient/PatientAppointments"
import { PatientDocuments } from "./pages/patient/PatientDocuments"
import { PatientChat } from "./pages/patient/PatientChat"
import { PatientSettings } from "./pages/patient/PatientSettings"
import { BookingWizard } from "./pages/patient/BookingWizard"

// Physiotherapist Pages
import { PhysioDashboard } from "./pages/physio/PhysioDashboard"
import { PhysioRequests } from "./pages/physio/PhysioRequests"
import { PhysioAppointments } from "./pages/physio/PhysioAppointments"
import { PhysioEarnings } from "./pages/physio/PhysioEarnings"
import { PhysioSettings } from "./pages/physio/PhysioSettings"

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { AdminUsers } from "./pages/admin/AdminUsers"
import { AdminBookings } from "./pages/admin/AdminBookings"
import { AdminPromos } from "./pages/admin/AdminPromos"
import { AdminChat } from "./pages/admin/AdminChat"

// Chat Pages
import { ChatPage } from "./pages/ChatPage"

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/join-team" element={<JoinTeamPage />} />

                {/* Patient Routes */}
                <Route
                  path="/patient/dashboard"
                  element={<ProtectedRoute roles={["patient"]} element={<PatientDashboard />} />}
                />
                <Route
                  path="/patient/appointments"
                  element={<ProtectedRoute roles={["patient"]} element={<PatientAppointments />} />}
                />
                <Route
                  path="/patient/documents"
                  element={<ProtectedRoute roles={["patient"]} element={<PatientDocuments />} />}
                />
                <Route
                  path="/patient/chat"
                  element={<ProtectedRoute roles={["patient"]} element={<PatientChat />} />}
                />
                <Route
                  path="/patient/settings"
                  element={<ProtectedRoute roles={["patient"]} element={<PatientSettings />} />}
                />
                <Route
                  path="/patient/book"
                  element={<ProtectedRoute roles={["patient"]} element={<BookingWizard />} />}
                />

                {/* Physiotherapist Routes */}
                <Route
                  path="/physio/dashboard"
                  element={<ProtectedRoute roles={["physio"]} element={<PhysioDashboard />} />}
                />
                <Route
                  path="/physio/requests"
                  element={<ProtectedRoute roles={["physio"]} element={<PhysioRequests />} />}
                />
                <Route
                  path="/physio/appointments"
                  element={<ProtectedRoute roles={["physio"]} element={<PhysioAppointments />} />}
                />
                <Route
                  path="/physio/earnings"
                  element={<ProtectedRoute roles={["physio"]} element={<PhysioEarnings />} />}
                />
                <Route
                  path="/physio/settings"
                  element={<ProtectedRoute roles={["physio"]} element={<PhysioSettings />} />}
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={<ProtectedRoute roles={["admin"]} element={<AdminDashboard />} />}
                />
                <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]} element={<AdminUsers />} />} />
                <Route
                  path="/admin/bookings"
                  element={<ProtectedRoute roles={["admin"]} element={<AdminBookings />} />}
                />
                <Route path="/admin/promos" element={<ProtectedRoute roles={["admin"]} element={<AdminPromos />} />} />
                <Route path="/admin/chat" element={<ProtectedRoute roles={["admin"]} element={<AdminChat />} />} />

                {/* Centralized Chat Page (can be accessed by patient/physio/admin) */}
                <Route
                  path="/chat"
                  element={<ProtectedRoute roles={["patient", "physio", "admin"]} element={<ChatPage />} />}
                />

                {/* Redirect to login if no matching route and not authenticated */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ChatProvider>
    </AuthProvider>
  )
}
