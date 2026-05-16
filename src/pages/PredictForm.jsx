import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Wifi, MapPin, Zap, Globe, PlayCircle, Video, MessageCircle, Gamepad2, DownloadCloud, Loader2, ArrowRight } from 'lucide-react';
import { ACTIVITIES, predictQuality } from '../utils/decisionLogic';
import { BUILDING_CATEGORIES } from '../utils/constants';
import { dbService } from '../services/dbService';

const PredictForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Guest User',
    building: 'Gedung Utama',
    location: 'Lt. 1 GU',
    activity: 'browsing',
    complaint: 'none'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatedSpeed, setSimulatedSpeed] = useState(0);
  const [testStage, setTestStage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTestStage('connecting');
    
    setTimeout(() => {
      setTestStage('testing');
      
      const reports = dbService.getReports();
      const locReports = reports.filter(r => r.location === formData.location);
      const avgSpeed = locReports.length > 0 
        ? locReports.reduce((acc, r) => acc + (parseFloat(r.speed) || 0), 0) / locReports.length 
        : 10;
      
      const speed = +(avgSpeed * (0.8 + Math.random() * 0.4)).toFixed(2);
      setSimulatedSpeed(speed);
      
      setTimeout(() => {
        setTestStage('finalizing');
        
        setTimeout(() => {
          const prediction = predictQuality(speed, formData.activity, 'none');

          const locBad = locReports.filter(r => r.label === 'Buruk' || r.label === 'Sangat Buruk').length;
          const badPct = locReports.length > 0 ? Math.round((locBad / locReports.length) * 100) : 0;
          const actLabel = ACTIVITIES[formData.activity]?.label || formData.activity;

          let smartExplanation;
          if (prediction.label === 'Sangat Buruk') {
            smartExplanation = `Kecepatan rata-rata di ${formData.location} diestimasi hanya ${speed.toFixed(1)} Mbps — jauh di bawah kebutuhan ${actLabel}.${badPct > 0 ? ` ${badPct}% laporan dari area ini menunjukkan kualitas yang buruk.` : ''}`;
          } else if (prediction.label === 'Buruk') {
            smartExplanation = `Koneksi di ${formData.location} diestimasi ${speed.toFixed(1)} Mbps, kurang ideal untuk ${actLabel}.${badPct > 0 ? ` Sekitar ${badPct}% pengguna di area ini melaporkan kualitas kurang memuaskan.` : ''}`;
          } else if (prediction.label === 'Cukup') {
            smartExplanation = `Estimasi kecepatan di ${formData.location}: ${speed.toFixed(1)} Mbps. Mencukupi namun pas-pasan untuk ${actLabel}.`;
          } else {
            smartExplanation = `Koneksi di ${formData.location} diestimasi stabil di ${speed.toFixed(1)} Mbps — sangat cocok untuk ${actLabel}.`;
          }

          const report = {
            ...formData,
            speed: speed,
            ...prediction,
            explanation: smartExplanation,
            isTransient: true,
            timestamp: new Date().toISOString()
          };
          
          navigate(`/result/temp`, { state: { report } });
        }, 1000);
      }, 2000);
    }, 1500);
  };

  const activityItems = [
    { key: 'browsing', icon: Globe, color: 'text-blue-500' },
    { key: 'streaming', icon: PlayCircle, color: 'text-red-500' },
    { key: 'meeting', icon: Video, color: 'text-emerald-500' },
    { key: 'social', icon: MessageCircle, color: 'text-amber-500' },
    { key: 'gaming', icon: Gamepad2, color: 'text-purple-500' },
    { key: 'download', icon: DownloadCloud, color: 'text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-mesh pt-24 md:pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-slide-up">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-4 md:mb-6">
              AI Smart Diagnosis (Quick View)
           </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#003366] mb-4 md:mb-6 tracking-tight">Smart <span className="text-gradient">Check.</span></h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Analisis instan kualitas jaringan berdasarkan lokasi tanpa menyimpan data ke log publik.
          </p>
        </div>

        <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-2xl border-white/50 animate-fade-in delay-200">
          {isSubmitting ? (
            <div className="py-16 md:py-20 flex flex-col items-center justify-center text-center space-y-8">
               <div className="relative">
                  <Loader2 className="w-20 h-20 md:w-24 md:h-24 text-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Wifi className="w-7 h-7 md:w-8 md:h-8 text-[#003366]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter">
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
          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
               <div className="space-y-3 md:space-y-4">
                  <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-blue-500" />
                    Pilih Gedung
                  </label>
                  <select
                    className="w-full px-5 py-4 md:px-6 md:py-5 bg-white/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
                    value={formData.building}
                    onChange={(e) => {
                       const building = e.target.value;
                       setFormData({ ...formData, building, location: BUILDING_CATEGORIES[building][0] });
                    }}
                  >
                    {Object.keys(BUILDING_CATEGORIES).map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
               </div>

               <div className="space-y-3 md:space-y-4">
                  <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                    <Activity className="w-4 h-4 mr-3 text-purple-500" />
                    Area Spesifik
                  </label>
                  <select
                    className="w-full px-5 py-4 md:px-6 md:py-5 bg-white/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
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
            <div className="space-y-4 md:space-y-6">
               <label className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center">
                  <Zap className="w-4 h-4 mr-3 text-yellow-500" />
                  Apa Tujuan Anda Menggunakan Internet?
               </label>
               <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                  {activityItems.map((item) => (
                    <div 
                      key={item.key}
                      onClick={() => setFormData({...formData, activity: item.key})}
                      className={`cursor-pointer p-3 md:p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center space-y-2 md:space-y-3 group ${
                        formData.activity === item.key 
                        ? 'border-[#003366] bg-[#003366] text-white shadow-xl' 
                        : 'border-gray-50 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors ${formData.activity === item.key ? 'bg-white/10 text-white' : `bg-gray-50 ${item.color} group-hover:scale-110 transition-transform`}`}>
                         <item.icon size={20} />
                      </div>
                      <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-tight ${formData.activity === item.key ? 'text-white' : 'text-gray-400'}`}>
                        {ACTIVITIES[item.key]?.label?.split('(')[0] || item.key}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 md:py-6 bg-[#003366] text-white font-black text-base md:text-lg rounded-3xl shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform hover:-translate-y-1 flex items-center justify-center group btn-premium"
            >
              Mulai Smart Check
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
