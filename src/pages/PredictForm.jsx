import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Wifi, MapPin, Zap, Globe, PlayCircle, Video, MessageCircle, Gamepad2, DownloadCloud, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { ACTIVITIES, COMPLAINTS, predictQuality } from '../utils/decisionLogic';
import { BUILDING_CATEGORIES } from '../utils/constants';
import { dbService } from '../services/dbService';

const PredictForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    building: 'Gedung Utama',
    location: 'Lt. 1 GU',
    activity: 'browsing',
    complaint: 'none'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatedSpeed, setSimulatedSpeed] = useState(0);
  const [testStage, setTestStage] = useState(''); // '','connecting', 'testing', 'finalizing'

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Stage 1: Connecting
    setTestStage('connecting');
    
    setTimeout(() => {
      // Stage 2: Testing Speed
      setTestStage('testing');
      
      // Simulate speed based on location historical data
      const reports = dbService.getReports();
      const locReports = reports.filter(r => r.location === formData.location);
      const avgSpeed = locReports.length > 0 
        ? locReports.reduce((acc, r) => acc + (parseFloat(r.speed) || 0), 0) / locReports.length 
        : 10;
      
      const speed = +(avgSpeed * (0.8 + Math.random() * 0.4)).toFixed(2);
      setSimulatedSpeed(speed);
      
      setTimeout(() => {
        // Stage 3: Finalizing
        setTestStage('finalizing');
        
        setTimeout(() => {
          const prediction = predictQuality(speed, formData.activity, formData.complaint);
          
          const report = {
            ...formData,
            speed: speed,
            ...prediction,
            timestamp: new Date().toISOString()
          };
          
          const savedReport = dbService.saveReport(report);
          navigate(`/result/${savedReport.id}`);
        }, 1000);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-6">
              AI Smart Diagnosis
           </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#003366] mb-6 tracking-tight">Cek <span className="text-gradient">Kualitas Jaringan</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Analisis cerdas berdasarkan lokasi spesifik Anda menggunakan data historis kampus.
          </p>
        </div>

        <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-2xl border-white/50 animate-fade-in delay-200">
          {isSubmitting ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-pulse">
               <div className="relative">
                  <Loader2 className="w-24 h-24 text-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Wifi className="w-8 h-8 text-[#003366]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">
                     {testStage === 'connecting' && 'Menghubungkan ke Server PCR...'}
                     {testStage === 'testing' && 'Mengukur Kecepatan Sinyal...'}
                     {testStage === 'finalizing' && 'Menganalisis dengan Decision Tree...'}
                  </h3>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                     {testStage === 'testing' ? `Terdeteksi: ${simulatedSpeed || '...'} Mbps` : 'Mohon tunggu sebentar'}
                  </p>
               </div>
            </div>
          ) : (
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
                 placeholder="Masukkan nama untuk laporan"
                 className="w-full px-6 py-5 bg-white/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-gray-800"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
               />
            </div>

            {/* Hierarchical Location */}
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

            {/* Aktivitas */}
            <div className="space-y-6">
               <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                  <Zap className="w-4 h-4 mr-3 text-yellow-500" />
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

            <button
              type="submit"
              className="w-full py-6 bg-[#003366] text-white font-black text-lg rounded-3xl shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform hover:-translate-y-1 flex items-center justify-center group btn-premium"
            >
              Mulai Analisis & Speed Test
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictForm;
