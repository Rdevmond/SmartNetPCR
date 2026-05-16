import React from 'react';
import { Mail, Globe, Users, Award, Database, Code2, Sparkles, ShieldCheck, Heart, Cpu, GitBranch, Zap, BarChart3, Network } from 'lucide-react';

const About = () => {
  const team = [
    { 
      name: "Elen Fransiska", 
      role: "Project Manager", 
      color: "text-blue-500", 
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-blue-600",
      icon: ShieldCheck,
      desc: "Memimpin arah proyek, koordinasi tim, dan memastikan setiap tahapan pengembangan berjalan sesuai target."
    },
    { 
      name: "Meira & Nabila", 
      role: "System Researchers", 
      color: "text-purple-500", 
      bg: "bg-purple-50",
      gradient: "from-purple-500 to-purple-600",
      icon: Database,
      desc: "Bertanggung jawab atas pengumpulan data lapangan, analisis dataset, dan validasi model Decision Tree."
    },
    { 
      name: "Raymond", 
      role: "System Maker", 
      color: "text-emerald-500", 
      bg: "bg-emerald-50",
      gradient: "from-emerald-500 to-emerald-600",
      icon: Code2,
      desc: "Merancang dan membangun seluruh arsitektur sistem, dari backend logic hingga tampilan antarmuka."
    },
  ];

  const techStack = [
    { name: 'React 19', icon: '⚛️', desc: 'Frontend framework' },
    { name: 'Tailwind v4', icon: '🎨', desc: 'Styling system' },
    { name: 'Vite Engine', icon: '⚡', desc: 'Build tool' },
    { name: 'Recharts', icon: '📊', desc: 'Data visualization' },
    { name: 'Lucide React', icon: '✨', desc: 'Icon library' },
    { name: 'Decision Tree', icon: '🌲', desc: 'Core algorithm' },
  ];

  const stats = [
    { val: '100+', label: 'Data Lapangan', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
    { val: '14', label: 'Lokasi Terpantau', icon: Network, color: 'text-purple-500', bg: 'bg-purple-50' },
    { val: '4', label: 'Label Kualitas', icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-50' },
    { val: '99%', label: 'Akurasi Model', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="bg-mesh min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-16">

        {/* ===== HERO BANNER ===== */}
        <div className="animate-slide-up relative overflow-hidden bg-[#003366] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD700]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5">
            <Network size={200} color="white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black text-blue-200 uppercase tracking-widest">
                <Sparkles size={10} className="mr-2 text-[#FFD700]" />
                Academic Project · PCR 2026
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1]">
                Visi & <span className="text-[#FFD700]">Misi</span><br />Kami
              </h1>
              <p className="text-blue-200 font-medium leading-relaxed text-sm md:text-base">
                NetCheck PCR lahir dari kebutuhan akan transparansi infrastruktur digital di lingkungan kampus. Kami percaya bahwa setiap pengguna berhak mendapatkan koneksi yang layak untuk menunjang aktivitas akademik.
              </p>
            </div>

            {/* Stats mini grid */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto flex-shrink-0">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-white tracking-tight">{s.val}</p>
                  <p className="text-[10px] font-black text-blue-300 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== TEAM SECTION ===== */}
        <div className="animate-fade-in delay-200">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-4">
              <Users size={10} className="mr-2" />
              The Creative Minds
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] tracking-tight">Tim di Balik Layar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {team.map((member, i) => (
              <div key={i} className="glass-card rounded-[2rem] overflow-hidden border-white/50 hover-lift group">
                {/* Card header gradient */}
                <div className={`bg-gradient-to-br ${member.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <member.icon size={80} color="white" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                      <member.icon size={28} color="white" />
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight">{member.name}</h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                      {member.role}
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== TECH + DATA SECTION ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 animate-fade-in delay-300">
          {/* Data Driven */}
          <div className="glass-card p-7 md:p-8 rounded-[2rem] border-white/50 group hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
               <Database size={22} />
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-3">Data Driven Approach</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-5">
              Menggunakan <code className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg font-mono text-xs">dataset_berlabel_final.xlsx</code> sebagai basis pengetahuan sistem. Setiap aturan didasarkan pada observasi riil kondisi jaringan di PCR.
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Verified Academic Dataset</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="glass-card p-7 md:p-8 rounded-[2rem] border-white/50 group hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
               <Code2 size={22} />
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-5">Modern Technology</h3>
            <div className="grid grid-cols-2 gap-2">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50/80 hover:bg-white hover:shadow-sm transition-all">
                  <span className="text-base">{tech.icon}</span>
                  <div>
                    <p className="text-xs font-black text-[#003366] leading-none">{tech.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CONTACT / CTA SECTION ===== */}
        <div className="animate-fade-in delay-500 text-center space-y-6 pt-4">
          <div className="inline-flex p-3 bg-red-50 rounded-full">
            <Heart className="text-red-500 fill-red-500 animate-pulse w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#003366] tracking-tight mb-3">Mari Berkolaborasi</h3>
            <p className="text-gray-500 max-w-md mx-auto font-medium text-sm md:text-base">
              Kami selalu terbuka untuk saran dan masukan demi pengembangan NetCheck PCR yang lebih baik.
            </p>
          </div>
          
          <div className="flex justify-center gap-3">
            <a 
              href="mailto:info@pcr.ac.id" 
              className="flex items-center gap-2.5 px-5 py-3 bg-white text-gray-600 rounded-2xl hover:bg-[#003366] hover:text-white hover:-translate-y-0.5 transition-all shadow-sm border border-gray-100 font-bold text-sm"
            >
              <Mail size={16} />
              info@pcr.ac.id
            </a>
            <a 
              href="https://pcr.ac.id" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 bg-white text-gray-600 rounded-2xl hover:bg-[#003366] hover:text-white hover:-translate-y-0.5 transition-all shadow-sm border border-gray-100 font-bold text-sm"
            >
              <Globe size={16} />
              pcr.ac.id
            </a>
          </div>

          <div>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFD700]/15 via-[#FFD700]/5 to-transparent rounded-2xl text-[#003366] text-sm font-black border border-[#FFD700]/25">
              <Award className="w-4 h-4 mr-3 text-[#FFD700]" />
              Network View System - PCR 2026
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
