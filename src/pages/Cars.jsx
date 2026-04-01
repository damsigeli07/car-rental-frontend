import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, MapPin, Users, Zap, DollarSign, Star } from 'lucide-react';
import { carAPI } from '../services/api';
import CarCard from '../components/CarCard';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    minPrice: '',
    maxPrice: '',
    seating: '',
  });

  // Fetch Cars
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await carAPI.getAllCars();
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (err) {
      setError('Failed to load cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Apply Filters & Search
  useEffect(() => {
    let result = cars;

    // Search by brand or model
    if (search) {
      result = result.filter((car) =>
        car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by brand
    if (filters.brand) {
      result = result.filter((car) => car.brand === filters.brand);
    }

    // Filter by fuel type
    if (filters.fuelType) {
      result = result.filter((car) => car.fuel_type === filters.fuelType);
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter((car) => car.daily_price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((car) => car.daily_price <= parseFloat(filters.maxPrice));
    }

    // Filter by seating
    if (filters.seating) {
      result = result.filter((car) => car.seating_capacity === parseInt(filters.seating));
    }

    setFilteredCars(result);
  }, [search, filters, cars]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      brand: '',
      fuelType: '',
      minPrice: '',
      maxPrice: '',
      seating: '',
    });
  };

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))].sort();
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const seatings = [2, 5, 7, 8];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-800 text-white py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Find Your Perfect Car</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Browse our extensive fleet of premium vehicles. Compare prices, features, and book instantly.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-8">
        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Search by brand or model (e.g., Toyota, Honda)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800 placeholder-slate-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* FILTERS SIDEBAR */}
          <div>
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="font-bold text-slate-900">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-blue-600 font-semibold"
              >
                {showFilters ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* BRAND FILTER */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Brand
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => handleFilterChange('brand', '')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      filters.brand === ''
                        ? 'bg-blue-100 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    All Brands
                  </button>
                  {uniqueBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleFilterChange('brand', brand)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        filters.brand === brand
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* FUEL TYPE FILTER */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Fuel Type
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleFilterChange('fuelType', '')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      filters.fuelType === ''
                        ? 'bg-blue-100 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    All Types
                  </button>
                  {fuelTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('fuelType', type)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        filters.fuelType === type
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEATING FILTER */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Seating
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleFilterChange('seating', '')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      filters.seating === ''
                        ? 'bg-blue-100 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    All Seats
                  </button>
                  {seatings.map((seat) => (
                    <button
                      key={seat}
                      onClick={() => handleFilterChange('seating', seat.toString())}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        filters.seating === seat.toString()
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {seat} Seats
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE FILTER */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price Range (per day)
                </h4>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                  <input
                    type="number"
                    placeholder="Max price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              {/* RESET BUTTON */}
              <button
                onClick={handleResetFilters}
                className="w-full px-4 py-2 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* CARS GRID */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-600 font-semibold">Loading cars...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700 font-semibold">{error}</p>
                <button
                  onClick={fetchCars}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No cars found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div>
                <p className="text-slate-600 font-semibold mb-6">
                  Showing {filteredCars.length} of {cars.length} vehicles
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.car_id} car={car} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}