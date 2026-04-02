import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/CarDetail.css';

const CarDetail = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await carAPI.getCarById(carId);
      if (response.success) {
        setCar(response.data);
      }
    } catch (err) {
      setError('Failed to load car details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${carId}`);
  };

  if (loading) {
    return <div className="loading">Loading car details...</div>;
  }

  if (error || !car) {
    return <div className="error-message">{error || 'Car not found'}</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'rented':
        return 'status-rented';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  };

  return (
    <div className="car-detail">
      <button onClick={() => navigate('/cars')} className="btn-back">
        ← Back to Cars
      </button>

      <div className="detail-container">
        {/* Car Image */}
        <div className="detail-image">
          <div className="car-image-large">🚗</div>
          <span className={`status-badge-large ${getStatusColor(car.status)}`}>
            {car.status.toUpperCase()}
          </span>
        </div>

        {/* Car Info */}
        <div className="detail-info">
          <div className="header">
            <div>
              <h1>{car.brand} {car.model}</h1>
              <p className="year">Year: {car.year}</p>
            </div>
            <div className="price-box">
              <span className="label">Daily Rate</span>
              <span className="price">Rs. {car.daily_price}</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="specifications">
            <h3>Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-icon">⛽</span>
                <span className="spec-label">Fuel Type</span>
                <span className="spec-value">{car.fuel_type.toUpperCase()}</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">👥</span>
                <span className="spec-label">Seating</span>
                <span className="spec-value">{car.seating_capacity} Seats</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">📅</span>
                <span className="spec-label">Added</span>
                <span className="spec-value">{new Date(car.added_date).toLocaleDateString()}</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">✅</span>
                <span className="spec-label">Status</span>
                <span className="spec-value">{car.status.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="description">
            <h3>Description</h3>
            <p>{car.description || 'No description available'}</p>
          </div>

          {/* Booking Button */}
          <div className="booking-section">
            {car.status === 'available' ? (
              <button
                onClick={handleBookNow}
                className="btn-book-now"
              >
                Book Now
              </button>
            ) : (
              <button className="btn-unavailable" disabled>
                Currently {car.status.toUpperCase()}
              </button>
            )}
          </div>

          {/* Features */}
          <div className="features">
            <h3>Why Choose This Car?</h3>
            <ul>
              <li>✓ Well-maintained and regularly serviced</li>
              <li>✓ Comprehensive insurance coverage included</li>
              <li>✓ 24/7 roadside assistance</li>
              <li>✓ Free cancellation up to 24 hours</li>
              <li>✓ Flexible pickup and drop-off times</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;