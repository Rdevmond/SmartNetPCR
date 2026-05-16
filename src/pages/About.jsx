import React from 'react';
import { Mail, Globe, Code, Users, Award, Database, Code2, Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

const About = () => {
  const team = [
    { name: "Elen Fransiska", role: "Project Manager", color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Meira & Nabila", role: "System Researchers", color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Raymond", role: "System Maker", color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Main Content Card */}
        <div className="glass-card rounded-[3rem] overflow-hidden shadow-2xl border-white/50 mb-12 animate-slide-up">
          <div className="bg-[#003366] h-48 relative overflow-hidden">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD700]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
             
             <div className="absolute -bottom-16 left-12 p-6 bg-white rounded-[2.5rem] shadow-2xl border border-white/50">
                <div className="w-20 h-20 bg-gradient-to-br from-[#003366] to-blue-500 rounded-[1.5rem] flex items-center justify-center shadow-xl">
                   <Globe className="text-white w-12 h-12 animate-float" />
                </div>
             </div>
          </div>

          <div className="pt-24 px-16 pb-16">
            <div className="flex flex-row justify-between items-start gap-8 mb-12">
               <div className="space-y-4 max-w-2xl">
                  <h1 className="text-5xl font-black text-[#003366] tracking-tight">Visi & <span className="text-gradient">Misi Kami</span></h1>
                  <p className="text-lg text-gray-500 leading-relaxed font-medium">
                    NetCheck PCR lahir dari kebutuhan akan transparansi infrastruktur digital di lingkungan kampus. Kami percaya bahwa setiap pengguna berhak mendapatkan koneksi yang layak untuk menunjang aktivitas akademik.
                  </p>
               </div>
               <div className="block">
                  <div className="px-6 py-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center space-x-3">
                     <ShieldCheck className="text-blue-500 w-6 h-6" />
                     <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Verified Academic Project</span>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-10">
              <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                   <Database size={24} />
                </div>
                <h3 className="text-xl font-black text-[#003366] mb-4">Data Driven Approach</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  Menggunakan dataset <code>dataset_berlabel_final.xlsx</code> sebagai basis pengetahuan sistem. Setiap aturan (rule) didasarkan pada observasi riil kondisi jaringan di PCR.
                </p>
              </div>

              <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                   <Code2 size={24} />
                </div>
                <h3 className="text-xl font-black text-[#003366] mb-4">Modern Technology</h3>
                <ul className="grid grid-cols-2 gap-3">
                   {['React 19', 'Tailwind v4', 'Vite Engine', 'Lucide React', 'Recharts AI', 'Decision Tree'].map((tech, i) => (
                     <li key={i} className="flex items-center text-xs font-bold text-gray-600">
                        <Sparkles size={12} className="mr-2 text-amber-500" />
                        {tech}
                     </li>
                   ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20 animate-fade-in delay-300">
          <h2 className="text-3xl font-black text-[#003366] text-center mb-12 tracking-tight">The Creative Minds</h2>
          <div className="grid grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] text-center border-white/50 hover-lift group">
                <div className={`w-24 h-24 ${member.bg} rounded-full mx-auto mb-6 flex items-center justify-center text-gray-300 border-4 border-white shadow-inner group-hover:scale-110 transition-transform`}>
                  <Users size={40} className={member.color} />
                </div>
                <h4 className="text-xl font-black text-[#003366] mb-1">{member.name}</h4>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${member.color}`}>{member.role}</p>
                <div className="mt-8 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"><Code size={14}/></div>
                   <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"><ExternalLink size={14}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="text-center space-y-8 animate-fade-in delay-500">
          <div className="inline-flex p-4 bg-white/50 rounded-full shadow-inner">
             <Heart className="text-red-500 fill-red-500 animate-pulse w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-[#003366] tracking-tight">Mari Berkolaborasi</h3>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">Kami selalu terbuka untuk saran dan masukan demi pengembangan NetCheck PCR yang lebih baik di masa depan.</p>
          
          <div className="flex justify-center space-x-6">
             <a href="mailto:info@pcr.ac.id" className="p-4 bg-white rounded-2xl text-gray-400 hover:bg-[#003366] hover:text-white hover:-translate-y-1 transition-all shadow-sm">
               <Mail size={24} />
             </a>
             <a href="https://pcr.ac.id" className="p-4 bg-white rounded-2xl text-gray-400 hover:bg-[#003366] hover:text-white hover:-translate-y-1 transition-all shadow-sm">
               <Globe size={24} />
             </a>
             <a href="#" className="p-4 bg-white rounded-2xl text-gray-400 hover:bg-[#003366] hover:text-white hover:-translate-y-1 transition-all shadow-sm">
               <Code size={24} />
             </a>
          </div>

          <div className="pt-12">
             <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFD700]/10 to-transparent rounded-2xl text-[#003366] text-sm font-black border border-[#FFD700]/20">
                <Award className="w-5 h-5 mr-3 text-[#FFD700]" />
                Project of Information Systems - PCR 2026
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
