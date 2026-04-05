import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH ENDPOINTS
// ============================================
export const authAPI = {
  register: (name, email, password, phone) =>
    API.post('/auth/register', { name, email, password, phone }),
  login: (email, password) =>
    API.post('/auth/login', { email, password }),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (name, phone) =>
    API.put('/auth/profile', { name, phone })
};

// ============================================
// CAR ENDPOINTS
// ============================================
export const carAPI = {
  getAllCars: () => API.get('/cars'),
  getCarById: (carId) => API.get(`/cars/${carId}`),
  searchCars: (brand, fuelType, minPrice, maxPrice) =>
    API.get('/cars/search', {
      params: { brand, fuelType, minPrice, maxPrice }
    }),
  checkAvailability: (carId, startDate, endDate) =>
    API.get('/cars/availability', {
      params: { carId, startDate, endDate }
    }),
  createCar: (data) => API.post('/cars', data),
  updateCar: (carId, data) => API.put(`/cars/${carId}`, data),
  deleteCar: (carId) => API.delete(`/cars/${carId}`)
};

// ============================================
// BOOKING ENDPOINTS
// ============================================
export const bookingAPI = {
  createBooking: (carId, startDate, endDate) =>
    API.post('/bookings', { carId, startDate, endDate }),
  getMyBookings: () => API.get('/bookings/my-bookings'),
  getBookingById: (bookingId) => API.get(`/bookings/${bookingId}`),
  getAllBookings: () => API.get('/bookings'),
  updateBookingStatus: (bookingId, status) =>
    API.put(`/bookings/${bookingId}/status`, { status }),
  cancelBooking: (bookingId) => API.delete(`/bookings/${bookingId}`)
};

// ============================================
// PAYMENT ENDPOINTS
// ============================================
export const paymentAPI = {
  recordPayment: (bookingId, amount, paymentMethod) =>
    API.post('/payments', { bookingId, amount, paymentMethod }),
  getPaymentHistory: () => API.get('/payments/history'),
  getPaymentById: (paymentId) => API.get(`/payments/${paymentId}`),
  getAllPayments: () => API.get('/payments'),
  getRevenueReport: (startDate, endDate) =>
    API.get('/payments/report/revenue', {
      params: { startDate, endDate }
    })
};

export default API;