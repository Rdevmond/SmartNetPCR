import React from 'react';
import { GitBranch, Box, Calculator, Info, ChevronRight, Cpu, Network, Zap, Target } from 'lucide-react';

const DecisionTree = () => {
  const steps = [
    {
      title: "Input Acquisition",
      icon: Box,
      desc: "Menangkap 3 parameter krusial: Bandwidth (Mbps), Tipe Aktivitas, dan Keluhan Subjektif.",
      color: "bg-blue-500",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "Metric Calculation",
      icon: Calculator,
      desc: "Pemrosesan variabel Skor (Kec + Keluhan - Gap) dan Surplus (Kec - Demand).",
      color: "bg-purple-500",
      shadow: "shadow-purple-500/20"
    },
    {
      title: "Rule Induction",
      icon: GitBranch,
      desc: "Pengecekan ambang batas threshold dinamis untuk penentuan label akhir.",
      color: "bg-[#003366]",
      shadow: "shadow-blue-900/20"
    }
  ];

  const rules = [
    { condition: "Skor ≤ -0.5", result: "Sangat Buruk", color: "bg-red-500", desc: "Gangguan Parah" },
    { condition: "Skor ≤ 1.5", result: "Buruk", color: "bg-orange-500", desc: "Performa Lemah" },
    { condition: "Skor ≤ 2.5", result: "Cukup", color: "bg-yellow-500", desc: "Batas Minimum" },
    { condition: "Surplus ≤ 0.5", result: "Cukup", color: "bg-yellow-600", desc: "Pas-pasan" },
    { condition: "Lainnya", result: "Baik", color: "bg-emerald-500", desc: "Optimal" }
  ];

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-24 animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100 mb-8">
             Algorithm Architecture
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#003366] mb-8 tracking-tight">Logika <span className="text-gradient">Pohon Keputusan</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Eksplorasi mendalam bagaimana mesin NetCheck PCR melakukan klasifikasi kualitas jaringan menggunakan pendekatan rule-based yang dioptimalkan.
          </p>
        </div>

        {/* Formula Section */}
        <div className="glass-dark p-12 md:p-16 rounded-[3rem] shadow-2xl mb-24 relative overflow-hidden group">
          {/* Animated Background Icons */}
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <Cpu size={250} />
          </div>
          <div className="absolute bottom-0 left-0 p-12 opacity-5 group-hover:-rotate-12 transition-transform duration-700">
            <Network size={200} />
          </div>

          <h3 className="text-2xl font-black text-white mb-12 flex items-center">
            <Calculator className="mr-4 text-[#FFD700] w-8 h-8" />
            Core Mathematical Foundation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[2rem] backdrop-blur-xl group hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-6">
                 <p className="text-[#FFD700] text-xs font-black uppercase tracking-widest">Main Score</p>
                 <Zap size={16} className="text-[#FFD700]" />
              </div>
              <p className="text-3xl md:text-4xl font-mono font-black text-white tracking-tighter">Skor = Kec + Keluhan − Gap</p>
              <div className="mt-8 pt-8 border-t border-white/5">
                 <p className="text-xs text-gray-400 font-medium leading-relaxed">Variabel Gap dihitung secara dinamis berdasarkan selisih kebutuhan aktivitas (Demand) dengan bandwidth real-time.</p>
              </div>
            </div>

            <div className="glass-card bg-white/5 border-white/10 p-10 rounded-[2rem] backdrop-blur-xl group hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-6">
                 <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Surplus Metric</p>
                 <Target size={16} className="text-blue-400" />
              </div>
              <p className="text-3xl md:text-4xl font-mono font-black text-white tracking-tighter">Surplus = Kec − Demand</p>
              <div className="mt-8 pt-8 border-t border-white/5">
                 <p className="text-xs text-gray-400 font-medium leading-relaxed">Menentukan ketersediaan bandwidth sisa. Nilai kritis adalah ≤ 0.5 Mbps untuk aktivitas berat.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Visualization */}
        <div className="mb-32">
          <h3 className="text-3xl font-black text-center text-[#003366] mb-16 tracking-tight">System Workflow Architecture</h3>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-[#003366] opacity-30 -z-10"></div>
            
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 text-center group">
                  <div className={`w-24 h-24 ${step.color} text-white rounded-[2rem] ${step.shadow} flex items-center justify-center mx-auto mb-8 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl`}>
                    <step.icon size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-[#003366] mb-4">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium px-4">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="md:hidden">
                    <ChevronRight className="text-gray-300 w-8 h-8 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Decision Rules Grid */}
        <div className="glass-card p-12 md:p-16 rounded-[3rem] border-white/50 shadow-2xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <GitBranch size={100} />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h3 className="text-3xl font-black text-[#003366] flex items-center tracking-tight">
              <GitBranch className="mr-4 text-blue-500" />
              Decision Induction Table
            </h3>
            <div className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest">
               Rule-Based Engine v1.0
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {rules.map((rule, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-gray-50/50 flex flex-col items-center text-center border border-gray-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500">
                <span className="text-[10px] font-black text-gray-300 uppercase mb-6 tracking-widest group-hover:text-blue-400 transition-colors">IF {rule.condition}</span>
                <div className={`w-full py-4 ${rule.color} text-white rounded-2xl font-black text-sm shadow-xl shadow-gray-200 mb-4 tracking-tight group-hover:scale-105 transition-transform`}>
                  {rule.result}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{rule.desc}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-start space-x-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Info size={60} className="text-blue-500" />
            </div>
            <Info className="text-blue-500 shrink-0 mt-1" />
            <div className="relative z-10">
               <p className="text-sm font-black text-blue-900 mb-2 uppercase tracking-widest">Interpretabilitas Model</p>
               <p className="text-sm text-blue-800 leading-relaxed font-medium">
                 Model ini dirancang untuk memiliki interpretabilitas tinggi. Setiap keputusan yang diambil oleh sistem dapat dilacak kembali ke formula matematika dan parameter input yang diberikan oleh pengguna, memastikan transparansi penuh dalam proses klasifikasi.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
