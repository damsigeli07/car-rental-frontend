import React, { useState, useEffect } from 'react';
import { carAPI } from '../services/api';
import CarCard from '../components/CarCard';
import '../styles/Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    minPrice: '',
    maxPrice: ''
  });

  // Fetch all cars on component mount
  useEffect(() => {
    fetchAllCars();
  }, []);

  // Filter cars when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, cars]);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const response = await carAPI.getAllCars();
      if (response.success) {
        setCars(response.data);
      }
    } catch (err) {
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = cars;

    if (filters.brand) {
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuel_type === filters.fuelType);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.daily_price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.daily_price <= filters.maxPrice);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      fuelType: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  return (
    <div className="cars-page">
      <h1>Browse Cars</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Filters Section */}
      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Search by brand..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="fuelType">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              value={filters.fuelType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Rs."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Rs."
            />
          </div>
        </div>

        <button onClick={clearFilters} className="btn-clear-filters">
          Clear Filters
        </button>
      </div>

      {/* Cars Grid */}
      <div className="cars-count">
        Showing {filteredCars.length} of {cars.length} cars
      </div>

      {filteredCars.length === 0 ? (
        <div className="no-cars">
          <p>No cars found matching your criteria.</p>
          <button onClick={clearFilters} className="btn-secondary">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.car_id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;