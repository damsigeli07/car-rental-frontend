import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI, paymentAPI } from '../services/api';
import '../styles/Payment.css';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    paymentMethod: 'credit_card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
    bankName: ''
  });

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const bookingResponse = await bookingAPI.getBookingById(bookingId);
      if (bookingResponse.success) {
        setBooking(bookingResponse.data);
        
        // Try to fetch existing payment
        try {
          const paymentResponse = await paymentAPI.getPaymentByBooking(bookingId);
          if (paymentResponse.success) {
            setPayment(paymentResponse.data);
          }
        } catch (err) {
          // No payment yet, that's ok
        }
      }
    } catch (err) {
      setError('Failed to load booking details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePaymentForm = () => {
    switch (formData.paymentMethod) {
      case 'credit_card':
      case 'debit_card':
        if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCVV) {
          setError('Please fill all card details');
          return false;
        }
        if (formData.cardNumber.length !== 16) {
          setError('Card number must be 16 digits');
          return false;
        }
        break;
      case 'upi':
        if (!formData.upiId) {
          setError('Please enter UPI ID');
          return false;
        }
        break;
      case 'net_banking':
        if (!formData.bankName) {
          setError('Please select your bank');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePaymentForm()) {
      return;
    }

    setProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Record payment
      const response = await paymentAPI.recordPayment(
        bookingId,
        booking.total_price,
        formData.paymentMethod
      );

      if (response.success) {
        setPayment(response.data);
        alert('Payment successful! Your booking is confirmed.');
        setTimeout(() => navigate('/my-bookings'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading payment details...</div>;
  }

  if (!booking) {
    return <div className="error-message">Booking not found</div>;
  }

  if (payment) {
    return (
      <div className="payment-page payment-success">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Payment Successful!</h1>
          
          <div className="success-details">
            <div className="detail">
              <span className="label">Payment ID:</span>
              <span className="value">{payment.payment_id}</span>
            </div>
            <div className="detail">
              <span className="label">Amount Paid:</span>
              <span className="value">Rs. {payment.amount}</span>
            </div>
            <div className="detail">
              <span className="label">Payment Method:</span>
              <span className="value">{payment.payment_method.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div className="detail">
              <span className="label">Payment Date:</span>
              <span className="value">{new Date(payment.payment_date).toLocaleDateString()}</span>
            </div>
            <div className="detail">
              <span className="label">Status:</span>
              <span className="value status-completed">COMPLETED</span>
            </div>
          </div>

          <div className="booking-confirmation">
            <h2>Booking Confirmation</h2>
            <div className="confirmation-details">
              <p><strong>Car:</strong> {booking.brand} {booking.model}</p>
              <p><strong>Check-in:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
              <p><strong>Daily Rate:</strong> Rs. {booking.daily_price}</p>
              <p><strong>Total Price:</strong> Rs. {booking.total_price}</p>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={() => navigate('/my-bookings')} className="btn-primary">
              View My Bookings
            </button>
            <button onClick={() => navigate('/cars')} className="btn-secondary">
              Browse More Cars
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Back
      </button>

      <div className="payment-container">
        {/* Payment Summary */}
        <div className="payment-summary">
          <h2>Payment Summary</h2>

          <div className="summary-box">
            <h3>{booking.brand} {booking.model}</h3>
            
            <div className="summary-detail">
              <span className="label">Check-in:</span>
              <span className="value">{new Date(booking.start_date).toLocaleDateString()}</span>
            </div>
            <div className="summary-detail">
              <span className="label">Check-out:</span>
              <span className="value">{new Date(booking.end_date).toLocaleDateString()}</span>
            </div>
            <div className="summary-detail">
              <span className="label">Daily Rate:</span>
              <span className="value">Rs. {booking.daily_price}</span>
            </div>

            <div className="price-breakdown">
              <div className="breakdown-item">
                <span>Daily Rate</span>
                <span>Rs. {booking.daily_price}</span>
              </div>
              <div className="breakdown-item">
                <span>Insurance</span>
                <span>Included</span>
              </div>
              <div className="breakdown-item">
                <span>Tax (18%)</span>
                <span>Rs. {(booking.total_price * 0.18).toFixed(2)}</span>
              </div>
              <div className="breakdown-item total">
                <span>Total Amount</span>
                <span>Rs. {booking.total_price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="payment-form-section">
          <h2>Payment Details</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Payment Method Selection */}
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="method-options">
                {[
                  { value: 'credit_card', label: '💳 Credit Card', icon: '🔒' },
                  { value: 'debit_card', label: '💳 Debit Card', icon: '🔒' },
                  { value: 'upi', label: '📱 UPI', icon: '📱' },
                  { value: 'net_banking', label: '🏦 Net Banking', icon: '🏦' },
                  { value: 'cash', label: '💵 Cash', icon: '💵' }
                ].map(method => (
                  <label key={method.value} className="method-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleChange}
                    />
                    <span className="method-label">
                      <span className="method-icon">{method.icon}</span>
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Card Payment Form */}
            {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
              <div className="payment-form-group">
                <h3>Card Details</h3>
                
                <div className="form-group">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCVV">CVV</label>
                    <input
                      type="text"
                      id="cardCVV"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {formData.paymentMethod === 'upi' && (
              <div className="payment-form-group">
                <h3>UPI Details</h3>
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID</label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="yourname@upi"
                  />
                </div>
              </div>
            )}

            {/* Net Banking Form */}
            {formData.paymentMethod === 'net_banking' && (
              <div className="payment-form-group">
                <h3>Net Banking</h3>
                <div className="form-group">
                  <label htmlFor="bankName">Select Bank</label>
                  <select
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Bank --</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="other">Other Banks</option>
                  </select>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="terms-section">
              <label className="checkbox">
                <input type="checkbox" required />
                I agree to the payment terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-pay-now"
              disabled={processingPayment}
            >
              {processingPayment ? 'Processing Payment...' : `Pay Rs. ${booking.total_price}`}
            </button>

            <p className="security-notice">
              🔒 Your payment is secured with SSL encryption
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;