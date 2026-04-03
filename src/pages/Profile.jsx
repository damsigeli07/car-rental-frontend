import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authAPI.updateProfile(formData.name, formData.phone);
      
      if (response.success) {
        updateProfile({
          ...user,
          name: formData.name,
          phone: formData.phone
        });
        setSuccess('Profile updated successfully!');
        setEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="profile-page">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Back to Home
      </button>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-header-info">
            <h1>{user?.name}</h1>
            <p className="profile-role">
              {user?.role === 'admin' ? '👨‍💼 Administrator' : '👤 Customer'}
            </p>
            <p className="member-since">
              Member since {new Date(user?.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="btn-edit"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {editing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email (Read-only)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94771234567"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || ''
                      });
                    }}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{formData.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{formData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{formData.phone || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Role:</span>
                  <span className="value">
                    {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="profile-section">
            <h2>Account Settings</h2>
            <div className="account-actions">
              <button onClick={handleLogout} className="btn-logout">
                🚪 Logout
              </button>
              <button className="btn-delete-account">
                ⚠️ Delete Account
              </button>
            </div>
          </div>

          {/* Quick Links */}
          {user?.role !== 'admin' && (
            <div className="profile-section">
              <h2>Quick Links</h2>
              <div className="quick-links">
                <button
                  onClick={() => navigate('/cars')}
                  className="quick-link"
                >
                  🚗 Browse Cars
                </button>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="quick-link"
                >
                  📅 My Bookings
                </button>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="quick-link"
                >
                  💳 Payment History
                </button>
              </div>
            </div>
          )}

          {/* Admin Links */}
          {user?.role === 'admin' && (
            <div className="profile-section">
              <h2>Admin Tools</h2>
              <div className="quick-links">
                <button
                  onClick={() => navigate('/admin')}
                  className="quick-link admin"
                >
                  📊 Admin Dashboard
                </button>
                <button className="quick-link admin">
                  🚗 Manage Cars
                </button>
                <button className="quick-link admin">
                  📅 Manage Bookings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;