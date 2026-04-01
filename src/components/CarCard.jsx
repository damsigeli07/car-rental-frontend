import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Zap, Calendar, DollarSign, Check, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CarCard({ car }) {
  const { user } = useAuth();
  const isAvailable = car.status === 'available';

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-300">
      {/* IMAGE SECTION */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        {/* Car emoji/placeholder */}
        <div className="w-full h-full flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
          🚗
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Check className="w-3 h-3" />
              Available
            </span>
          ) : (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Unavailable
            </span>
          )}
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
          {car.year}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5">
        {/* Car Name */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-slate-500">{car.fuel_type} • {car.seating_capacity} Seats</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 mb-4">
          <div className="flex flex-col items-center text-center">
            <Users className="w-4 h-4 text-blue-600 mb-1" />
            <span className="text-xs font-semibold text-slate-900">{car.seating_capacity}</span>
            <span className="text-xs text-slate-500">Seats</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap className="w-4 h-4 text-blue-600 mb-1" />
            <span className="text-xs font-semibold text-slate-900">{car.fuel_type}</span>
            <span className="text-xs text-slate-500">Type</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="w-4 h-4 text-blue-600 mb-1" />
            <span className="text-xs font-semibold text-slate-900">{car.year}</span>
            <span className="text-xs text-slate-500">Year</span>
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {car.description}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-blue-600">
            Rs. {car.daily_price.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500">/day</span>
        </div>

        {/* CTA Button */}
        {user && isAvailable ? (
          <Link
            to={`/cars/${car.car_id}`}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 group/btn"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        ) : user && !isAvailable ? (
          <button
            disabled
            className="w-full px-4 py-3 bg-slate-300 text-slate-600 font-semibold rounded-lg cursor-not-allowed opacity-50"
          >
            Currently Unavailable
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full inline-flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Sign in to Book
          </Link>
        )}
      </div>
    </div>
  );
}