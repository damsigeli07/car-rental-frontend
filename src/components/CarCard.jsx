import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
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
    <div className="car-card">
      <div className="car-image">
        <div className="car-placeholder">🚗</div>
        <span className={`status-badge ${getStatusColor(car.status)}`}>
          {car.status.toUpperCase()}
        </span>
      </div>

      <div className="car-info">
        <h3 className="car-title">
          {car.brand} {car.model}
        </h3>

        <p className="car-year">{car.year}</p>

        <div className="car-details">
          <span className="detail">⛽ {car.fuel_type}</span>
          <span className="detail">👥 {car.seating_capacity} seats</span>
        </div>

        <p className="car-description">{car.description}</p>

        <div className="car-footer">
          <div className="price">
            <span className="label">Daily Rate</span>
            <span className="amount">Rs. {car.daily_price}</span>
          </div>

          <Link to={`/cars/${car.car_id}`} className="btn-view-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;