import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI, paymentAPI, carAPI } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [cars, setCars] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    completedBookings: 0,
    pendingBookings: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch bookings
      const bookingsResponse = await bookingAPI.getAllBookings();
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.data);
      }

      // Fetch payments
      const paymentsResponse = await paymentAPI.getAllPayments();
      if (paymentsResponse.success) {
        setPayments(paymentsResponse.data);
      }

      // Fetch cars
      const carsResponse = await carAPI.getAllCars();
      if (carsResponse.success) {
        setCars(carsResponse.data);
      }

      // Calculate stats
      calculateStats(bookingsResponse.data, paymentsResponse.data);
    } catch (err) {
      console.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData, paymentsData) => {
    const totalBookings = bookingsData.length;
    const completedBookings = bookingsData.filter(b => b.booking_status === 'completed').length;
    const pendingBookings = bookingsData.filter(b => b.booking_status === 'pending').length;
    const totalRevenue = paymentsData.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    setStats({
      totalBookings,
      totalRevenue,
      completedBookings,
      pendingBookings
    });
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

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <button onClick={() => navigate('/')} className="btn-back">
          ← Back to Home
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📅</span>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">Rs. {stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-number">{stats.completedBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pendingBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🚗</span>
          <div className="stat-content">
            <h3>Total Cars</h3>
            <p className="stat-number">{cars.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💳</span>
          <div className="stat-content">
            <h3>Payments</h3>
            <p className="stat-number">{payments.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button
          className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
        <button
          className={`tab ${activeTab === 'cars' ? 'active' : ''}`}
          onClick={() => setActiveTab('cars')}
        >
          Cars
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Dashboard Overview</h2>
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Quick Actions</h3>
                <div className="actions">
                  <button className="action-btn">+ Add New Car</button>
                  <button className="action-btn">📊 Generate Report</button>
                  <button className="action-btn">🔔 Notifications</button>
                </div>
              </div>

              <div className="overview-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {bookings.slice(0, 5).map(booking => (
                    <div key={booking.booking_id} className="activity-item">
                      <span className="activity-icon">📅</span>
                      <div className="activity-info">
                        <p>{booking.brand} {booking.model}</p>
                        <small>{new Date(booking.created_at).toLocaleDateString()}</small>
                      </div>
                      <span className={`status-badge ${getStatusColor(booking.booking_status)}`}>
                        {booking.booking_status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>All Bookings</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Car</th>
                    <th>Dates</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.booking_id}>
                      <td>#{booking.booking_id}</td>
                      <td>{booking.name}</td>
                      <td>{booking.brand} {booking.model}</td>
                      <td>
                        {new Date(booking.start_date).toLocaleDateString()} to{' '}
                        {new Date(booking.end_date).toLocaleDateString()}
                      </td>
                      <td>Rs. {booking.total_price}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(booking.booking_status)}`}>
                          {booking.booking_status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="payments-section">
            <h2>Payment Transactions</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Booking ID</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.payment_id}>
                      <td>#{payment.payment_id}</td>
                      <td>#{payment.booking_id}</td>
                      <td>Rs. {payment.amount}</td>
                      <td>{payment.payment_method.replace('_', ' ').toUpperCase()}</td>
                      <td>
                        <span className={`status-badge status-${payment.payment_status}`}>
                          {payment.payment_status.toUpperCase()}
                        </span>
                      </td>
                      <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div className="cars-section">
            <h2>Fleet Management</h2>
            <div className="cars-grid">
              {cars.map(car => (
                <div key={car.car_id} className="car-admin-card">
                  <div className="car-header">
                    <h3>{car.brand} {car.model}</h3>
                    <span className={`status-badge status-${car.status}`}>
                      {car.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="car-details">
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Fuel:</strong> {car.fuel_type}</p>
                    <p><strong>Seats:</strong> {car.seating_capacity}</p>
                    <p><strong>Daily Rate:</strong> Rs. {car.daily_price}</p>
                  </div>

                  <div className="car-actions">
                    <button className="btn-edit-car">Edit</button>
                    <button className="btn-delete-car">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;