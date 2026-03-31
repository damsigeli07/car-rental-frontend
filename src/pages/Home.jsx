import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, PiggyBank, Zap, CarFront, ChevronRight, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 w-full min-h-[90vh] flex items-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/hero-car.png" 
            alt="Premium Luxury Car" 
            className="w-full h-full object-cover opacity-60 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
          {/* Subtle bottom gradient to blend into page */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star size={14} className="fill-blue-400" /> Top Rated Car Rental Service
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Drive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Extraordinary</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
              Experience the ultimate journey with our premium fleet. Affordable, reliable, and instantly accessible car rentals tailored to your lifestyle.
            </p>
            
            {isAuthenticated ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-xl font-medium text-white flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold shadow-lg shadow-blue-600/30">{user?.name?.charAt(0)}</span>
                  Welcome back, {user?.name}!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={() => navigate('/cars')}
                    className="flex justify-center items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1"
                  >
                    Browse Fleet <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => navigate('/my-bookings')}
                    className="flex justify-center items-center gap-2 bg-slate-800/80 backdrop-blur-md text-white border border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition-all hover:-translate-y-1"
                  >
                    Manage Bookings
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  onClick={() => navigate('/cars')}
                  className="flex justify-center items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1"
                >
                  Explore Cars <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="flex justify-center items-center bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section / Trust Bar */}
      <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-wrap justify-between items-center gap-8">
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-slate-900">100+</span>
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Premium Vehicles</span>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-slate-900">15k+</span>
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Happy Customers</span>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-slate-900">24/7</span>
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Roadside Support</span>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-slate-900">4.9/5</span>
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Average Rating</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Our Promise</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Why Choose Us?</h3>
          <p className="text-lg text-slate-600">We provide more than just a car. We deliver an exceptional experience from booking to drop-off.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
              <PiggyBank size={32} className="text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">Best Price Guarantee</h4>
            <p className="text-slate-600 leading-relaxed">Competitive rates with zero hidden fees. Enjoy luxury and economy vehicles without breaking the bank.</p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
              <CarFront size={32} className="text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">Unmatched Selection</h4>
            <p className="text-slate-600 leading-relaxed">From eco-friendly compacts to premium SUVs and exotics. Access a diverse fleet meticulously maintained.</p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
              <Zap size={32} className="text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">Instant Booking</h4>
            <p className="text-slate-600 leading-relaxed">Reserve your dream car in under 2 minutes. Our seamless digital process gets you on the road faster.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 mt-auto relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -m-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to hit the road?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied drivers. Create your account today and unlock exclusive access to our premium fleet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1"
              >
                Sign Up Now
              </button>
              <button
                onClick={() => navigate('/cars')}
                className="bg-transparent text-white border border-slate-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all hover:-translate-y-1"
              >
                View Fleet
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  CR
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">CarRental</span>
              </div>
              <p className="max-w-sm mb-6 text-slate-400">
                Redefining the car rental experience with premium vehicles, transparent pricing, and unparalleled customer service.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition">X</div>
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition">In</div>
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition">Fb</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/cars" className="hover:text-blue-400 transition">Browse Fleet</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">Email:</span> support@carrental.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">Phone:</span> +94-771-234-567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;