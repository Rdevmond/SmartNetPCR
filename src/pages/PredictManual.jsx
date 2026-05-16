import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Zap, Globe, PlayCircle, Video, MessageCircle, Gamepad2, DownloadCloud, AlertCircle, CheckCircle2, ArrowRight, MapPin, Activity } from 'lucide-react';
import { ACTIVITIES, SPEEDS, COMPLAINTS, predictQuality } from '../utils/decisionLogic';
import { BUILDING_CATEGORIES } from '../utils/constants';
import { dbService } from '../services/dbService';

const PredictManual = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: 7, // Default to 5-10 Mbps
    activity: 'browsing',
    complaint: 'none',
    building: 'Gedung Utama',
    location: 'Lt. 1 GU'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const prediction = predictQuality(formData.speed, formData.activity, formData.complaint);
    
    const report = {
      ...formData,
      ...prediction,
      timestamp: new Date().toISOString()
    };
    
    const savedReport = dbService.saveReport(report);
    // Navigate to result page (we'll create this or use a shared result view)
    navigate(`/result/${savedReport.id}`);
  };

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-widest border border-purple-100 mb-6">
              Manual Diagnosis Mode
           </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#003366] mb-6 tracking-tight">Input <span className="text-gradient">Parameter Riil</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Masukkan kondisi jaringan yang Anda rasakan saat ini untuk mendapatkan diagnosis instan dari sistem.
          </p>
        </div>

        <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-2xl border-white/50 animate-fade-in delay-200">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Nama Input */}
            <div className="space-y-4">
               <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                 <User className="w-4 h-4 mr-3 text-blue-500" />
                 Nama Anda
               </label>
               <input
                 type="text"
                 required
                 placeholder="Contoh: Budi Santoso"
                 className="w-full px-6 py-5 bg-white/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-gray-800"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
               />
            </div>

            {/* Lokasi Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-blue-500" />
                    Pilih Gedung
                  </label>
                  <select
                    className="w-full px-6 py-5 bg-white/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
                    value={formData.building}
                    onChange={(e) => {
                       const building = e.target.value;
                       setFormData({
                         ...formData, 
                         building, 
                         location: BUILDING_CATEGORIES[building][0] 
                       });
                    }}
                  >
                    {Object.keys(BUILDING_CATEGORIES).map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
               </div>

               <div className="space-y-4">
                  <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                    <Activity className="w-4 h-4 mr-3 text-purple-500" />
                    Area Spesifik
                  </label>
                  <select
                    className="w-full px-6 py-5 bg-white/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  >
                    {BUILDING_CATEGORIES[formData.building].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
               </div>
            </div>

            {/* Speed Range Selection */}
            <div className="space-y-6">
               <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                 <Zap className="w-4 h-4 mr-3 text-yellow-500" />
                 Berapa Kecepatan Internet Anda?
               </label>
               <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {SPEEDS.map((speed) => (
                    <div 
                      key={speed.value}
                      onClick={() => setFormData({...formData, speed: speed.value})}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center group ${
                        formData.speed === speed.value 
                        ? 'border-[#003366] bg-[#003366] text-white shadow-xl' 
                        : 'border-gray-50 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <span className={`text-lg font-black ${formData.speed === speed.value ? 'text-white' : 'text-[#003366]'}`}>
                        {speed.label}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Aktivitas */}
            <div className="space-y-6">
               <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-blue-500" />
                  Apa Tujuan Anda Menggunakan Internet?
               </label>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { key: 'browsing', icon: Globe, color: 'text-blue-500' },
                    { key: 'streaming', icon: PlayCircle, color: 'text-red-500' },
                    { key: 'meeting', icon: Video, color: 'text-emerald-500' },
                    { key: 'social', icon: MessageCircle, color: 'text-amber-500' },
                    { key: 'gaming', icon: Gamepad2, color: 'text-purple-500' },
                    { key: 'download', icon: DownloadCloud, color: 'text-blue-600' }
                  ].map((item) => (
                    <div 
                      key={item.key}
                      onClick={() => setFormData({...formData, activity: item.key})}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center space-y-3 group ${
                        formData.activity === item.key 
                        ? 'border-[#003366] bg-[#003366] text-white shadow-xl' 
                        : 'border-gray-50 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${formData.activity === item.key ? 'bg-white/10 text-white' : `bg-gray-50 ${item.color} group-hover:scale-110 transition-transform`}`}>
                         <item.icon size={24} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest leading-tight ${formData.activity === item.key ? 'text-white' : 'text-gray-400'}`}>
                        {ACTIVITIES[item.key]?.label?.split('(')[0] || item.key}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Keluhan */}
            <div className="space-y-6">
              <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                <AlertCircle className="w-4 h-4 mr-3 text-blue-500" />
                Ada Kendala yang Dirasakan?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Object.entries(COMPLAINTS).map(([key, data]) => (
                  <div 
                    key={key}
                    onClick={() => setFormData({...formData, complaint: key})}
                    className={`cursor-pointer p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
                      formData.complaint === key 
                      ? 'border-[#003366] bg-[#003366] text-white shadow-2xl shadow-blue-900/30' 
                      : 'border-gray-50 bg-white hover:border-blue-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.complaint === key ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <AlertCircle size={20} />
                       </div>
                       <span className={`font-bold ${formData.complaint === key ? 'text-white' : 'text-gray-700'}`}>{data.label}</span>
                    </div>
                    {formData.complaint === key && <CheckCircle2 className="w-6 h-6 text-[#FFD700]" />}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-[#003366] text-white font-black text-lg rounded-3xl shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform hover:-translate-y-1 flex items-center justify-center group btn-premium"
            >
              Lihat Diagnosis
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictManual;
