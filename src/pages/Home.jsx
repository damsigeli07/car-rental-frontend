import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">🚗 Welcome to CarRental</h1>
          <p className="text-xl mb-8">Affordable, reliable car rental service for your journey</p>
          
          {isAuthenticated ? (
            <>
              <p className="text-lg mb-6">Welcome back, {user?.name}! 👋</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate('/cars')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Browse Cars
                </button>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="bg-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
                >
                  My Bookings
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">Competitive rates for all vehicle types. Book with confidence.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
            <p className="text-gray-600">Choose from 100+ vehicles. From economy cars to premium SUVs.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Simple and secure booking process. Reserve in minutes.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-blue-600 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to rent?</h2>
            <p className="text-lg mb-6">Create an account and start browsing available cars today!</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Sign Up Now
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 CarRental. All rights reserved.</p>
          <p className="mt-2">Email: contact@carrentals.com | Phone: +94-771-234-567</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;