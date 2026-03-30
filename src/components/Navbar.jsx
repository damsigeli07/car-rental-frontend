import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              🚗 CarRental
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/cars" className="hover:text-blue-200 transition">
              Browse Cars
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/my-bookings" className="hover:text-blue-200 transition">
                  My Bookings
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 transition">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Welcome, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block hover:text-blue-200 transition py-2">
              Home
            </Link>
            <Link to="/cars" className="block hover:text-blue-200 transition py-2">
              Browse Cars
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/my-bookings" className="block hover:text-blue-200 transition py-2">
                  My Bookings
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block hover:text-blue-200 transition py-2">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-blue-200 transition py-2">
                  Login
                </Link>
                <Link to="/register" className="block hover:text-blue-200 transition py-2">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;