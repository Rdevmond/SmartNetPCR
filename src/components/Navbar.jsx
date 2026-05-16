import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, GitBranch, Info, Home, Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/predict', label: 'Smart Check', icon: Activity },
    { path: '/predict-manual', label: 'Manual Check', icon: Zap },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tree', label: 'Alur Keputusan', icon: GitBranch },
    { path: '/about', label: 'Tentang', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
      <nav className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500`}>
        <div className={`glass-nav rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'shadow-lg border-white/20' : 'shadow-none border-transparent'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-12 ${
              isScrolled ? 'bg-[#003366] text-white' : 'bg-white text-[#003366] shadow-sm'
            }`}>
              <Activity className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#003366]">
              NetCheck <span className="text-blue-500 font-black">PCR</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 group ${
                  isActive(item.path)
                    ? 'text-[#003366]'
                    : 'text-gray-500 hover:text-[#003366] hover:bg-white/50'
                }`}
              >
                <item.icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive(item.path) ? 'text-blue-500' : ''}`} />
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Call to Action or Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/predict" 
              className="hidden lg:flex px-5 py-2.5 bg-[#003366] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-xl hover:bg-blue-800 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Mulai Prediksi
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#003366] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden mt-4 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass-card rounded-2xl p-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all ${
                  isActive(item.path)
                    ? 'bg-[#003366] text-white'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
