import React from 'react';
import { Globe, Mail, Phone, MapPin, Activity, Send, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#001f3f] text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-24 -left-24 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight">NetCheck <span className="text-blue-400">PCR</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Mewujudkan transparansi kualitas jaringan di Politeknik Caltex Riau melalui analisis data cerdas berbasis Decision Tree.
            </p>
            <div className="flex space-x-4">
              {[Send, ExternalLink, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Layanan</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/predict" className="hover:text-blue-400 transition-colors">Cek Kualitas Sekarang</a></li>
              <li><a href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard Publik</a></li>
              <li><a href="/tree" className="hover:text-blue-400 transition-colors">Logika Sistem</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">Tentang Proyek</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Tautan PCR</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="https://pcr.ac.id" className="hover:text-blue-400 transition-colors">Website PCR</a></li>
              <li><a href="https://mahasiswa.pcr.ac.id" className="hover:text-blue-400 transition-colors">Portal Mahasiswa</a></li>
              <li><a href="https://bsti.pcr.ac.id" className="hover:text-blue-400 transition-colors">BSTI PCR</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Dokumentasi API</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>Jl. Umban Sari No.1, Rumbai, Pekanbaru</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>info@pcr.ac.id</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>(0761) 53939</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} NetCheck PCR. Politeknik Caltex Riau.
          </p>
          <div className="flex items-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
