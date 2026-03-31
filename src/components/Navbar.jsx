import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Add a slight shadow and blur when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  // Decide navbar colors based on scroll and if we're on the dark home header
  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
      : (isHome ? 'bg-transparent py-5' : 'bg-white border-b border-gray-100 py-4')
  }`;

  const linkTextColor = (scrolled || !isHome) ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white';
  const logoTextColor = (scrolled || !isHome) ? 'text-slate-900' : 'text-white';

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center transition-all duration-300">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className={`text-2xl font-bold tracking-tight ${logoTextColor} flex items-center gap-2`}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm">
                CR
              </div>
              CarRental
            </Link>
          </div>

          {/* Desktop Menu Center */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8 space-x-8">
            <Link to="/" className={`font-medium transition-colors ${linkTextColor}`}>Home</Link>
            <Link to="/cars" className={`font-medium transition-colors ${linkTextColor}`}>Browse Cars</Link>
            {isAuthenticated && (
              <Link to="/my-bookings" className={`font-medium transition-colors ${linkTextColor}`}>My Bookings</Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className={`font-medium transition-colors ${linkTextColor} flex items-center gap-1`}>
                <Shield size={16} /> Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Right */}
          <div className="hidden md:flex items-center shrink-0 space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className={`flex items-center gap-2 ${logoTextColor}`}>
                  <div className="bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {user?.name?.charAt(0) || <User size={16} />}
                  </div>
                  <span className="text-sm font-medium pr-2 hidden lg:block">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors font-medium text-sm"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`font-medium px-4 py-2 rounded-lg transition-colors ${linkTextColor}`}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${logoTextColor} focus:outline-none`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/cars" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Browse Cars</Link>
            
            {isAuthenticated ? (
              <>
                <Link onClick={() => setIsMenuOpen(false)} to="/my-bookings" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">My Bookings</Link>
                {user?.role === 'admin' && (
                  <Link onClick={() => setIsMenuOpen(false)} to="/admin" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                    <Shield size={18} /> Admin Panel
                  </Link>
                )}
                <div className="border-t border-gray-100 my-2 pt-2">
                  <div className="px-3 py-2 flex items-center gap-3">
                    <div className="bg-slate-200 text-slate-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                       {user?.name?.charAt(0) || <User size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left px-3 py-3 flex items-center gap-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} /> Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-100 my-2 pt-4 flex flex-col gap-3 px-3">
                <Link onClick={() => setIsMenuOpen(false)} to="/login" className="w-full text-center border border-slate-300 text-slate-700 px-4 py-3 rounded-lg font-medium hover:bg-slate-50 transition">Log in</Link>
                <Link onClick={() => setIsMenuOpen(false)} to="/register" className="w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;