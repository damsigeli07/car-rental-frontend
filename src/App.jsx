import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              {/* ============================================ */}
              {/* PUBLIC ROUTES (No authentication needed) */}
              {/* ============================================ */}

              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Authentication Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Car Browsing (Public) */}
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:carId" element={<CarDetail />} />

              {/* ============================================ */}
              {/* PROTECTED ROUTES (Authentication required) */}
              {/* ============================================ */}

              {/* Booking Routes */}
              <Route
                path="/booking/:carId"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />

              {/* Bookings Management */}
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />

              {/* Payment */}
              <Route
                path="/payment/:bookingId"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />

              {/* User Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* ADMIN ROUTES (Admin access only) */}
              {/* ============================================ */}

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* CATCH ALL - Redirect to home */}
              {/* ============================================ */}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;