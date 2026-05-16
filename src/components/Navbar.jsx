import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, GitBranch, Info, Home, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/predict', label: 'Smart Check', icon: Zap },
    { path: '/predict-manual', label: 'Precision Check', icon: Activity },
    { path: '/tree', label: 'Alur Keputusan', icon: GitBranch },
    { path: '/about', label: 'Tentang', icon: ShieldCheck },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 px-10' : 'py-8 px-10'}`}>
      <nav className="max-w-7xl mx-auto">
        <div className={`glass-nav rounded-[2rem] px-10 py-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'shadow-2xl border-white/40' : 'border-transparent shadow-none'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-[#003366] rounded-xl flex items-center justify-center text-white mr-3 shadow-lg group-hover:rotate-12 transition-transform">
              <Activity size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black text-[#003366] tracking-tighter leading-tight">Network View</span>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none">PCR System</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center group ${
                  isActive(item.path)
                    ? 'bg-[#003366] text-white shadow-lg'
                    : 'text-gray-500 hover:text-[#003366] hover:bg-blue-50'
                }`}
              >
                <item.icon size={14} className={`mr-2 transition-transform group-hover:scale-110 ${isActive(item.path) ? 'text-blue-300' : 'text-gray-400'}`} />
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
