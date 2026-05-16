import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Zap, AlertCircle, CheckCircle2, RotateCcw, ChevronRight, Cpu, SignalHigh, Wifi, MapPin, Activity, BookmarkX } from 'lucide-react';
import { dbService } from '../services/dbService';

const PredictResult = () => {
  const { id } = useParams();
  const location = useLocation();
  const [report, setReport] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const isTransient = id === 'temp';

  useEffect(() => {
    if (isTransient) {
      // Smart Check: data comes via navigation state, not saved in DB
      const stateReport = location.state?.report;
      if (stateReport) {
        setReport(stateReport);
        const rec = dbService.getRecommendation(stateReport.location);
        setRecommendation(rec);
      }
    } else {
      // Precision Check: load from DB
      const allReports = dbService.getReports();
      const found = allReports.find(r => r.id === parseInt(id));
      if (found) {
        setReport(found);
        const rec = dbService.getRecommendation(found.location);
        setRecommendation(rec);
      }
    }
  }, [id, location.state]);

  if (!report) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-black text-[#003366]">Laporan tidak ditemukan</h2>
        <Link to="/" className="mt-4 text-blue-500 font-bold hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 px-10">
      <div className="max-w-4xl mx-auto animate-slide-up">

        {/* Transient Notice Banner */}
        {isTransient && (
          <div className="mb-8 flex items-center gap-4 px-8 py-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800">
            <BookmarkX className="w-5 h-5 flex-shrink-0 text-amber-500" />
            <p className="text-sm font-bold">
              <span className="font-black">Mode Smart Check:</span> Hasil ini bersifat sementara dan tidak tersimpan di database. Gunakan <Link to="/predict-manual" className="underline text-amber-700 hover:text-amber-900">Precision Check</Link> jika ingin menyimpan laporan.
            </p>
          </div>
        )}

        <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl border-white/50">
          <div className="bg-[#003366] p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <Cpu size={180} />
             </div>
             <div className="relative z-10 text-center">
                <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-md border border-white/20">
                  <Zap className="w-10 h-10 text-[#FFD700]" />
                </div>
                <h2 className="text-4xl font-black mb-2">Diagnosis Selesai</h2>
                <p className="text-blue-200 font-medium">
                  {isTransient ? `Analisis area: ${report.location}` : `Analisis untuk ${report.name} di ${report.location}`}
                </p>
                {!isTransient && (
                  <span className="inline-flex items-center mt-3 px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3 mr-2" /> Tersimpan di Database
                  </span>
                )}
             </div>
          </div>
          
          <div className="p-16">
            <div className="flex flex-col items-center mb-12">
              <div 
                className="text-8xl font-black mb-6 py-6 px-12 rounded-3xl shadow-inner inline-block tracking-tighter"
                style={{ color: report.color, backgroundColor: `${report.color}08`, border: `1px solid ${report.color}20` }}
              >
                {report.label}
              </div>
              <div className="flex items-center gap-6 text-sm font-black text-gray-400 uppercase tracking-[0.2em]">
                 <span className="flex items-center"><SignalHigh className="w-4 h-4 mr-2" /> Skor: {report.skor?.toFixed(2)}</span>
                 <span>•</span>
                 <span className="flex items-center"><Wifi className="w-4 h-4 mr-2" /> Speed: {report.speed} Mbps</span>
                 <span>•</span>
                 <span className="flex items-center"><Activity className="w-4 h-4 mr-2" /> {report.activity}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <AlertCircle size={20} />
                </div>
                <h4 className="text-xl font-black text-[#003366] mb-4">Diagnosis Sistem</h4>
                <p className="text-gray-600 leading-relaxed font-medium">{report.explanation}</p>
              </div>

              <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-xl font-black text-[#003366] mb-4">Rekomendasi Cerdas</h4>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {report.label?.includes('Buruk') 
                    ? `Kualitas di ${report.location} kurang ideal. Dataset kami menyarankan Anda berpindah ke area ${recommendation} untuk mendapatkan sinyal yang jauh lebih stabil.`
                    : report.recommendation}
                </p>
              </div>
            </div>

            <div className="mt-16 flex gap-6">
              <Link
                to="/predict"
                className="flex-1 px-8 py-5 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center group"
              >
                <RotateCcw className="w-5 h-5 mr-3 group-hover:rotate-[-180deg] transition-transform duration-500" />
                Smart Check Lagi
              </Link>
              {isTransient ? (
                <Link
                  to="/predict-manual"
                  className="flex-1 px-8 py-5 bg-[#003366] text-white font-black rounded-2xl hover:bg-blue-800 transition-all flex items-center justify-center shadow-2xl shadow-blue-900/20 group btn-premium"
                >
                  Precision Check
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="flex-1 px-8 py-5 bg-[#003366] text-white font-black rounded-2xl hover:bg-blue-800 transition-all flex items-center justify-center shadow-2xl shadow-blue-900/20 group btn-premium"
                >
                  Lihat Dashboard
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictResult;
