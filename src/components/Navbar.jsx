import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, GitBranch, ShieldCheck, Zap, BarChart3, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/predict', label: 'Smart Check', icon: Zap },
    { path: '/predict-manual', label: 'Precision Check', icon: Activity },
    { path: '/tree', label: 'Alur Keputusan', icon: GitBranch },
    { path: '/about', label: 'Tentang', icon: ShieldCheck },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 px-4 md:py-4 md:px-10' : 'py-4 px-4 md:py-8 md:px-10'}`}>
      <nav className="max-w-7xl mx-auto">
        <div className={`glass-nav rounded-2xl md:rounded-[2rem] px-5 md:px-10 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'shadow-2xl border-white/40' : 'border-transparent shadow-none'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#003366] rounded-xl flex items-center justify-center text-white mr-2 md:mr-3 shadow-lg group-hover:rotate-12 transition-transform">
              <Activity size={18} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base md:text-lg font-black text-[#003366] tracking-tighter leading-tight">Network View</span>
              <span className="text-[8px] md:text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none">PCR System</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 lg:px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center group ${
                  isActive(item.path)
                    ? 'bg-[#003366] text-white shadow-lg'
                    : 'text-gray-500 hover:text-[#003366] hover:bg-blue-50'
                }`}
              >
                <item.icon size={13} className={`mr-1.5 transition-transform group-hover:scale-110 ${isActive(item.path) ? 'text-blue-300' : 'text-gray-400'}`} />
                <span className="hidden lg:inline">{item.label}</span>
                <span className="lg:hidden">{item.label.split(' ')[0]}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-xl text-[#003366] hover:bg-blue-50 transition-colors"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden mt-2 transition-all duration-300 overflow-hidden ${isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="glass-card rounded-2xl p-3 flex flex-col space-y-1 border-white/50 shadow-xl">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-xl text-sm font-black flex items-center space-x-3 transition-all ${
                  isActive(item.path)
                    ? 'bg-[#003366] text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-[#003366]'
                }`}
              >
                <item.icon size={16} className={isActive(item.path) ? 'text-blue-300' : 'text-gray-400'} />
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
