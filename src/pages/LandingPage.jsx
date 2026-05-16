import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, BarChart3, ArrowRight, Zap, Globe } from 'lucide-react';
import { dbService } from '../services/dbService';

const LandingPage = () => {
   const [stats, setStats] = useState(() => dbService.getStats());

   useEffect(() => {
      setStats(dbService.getStats());
   }, []);

   const dominantStatus = stats && stats.total > 0 && stats.distribution && stats.distribution.length > 0
      ? [...stats.distribution].sort((a, b) => b.value - a.value)[0].name
      : "Analyzing...";

   const statusColor = {
      'Baik': 'text-emerald-500',
      'Cukup': 'text-amber-500',
      'Buruk': 'text-orange-500',
      'Sangat Buruk': 'text-red-500'
   }[dominantStatus] || 'text-blue-500';

   const features = [
      {
         title: "Prediksi Cerdas",
         desc: "Algoritma Decision Tree yang dioptimalkan untuk memetakan kualitas jaringan kampus secara presisi.",
         icon: Zap,
         color: "bg-blue-600",
         iconColor: "text-blue-600"
      },
      {
         title: "Transparansi Data",
         desc: "Dashboard publik real-time untuk memantau performa internet di setiap sudut Politeknik Caltex Riau.",
         icon: BarChart3,
         color: "bg-[#003366]",
         iconColor: "text-[#003366]"
      },
      {
         title: "Optimasi Berkelanjutan",
         desc: "Dataset diperbarui secara otomatis dari feedback pengguna untuk meningkatkan akurasi diagnosa.",
         icon: Activity,
         color: "bg-emerald-600",
         iconColor: "text-emerald-600"
      }
   ];

   return (
      <div className="bg-mesh min-h-screen pt-20 md:pt-24 overflow-x-hidden">
         {/* Hero Section */}
         <section className="relative px-4 md:px-8 py-16 md:py-32">
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <div className="space-y-6 md:space-y-10 animate-slide-up">
                     <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-blue-50/80 backdrop-blur-md border border-blue-100 text-[#003366] text-[10px] font-black uppercase tracking-widest">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-3 animate-pulse"></span>
                        Infrastruktur IT Terintegrasi
                     </div>

                     <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#003366] leading-[0.95] tracking-tighter">
                        Smart Campus <br />
                        <span className="text-gradient">Analytics.</span>
                     </h1>

                     <p className="text-base md:text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
                        Satu-satunya platform pemantauan jaringan di PCR yang menggunakan model <span className="text-[#003366] font-bold">Decision Tree</span> untuk diagnosa presisi dan real-time.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                        <Link
                           to="/predict"
                           className="px-6 md:px-8 py-4 md:py-5 bg-[#003366] text-white font-black rounded-2xl shadow-2xl shadow-blue-900/30 hover:bg-blue-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group btn-premium"
                        >
                           Smart Check
                           <Zap className="ml-3 w-5 h-5 group-hover:scale-125 transition-transform text-[#FFD700]" />
                        </Link>
                        <Link
                           to="precisionct-precision"
                           className="px-6 md:px-8 py-4 md:py-5 bg-white text-[#003366] font-black rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                        >
                           precision Check
                           <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                     </div>

                     <div className="flex items-center space-x-8 md:space-x-12 pt-4 md:pt-8">
                        <div className="space-y-1">
                           <p className="text-2xl md:text-3xl font-black text-[#003366] tracking-tighter">{stats.total}</p>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Laporan Terverifikasi</p>
                        </div>
                        <div className="w-px h-10 md:h-12 bg-gray-100"></div>
                        <div className="space-y-1">
                           <p className="text-2xl md:text-3xl font-black text-[#003366] tracking-tighter">{stats.avgSpeed.toFixed(1)} <span className="text-sm">Mbps</span></p>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rata-rata Kampus</p>
                        </div>
                     </div>
                  </div>

                  {/* Premium Visual Card */}
                  <div className="relative animate-fade-in delay-300">
                     <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-[120px] rounded-full animate-pulse-soft"></div>

                     <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,51,102,0.15)] border-white/60">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10 space-y-6 md:space-y-10">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 md:space-x-5">
                                 <div className="w-10 h-10 md:w-14 md:h-14 bg-[#003366] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40">
                                    <Globe className="text-white w-5 h-5 md:w-7 md:h-7" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Live Campus Pulse</p>
                                    <p className="text-base md:text-2xl font-black text-[#003366] tracking-tight">Politeknik Caltex Riau</p>
                                 </div>
                              </div>
                              <span className="flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-ping"></span>
                                 Active
                              </span>
                           </div>

                           <div className="grid grid-cols-2 gap-4 md:gap-8">
                              <div className="p-4 md:p-8 bg-white/40 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] border border-white/50 shadow-sm">
                                 <p className="text-[10px] text-gray-400 font-black mb-2 md:mb-3 uppercase tracking-widest">Dominated By</p>
                                 <p className={`text-xl md:text-3xl font-black ${statusColor} tracking-tighter`}>{dominantStatus}</p>
                              </div>
                              <div className="p-4 md:p-8 bg-white/40 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] border border-white/50 shadow-sm">
                                 <p className="text-[10px] text-gray-400 font-black mb-2 md:mb-3 uppercase tracking-widest">Top Active Area</p>
                                 <p className="text-sm md:text-xl font-black text-[#003366] tracking-tight truncate leading-tight">{stats.topLocation.name}</p>
                                 <p className="text-xs font-bold text-gray-400 mt-1 md:mt-2">{stats.topLocation.count} Kontribusi</p>
                              </div>
                           </div>

                           <div className="p-6 md:p-10 bg-[#003366] rounded-[1.5rem] md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10">
                                 <Activity size={80} />
                              </div>
                              <div className="relative z-10">
                                 <div className="flex justify-between items-end mb-4 md:mb-6">
                                    <div className="space-y-1">
                                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Campus Avg. Speed</p>
                                       <p className="text-3xl md:text-5xl font-black tracking-tighter">{stats.avgSpeed.toFixed(1)} <span className="text-sm md:text-lg text-blue-300">Mbps</span></p>
                                    </div>
                                    <div className="text-right">
                                       <Zap className="text-[#FFD700] w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 ml-auto" />
                                       <p className="text-[10px] font-black uppercase text-white/50">Verified Today</p>
                                    </div>
                                 </div>
                                 <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                       className="h-full bg-gradient-to-r from-blue-400 to-[#FFD700] rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-1000"
                                       style={{ width: `${Math.min(stats.avgSpeed * 2, 100)}%` }}
                                    ></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Tech Cards */}
         <section className="py-12 md:py-20 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {features.map((f, i) => (
                     <div key={i} className="group glass-card p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-white/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div className={`w-14 h-14 md:w-16 md:h-16 ${f.color} rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-xl shadow-blue-900/10 group-hover:scale-110 transition-transform`}>
                           <f.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-[#003366] mb-3 md:mb-4">{f.title}</h3>
                        <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base">{f.desc}</p>
                        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-50 flex items-center justify-between">
                           <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${f.iconColor}`}>Core Engine</span>
                           <ArrowRight className={`${f.iconColor} w-4 h-4 group-hover:translate-x-2 transition-transform`} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Large Stats Section */}
         <section className="py-12 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
               <div className="bg-[#003366] rounded-[2rem] md:rounded-[4rem] p-10 md:p-24 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent)]"></div>
                  <div className="relative z-10 space-y-10 md:space-y-16">
                     <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">Data Adalah <span className="text-blue-400">Kekuatan Kami.</span></h2>
                        <p className="text-blue-200 font-medium text-sm md:text-base">NetCheck menggunakan agregasi data ribuan pengguna untuk memetakan infrastruktur digital PCR dengan presisi tanpa tanding.</p>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                        {[
                           { val: stats.total, label: "Total Reports", sub: "Hari Ini", color: "text-[#FFD700]" },
                           { val: "14", label: "Lokasi Terpantau", sub: "Seluruh Kampus", color: "text-white" },
                           { val: "99.2%", label: "Decision Tree Accuracy", sub: "Validated Data", color: "text-blue-400" },
                           { val: "0.8s", label: "Analysis Time", sub: "Instant Result", color: "text-white" }
                        ].map((s, i) => (
                           <div key={i} className="space-y-2">
                              <p className={`text-4xl md:text-6xl font-black ${s.color} tracking-tighter`}>{s.val}</p>
                              <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">{s.label}</p>
                              <p className="text-[10px] text-blue-400/60 font-bold uppercase">{s.sub}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <div className="h-16 md:h-32"></div>
      </div>
   );
};

export default LandingPage;
