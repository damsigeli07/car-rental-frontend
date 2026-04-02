import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Booking.css';

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });
  const [calculatedDays, setCalculatedDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    calculatePrice();
  }, [formData, car]);

  const fetchCarDetails = async () => {
    try {
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

  const calculatePrice = () => {
    if (!formData.startDate || !formData.endDate || !car) {
      setCalculatedDays(0);
      setTotalPrice(0);
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days > 0) {
      setCalculatedDays(days);
      setTotalPrice(days * car.daily_price);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Check availability
      const availabilityResponse = await carAPI.checkAvailability(
        carId,
        formData.startDate,
        formData.endDate
      );

      if (!availabilityResponse.data.isAvailable) {
        setError('Car is not available for the selected dates.');
        setSubmitting(false);
        return;
      }

      // Create booking
      const response = await bookingAPI.createBooking(
        carId,
        formData.startDate,
        formData.endDate
      );

      if (response.success) {
        navigate(`/payment/${response.data.bookingId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!car) {
    return <div className="error-message">Car not found</div>;
  }

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="booking-page">
      <button onClick={() => navigate(`/cars/${carId}`)} className="btn-back">
        ← Back to Car Details
      </button>

      <div className="booking-container">
        {/* Car Summary */}
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="car-summary-box">
            <div className="car-name">
              <h3>{car.brand} {car.model}</h3>
              <p className="car-year">{car.year}</p>
            </div>
            <div className="daily-rate">
              <span className="label">Daily Rate</span>
              <span className="amount">Rs. {car.daily_price}</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="booking-details">
            <div className="detail-row">
              <span>Check-in Date:</span>
              <strong>{formData.startDate || 'Not selected'}</strong>
            </div>
            <div className="detail-row">
              <span>Check-out Date:</span>
              <strong>{formData.endDate || 'Not selected'}</strong>
            </div>
            {calculatedDays > 0 && (
              <>
                <div className="detail-row">
                  <span>Number of Days:</span>
                  <strong>{calculatedDays} day{calculatedDays > 1 ? 's' : ''}</strong>
                </div>
                <div className="detail-row">
                  <span>Daily Rate:</span>
                  <strong>Rs. {car.daily_price}</strong>
                </div>
                <div className="detail-row divider">
                  <span>Total Price:</span>
                  <strong className="total">Rs. {totalPrice.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div className="booking-form-section">
          <h2>Complete Your Booking</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Check-in Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={getTodayDate()}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Check-out Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || getTodayDate()}
                required
              />
            </div>

            {/* Customer Info (pre-filled) */}
            <div className="customer-info">
              <h3>Customer Information</h3>
              <div className="info-display">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="terms">
              <label className="checkbox">
                <input type="checkbox" required />
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="btn-proceed"
              disabled={!formData.startDate || !formData.endDate || submitting}
            >
              {submitting ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>

          {/* Info Box */}
          <div className="info-box">
            <h4>📋 Booking Information</h4>
            <ul>
              <li>You can cancel free up to 24 hours before pickup</li>
              <li>Insurance is included in the rental price</li>
              <li>A valid driver's license is required</li>
              <li>Fuel policy: Full to Full (return with full tank)</li>
              <li>Late return charges: Rs. 500 per hour</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;