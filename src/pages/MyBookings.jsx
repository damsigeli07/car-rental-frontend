import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getMyBookings();
      if (response.success) {
        setBookings(response.data);
      }
    } catch (err) {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.booking_status === filter;
  });

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await bookingAPI.cancelBooking(bookingId);
        if (response.success) {
          alert('Booking cancelled successfully');
          fetchMyBookings();
        }
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>No {filter !== 'all' ? filter : ''} bookings found</p>
          <button onClick={() => navigate('/cars')} className="btn-browse">
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map(booking => (
            <div key={booking.booking_id} className="booking-card">
              <div className="booking-header">
                <div className="car-info">
                  <h3>{booking.brand} {booking.model}</h3>
                  <p className="booking-id">Booking #: {booking.booking_id}</p>
                </div>
                <span className={`status-badge ${getStatusColor(booking.booking_status)}`}>
                  {booking.booking_status.toUpperCase()}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail">
                  <span className="label">Check-in:</span>
                  <span className="value">{new Date(booking.start_date).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <span className="label">Check-out:</span>
                  <span className="value">{new Date(booking.end_date).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <span className="label">Total Price:</span>
                  <span className="value price">Rs. {booking.total_price}</span>
                </div>
                <div className="detail">
                  <span className="label">Booked on:</span>
                  <span className="value">{new Date(booking.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="booking-actions">
                {booking.booking_status === 'pending' && (
                  <>
                    <button
                      onClick={() => navigate(`/payment/${booking.booking_id}`)}
                      className="btn-pay"
                    >
                      Proceed to Payment
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.booking_id)}
                      className="btn-cancel"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {booking.booking_status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => navigate(`/payment/${booking.booking_id}`)}
                      className="btn-view"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.booking_id)}
                      className="btn-cancel"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {booking.booking_status === 'completed' && (
                  <button
                    onClick={() => navigate(`/payment/${booking.booking_id}`)}
                    className="btn-view"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;