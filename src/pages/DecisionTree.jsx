import React, { useState } from 'react';
import { GitBranch, Box, Calculator, ChevronRight, Cpu, Network, Zap, Target, ArrowDown, CheckCircle, XCircle, Info, Sparkles } from 'lucide-react';

const DecisionTree = () => {
  const [activeRule, setActiveRule] = useState(null);

  const formulas = [
    {
      title: "Main Score",
      formula: "Skor = Kec + Keluhan − Gap",
      desc: "Variabel Gap dihitung dinamis dari selisih kebutuhan aktivitas (Demand) dengan bandwidth real-time.",
      accent: "#FFD700",
      icon: Zap,
      bg: "from-[#003366] to-blue-900"
    },
    {
      title: "Surplus Metric",
      formula: "Surplus = Kec − Demand",
      desc: "Menentukan ketersediaan bandwidth sisa. Nilai kritis adalah ≤ 0.5 untuk aktivitas berat.",
      accent: "#60a5fa",
      icon: Target,
      bg: "from-blue-900 to-purple-900"
    }
  ];

  const rules = [
    {
      id: 0,
      condition: "Skor ≤ −0.5",
      result: "Sangat Buruk",
      color: "#ef4444",
      bgLight: "bg-red-50",
      border: "border-red-200",
      badge: "bg-red-500",
      desc: "Gangguan parah. Kecepatan jauh di bawah kebutuhan aktivitas. Butuh tindakan segera.",
      icon: XCircle
    },
    {
      id: 1,
      condition: "Skor ≤ 1.5",
      result: "Buruk",
      color: "#f97316",
      bgLight: "bg-orange-50",
      border: "border-orange-200",
      badge: "bg-orange-500",
      desc: "Performa lemah. Keluhan pengguna sangat mempengaruhi kualitas pengalaman berinternet.",
      icon: XCircle
    },
    {
      id: 2,
      condition: "Skor ≤ 2.5",
      result: "Cukup",
      color: "#eab308",
      bgLight: "bg-yellow-50",
      border: "border-yellow-200",
      badge: "bg-yellow-500",
      desc: "Batas minimum. Masih bisa digunakan namun risiko buffering atau lag masih ada.",
      icon: CheckCircle
    },
    {
      id: 3,
      condition: "Surplus ≤ 0.5",
      result: "Cukup",
      color: "#ca8a04",
      bgLight: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-600",
      desc: "Bandwidth pas-pasan. Kapasitas hampir habis terserap oleh kebutuhan aktivitas.",
      icon: CheckCircle
    },
    {
      id: 4,
      condition: "Lainnya",
      result: "Baik",
      color: "#22c55e",
      bgLight: "bg-green-50",
      border: "border-green-200",
      badge: "bg-green-500",
      desc: "Kondisi optimal. Bandwidth mencukupi untuk semua jenis aktivitas internet.",
      icon: CheckCircle
    }
  ];

  const inputs = [
    { label: "Bandwidth", unit: "Mbps", desc: "Kecepatan internet terukur", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Aktivitas", unit: "Tipe", desc: "Jenis penggunaan internet", color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Keluhan", unit: "Level", desc: "Gangguan yang dirasakan user", color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="bg-mesh min-h-screen pt-24 md:pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24 animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100 mb-6">
            <Sparkles size={12} className="mr-2" />
            Algorithm Architecture
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#003366] mb-6 tracking-tight">
            Logika <span className="text-gradient">Pohon Keputusan</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Eksplorasi mendalam bagaimana mesin NetCheck PCR melakukan klasifikasi kualitas jaringan menggunakan pendekatan rule-based yang dioptimalkan.
          </p>
        </div>

        {/* === STEP 1: INPUT === */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">1</div>
            <div>
              <h2 className="text-xl font-black text-[#003366]">Input Acquisition</h2>
              <p className="text-sm text-gray-400 font-medium">3 parameter yang ditangkap dari pengguna</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {inputs.map((inp, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border-white/50 hover-lift group">
                <div className={`inline-flex px-3 py-1 ${inp.bg} ${inp.color} rounded-xl text-[10px] font-black uppercase tracking-widest mb-4`}>
                  {inp.unit}
                </div>
                <h3 className={`text-2xl font-black ${inp.color} mb-1`}>{inp.label}</h3>
                <p className="text-xs text-gray-400 font-medium">{inp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-blue-200 to-purple-300"></div>
            <ArrowDown size={20} className="text-purple-400" />
          </div>
        </div>

        {/* === STEP 2: FORMULA === */}
        <div className="mb-6 animate-fade-in delay-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-purple-500/30">2</div>
            <div>
              <h2 className="text-xl font-black text-[#003366]">Metric Calculation</h2>
              <p className="text-sm text-gray-400 font-medium">Pemrosesan variabel berdasarkan formula matematika</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formulas.map((f, i) => (
              <div key={i} className={`bg-gradient-to-br ${f.bg} p-8 md:p-10 rounded-3xl relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <f.icon size={120} color="white" />
                </div>
                <div className="relative z-10">
                  <p style={{ color: f.accent }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">{f.title}</p>
                  <p className="text-2xl md:text-3xl font-mono font-black text-white tracking-tight mb-4 leading-snug">{f.formula}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-purple-300 to-[#003366]/40"></div>
            <ArrowDown size={20} className="text-[#003366]/60" />
          </div>
        </div>

        {/* === STEP 3: RULES === */}
        <div className="mb-12 animate-fade-in delay-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#003366] text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-900/30">3</div>
            <div>
              <h2 className="text-xl font-black text-[#003366]">Rule Induction</h2>
              <p className="text-sm text-gray-400 font-medium">Klik setiap aturan untuk melihat detail</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border-white/50 shadow-xl">
            {/* Flow visual */}
            <div className="relative">
              {rules.map((rule, i) => (
                <div key={rule.id}>
                  <div
                    onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
                    className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
                      activeRule === rule.id ? `${rule.border} ${rule.bgLight} shadow-lg` : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-4">
                        {/* IF badge */}
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">IF</span>
                        {/* Condition */}
                        <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-mono font-black text-sm text-[#003366]">{rule.condition}</span>
                        </div>
                        {/* Arrow */}
                        <ChevronRight size={16} className="text-gray-300" />
                        {/* Result badge */}
                        <div className={`px-4 py-2 ${rule.badge} rounded-xl shadow-sm`}>
                          <span className="font-black text-sm text-white tracking-tight">{rule.result}</span>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${activeRule === rule.id ? rule.bgLight : 'bg-gray-50'}`}>
                        <rule.icon size={16} style={{ color: rule.color }} />
                      </div>
                    </div>
                    {/* Expanded detail */}
                    {activeRule === rule.id && (
                      <div className={`px-5 pb-5 border-t ${rule.border}`}>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed pt-4">{rule.desc}</p>
                      </div>
                    )}
                  </div>
                  {/* Connector line between rules */}
                  {i < rules.length - 1 && (
                    <div className="flex items-center gap-3 py-2 pl-5">
                      <div className="w-px h-4 bg-gray-100 ml-[26px] sm:ml-[46px]"></div>
                      <span className="text-[10px] font-black text-gray-200 uppercase tracking-widest">ELSE</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border-white/50 animate-fade-in delay-500">
          <div className="flex items-start gap-5">
            <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-500/20">
              <Info size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-[#003366] mb-2 uppercase tracking-widest">Interpretabilitas Model</p>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
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
