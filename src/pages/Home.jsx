import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CarRental</h1>
          <p>Find and book your perfect car in just a few clicks</p>
          {!isAuthenticated ? (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/cars" className="btn btn-secondary">
                Browse Cars
              </Link>
            </div>
          ) : (
            <Link to="/cars" className="btn btn-primary">
              Browse Cars Now
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose CarRental?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🚗</span>
            <h3>Wide Selection</h3>
            <p>Choose from hundreds of cars across all categories</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Best Prices</h3>
            <p>Competitive pricing with no hidden charges</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Quick Booking</h3>
            <p>Book a car in less than 5 minutes</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Safe & Secure</h3>
            <p>Your data is protected with latest security</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {isAuthenticated && user?.role === 'admin' && (
        <section className="admin-quick-links">
          <h2>Admin Quick Links</h2>
          <div className="quick-links">
            <Link to="/admin" className="quick-link">
              📊 Dashboard
            </Link>
            <Link to="/admin" className="quick-link">
              🚗 Manage Cars
            </Link>
            <Link to="/admin" className="quick-link">
              📅 Manage Bookings
            </Link>
            <Link to="/admin" className="quick-link">
              💳 Payments
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;