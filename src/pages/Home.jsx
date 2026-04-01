import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Users, Clock, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '60px 60px',
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: CONTENT */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-blue-400" fill="currentColor" />
                <span className="text-sm font-medium text-blue-300">Top Rated Car Rental Service</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
                  Drive the
                  <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 text-transparent bg-clip-text">
                    Extraordinary
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-xl text-slate-300 leading-relaxed max-w-md">
                Experience the ultimate journey with our premium fleet. Affordable, reliable, and instantly accessible car rentals tailored to your lifestyle.
              </p>

              {/* Personalized Welcome */}
              {user && (
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg px-4 py-3">
                  <p className="text-slate-200">
                    👋 Welcome back, <span className="font-semibold text-blue-300">{user.name}</span>!
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {user ? (
                  <>
                    <Link
                      to="/cars"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
                    >
                      Browse Fleet
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-500 text-white font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-500/10 transition-all duration-300"
                    >
                      Manage Bookings
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-500 text-white font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-500/10 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT: IMAGE ILLUSTRATION */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full h-96">
                {/* Decorative circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                
                {/* Car emoji/illustration placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl animate-bounce" style={{ animationDuration: '3s' }}>
                    🏎️
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 left-10 bg-blue-500/20 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-semibold">
                  Premium Fleet
                </div>
                <div className="absolute bottom-10 right-10 bg-purple-500/20 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-semibold">
                  Best Price
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 py-12 border-t border-slate-700/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Premium Vehicles', value: '100+' },
              { label: 'Happy Customers', value: '15k+' },
              { label: 'Roadside Support', value: '24/7' },
              { label: 'Average Rating', value: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative z-10 py-20 border-t border-slate-700/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose CarRental?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We've perfected the art of car rental with a focus on convenience, affordability, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: 'Affordable Prices',
                desc: 'Competitive rates for all vehicle types. Book with confidence.',
              },
              {
                icon: '🚗',
                title: 'Wide Selection',
                desc: 'Choose from 100+ vehicles. From economy cars to premium SUVs.',
              },
              {
                icon: '⚡',
                title: 'Easy Booking',
                desc: 'Simple and secure booking process. Reserve in minutes.',
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                desc: 'Manage your bookings on the go. Get instant confirmations.',
              },
              {
                icon: '🛡️',
                title: 'Insurance Coverage',
                desc: 'Comprehensive coverage included. Drive with peace of mind.',
              },
              {
                icon: '🌍',
                title: 'Multiple Locations',
                desc: 'Pick up and drop off at convenient locations nationwide.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative bg-slate-800/50 backdrop-blur border border-slate-700/50 p-8 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-20 border-t border-slate-700/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Our Customers Say</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Real experiences from real travelers who chose CarRental.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Kumar',
                location: 'Colombo, Sri Lanka',
                rating: 5,
                text: 'Amazing experience! The booking was seamless and the car was in pristine condition. Will definitely rent again!',
                avatar: '👩‍💼',
              },
              {
                name: 'Amara Silva',
                location: 'Kandy, Sri Lanka',
                rating: 5,
                text: 'Best rates in town and excellent customer service. They really care about their customers. Highly recommended!',
                avatar: '👨‍💼',
              },
              {
                name: 'Isabelle Johnson',
                location: 'Galle, Sri Lanka',
                rating: 5,
                text: 'Very professional team. The whole process from booking to return was smooth and hassle-free. Great job!',
                avatar: '👩‍🔬',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-8 rounded-xl hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA NEWSLETTER */}
      <section className="relative z-10 py-20 border-t border-slate-700/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur border border-blue-500/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Get Exclusive Offers</h2>
            <p className="text-slate-300 mb-8">
              Subscribe to our newsletter for special discounts and latest updates on our fleet.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm mt-4 animate-pulse">✓ Thanks for subscribing!</p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-700/50 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">CarRental</h3>
              <p className="text-slate-400 text-sm">Premium car rental service for your journey.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Browse Cars</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>📧 contact@carrental.com</li>
                <li>📱 +94-771-234-567</li>
                <li>📍 Colombo, Sri Lanka</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm">
            <p>© 2026 CarRental. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}