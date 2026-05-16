import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { dbService } from '../services/dbService';
import { ACTIVITIES } from '../utils/decisionLogic';
import { BUILDING_CATEGORIES, COLORS } from '../utils/constants';
import { Filter, MapPin, Search, Activity, TrendingUp, Users, ChevronRight, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState('Semua Gedung');
  const [selectedFloor, setSelectedFloor] = useState('Semua Lantai/Area');
  const [sortBy, setSortBy] = useState('popularitas');
  const [allReports, setAllReports] = useState([]);
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { dynamicOnly, mergedData } = await dbService.getDashboardData();
      setAllReports(dynamicOnly); // Untuk tabel transaksi
      setStatsData(mergedData);   // Untuk grafik/statistik
    };
    fetchDashboardData();
  }, []);

  const itemsPerPage = 10;

  // 1. Adaptive Filtering
  const { filteredDynamic, filteredMerged } = useMemo(() => {
    const filterFn = (report) => {
      const loc = (report.location || "").toLowerCase();
      
      const buildingMatch = selectedBuilding === 'Semua Gedung' ||
        (selectedBuilding === 'Gedung Utama' && (loc.includes('gu') || loc.includes('utama'))) ||
        (selectedBuilding === 'Gedung Serba Guna' && (loc.includes('gsg') || loc.includes('serba guna'))) ||
        (selectedBuilding === 'Fasilitas Publik' && BUILDING_CATEGORIES['Fasilitas Publik'].some(fLoc => loc.includes(fLoc.toLowerCase())));

      const cleanLoc = loc.replace(/\./g, '').replace(/\s+/g, ' ').trim();
      const cleanFloor = selectedFloor.toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim();

      const floorMatch = selectedFloor === 'Semua Lantai/Area' || 
        cleanLoc.includes(cleanFloor) ||
        loc.includes(selectedFloor.toLowerCase());

      const searchMatch = !searchTerm ||
        report.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.includes(searchTerm.toLowerCase()) ||
        report.label?.toLowerCase().includes(searchTerm.toLowerCase());
      return buildingMatch && floorMatch && searchMatch;
    };

    return {
      filteredDynamic: allReports.filter(filterFn),
      filteredMerged: statsData.filter(filterFn)
    };
  }, [allReports, statsData, selectedBuilding, selectedFloor, searchTerm]);

  const stats = useMemo(() => {
    const mergedStats = dbService.getStats(filteredMerged);
    const dynamicStats = dbService.getStats(filteredDynamic);
    return {
      ...mergedStats,
      total: dynamicStats.total // Gunakan total dari inputan saja
    };
  }, [filteredMerged, filteredDynamic]);

  // 2. Adaptive Chart Data
  const chartData = useMemo(() => {
    let data = [];
    if (selectedFloor !== 'Semua Lantai/Area') {
      const activities = [...new Set(filteredMerged.map(r => r.activity))];
      data = activities.map(act => {
        const actReports = filteredMerged.filter(r => r.activity === act);
        return {
          name: ACTIVITIES[act]?.label?.split('(')[0] || act,
          total: actReports.length,
          baik: actReports.filter(r => r.label === 'Baik').length,
          cukup: actReports.filter(r => r.label === 'Cukup').length,
          buruk: actReports.filter(r => r.label === 'Buruk').length,
          sangatBuruk: actReports.filter(r => r.label === 'Sangat Buruk').length
        };
      });
    } else if (selectedBuilding !== 'Semua Gedung') {
      data = stats.locationAnalysis.map(loc => ({
        name: loc.location,
        ...loc
      }));
    } else {
      data = Object.keys(BUILDING_CATEGORIES).map(cat => {
        const catReports = filteredMerged.filter(report => {
          const loc = (report.location || "").toLowerCase();
          if (cat === 'Gedung Utama') return loc.includes('gu') || loc.includes('utama');
          if (cat === 'Gedung Serba Guna') return loc.includes('gsg') || loc.includes('serba guna');
          return BUILDING_CATEGORIES['Fasilitas Publik'].some(fLoc => loc.includes(fLoc.toLowerCase()));
        });
        return {
          name: cat,
          total: catReports.length,
          baik: catReports.filter(r => r.label === 'Baik').length,
          cukup: catReports.filter(r => r.label === 'Cukup').length,
          buruk: catReports.filter(r => r.label === 'Buruk').length,
          sangatBuruk: catReports.filter(r => r.label === 'Sangat Buruk').length
        };
      });
    }

    return [...data].sort((a, b) => {
      if (sortBy === 'popularitas') return b.total - a.total;
      if (sortBy === 'terbaik') return (b.baik / (b.total || 1)) - (a.baik / (a.total || 1));
      if (sortBy === 'terburuk') return ((b.buruk + b.sangatBuruk) / (b.total || 1)) - ((a.buruk + a.sangatBuruk) / (a.total || 1));
      return 0;
    });
  }, [selectedBuilding, selectedFloor, filteredMerged, stats.locationAnalysis, sortBy]);

  const totalPages = Math.ceil(filteredDynamic.length / itemsPerPage);
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDynamic.slice(start, start + itemsPerPage);
  }, [filteredDynamic, currentPage]);

  const availableFloors = selectedBuilding === 'Semua Gedung' ? [] : BUILDING_CATEGORIES[selectedBuilding] || [];

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-slide-up">
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
              Context-Aware Analytics
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#003366] tracking-tight">Dashboard <span className="text-gradient">NetCheck</span></h1>
            <p className="text-gray-500 font-medium">Visualisasi real-time kondisi jaringan di lingkungan kampus.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4 z-10" />
              <select
                value={selectedBuilding}
                onChange={(e) => { setSelectedBuilding(e.target.value); setSelectedFloor('Semua Lantai/Area'); setCurrentPage(1); }}
                className="pl-12 pr-10 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-[#003366] shadow-sm hover:shadow-xl transition-all outline-none appearance-none cursor-pointer uppercase tracking-widest min-w-[180px]"
              >
                <option value="Semua Gedung">Semua Gedung</option>
                {Object.keys(BUILDING_CATEGORIES).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90"><ChevronRight className="w-3 h-3 text-gray-300" /></div>
            </div>

            {selectedBuilding !== 'Semua Gedung' && (
              <div className="relative animate-fade-in">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 w-4 h-4 z-10" />
                <select
                  value={selectedFloor}
                  onChange={(e) => { setSelectedFloor(e.target.value); setCurrentPage(1); }}
                  className="pl-12 pr-10 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-[#003366] shadow-sm hover:shadow-xl transition-all outline-none appearance-none cursor-pointer uppercase tracking-widest min-w-[180px]"
                >
                  <option value="Semua Lantai/Area">Semua Lantai/Area</option>
                  {availableFloors.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90"><ChevronRight className="w-3 h-3 text-gray-300" /></div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in delay-200">
          {[
            { label: "Total Laporan", value: stats.total, sub: "Filter Aktif", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
            {
              label: "Status Dominan",
              value: (() => {
                if (!filteredMerged.length || !stats?.distribution?.length) {
                  return "N/A";
                }

                // Cari label paling dominan
                const dominantLabel = [...stats.distribution]
                  .sort((a, b) => b.value - a.value)[0].name;

                // Ambil data dengan label itu
                const dominantReports = filteredMerged.filter(
                  r => r.label === dominantLabel
                );

                // Hitung lokasi paling sering muncul
                const locationCount = {};

                dominantReports.forEach(report => {
                  const loc = report.location || "Unknown";
                  locationCount[loc] = (locationCount[loc] || 0) + 1;
                });

                // Cari lokasi terbanyak
                const dominantLocation = Object.entries(locationCount)
                  .sort((a, b) => b[1] - a[1])[0]?.[0];

                return `${dominantLabel} - ${dominantLocation}`;
              })(),

              sub: "Kualitas & Lokasi Dominan",
              icon: MapPin,
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            },
            { label: "Rata-rata Speed", value: stats?.avgSpeed?.toFixed(1) || "0", sub: "Mbps (Filter)", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            {
              label: "Skor Kepuasan",
              value: (() => {
                const total = filteredMerged.length;
                if (total === 0) return "0%";
                const goodCount = filteredMerged.filter(r => r.label === 'Baik' || r.label === 'Cukup').length;
                return `${((goodCount / total) * 100).toFixed(0)}%`;
              })(),
              sub: "% Cukup & Baik",
              icon: Users,
              color: "text-amber-500",
              bg: "bg-amber-50"
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2rem] border-white/50 hover-lift group">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <item.icon size={24} />
                </div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg uppercase">Live</span>
              </div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">{item.label}</p>
              <h3 className="text-2xl font-black text-[#003366] mb-2 truncate">
                {item.isPercent ? `${item.value.toFixed(0)}%` : item.value}
              </h3>
              <p className="text-xs text-gray-400 font-medium">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] border-white/50 shadow-xl animate-fade-in delay-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#003366] uppercase tracking-tight">Analisis Spasial</h3>
                <div className="flex items-center text-xs font-bold text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  Distribusi Kualitas Berdasarkan Area
                </div>
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 w-3 h-3 z-10" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-[10px] font-black text-[#003366] shadow-sm hover:shadow-md transition-all outline-none appearance-none cursor-pointer uppercase tracking-widest"
                >
                  <option value="popularitas">Urut: Volume Data</option>
                  <option value="terbaik">Urut: Kualitas Terbaik</option>
                  <option value="terburuk">Urut: Kualitas Terburuk</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90"><ChevronRight className="w-3 h-3 text-gray-300" /></div>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    width={110}
                    tick={{ fontSize: 9, fontWeight: 900, fill: '#003366' }}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                  <Bar dataKey="baik" stackId="a" fill={COLORS['Baik']} barSize={18} />
                  <Bar dataKey="cukup" stackId="a" fill={COLORS['Cukup']} />
                  <Bar dataKey="buruk" stackId="a" fill={COLORS['Buruk']} />
                  <Bar dataKey="sangatBuruk" stackId="a" fill={COLORS['Sangat Buruk']} radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] border-white/50 shadow-xl animate-fade-in delay-500">
            <h3 className="text-xl font-black text-[#003366] mb-10 text-center uppercase tracking-widest">Pangsa Label</h3>
            <div className="h-[300px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.distribution} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                    {stats.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#CBD5E1'} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
                  {stats.distribution.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[entry.name] }}></div>
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{entry.name}</span>
                      </div>
                      <span className="text-sm font-black text-[#003366]">
                        {filteredMerged.length > 0 ? ((entry.value / filteredMerged.length) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Transactional Table */}
        <div className="glass-card rounded-[2.5rem] border-white/50 shadow-xl overflow-hidden animate-fade-in delay-700">
          <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-[#003366]">Dataset Transaksional</h3>
              <p className="text-sm text-gray-400 font-medium">
                Riwayat data terbaru berdasarkan filter pencarian.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari pelapor atau lokasi..."
                className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs font-black focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] text-gray-400 uppercase font-black tracking-widest">
                <tr>
                  <th className="px-10 py-6">ID & Pelapor</th>
                  <th className="px-10 py-6">Lokasi & Timestamp</th>
                  <th className="px-10 py-6 text-right">Hasil Klasifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedReports.length > 0 ? paginatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-10 py-8">
                      <p className="text-lg font-black text-[#003366]">{report.name || 'Anonymous'}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: {report.id}</p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-black text-gray-700 mb-1">{report.location}</p>
                      <p className="text-xs font-medium text-gray-400">{new Date(report.timestamp).toLocaleString()}</p>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div
                        className="inline-flex px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm"
                        style={{ color: COLORS[report.label], backgroundColor: `${COLORS[report.label]}10`, border: `1px solid ${COLORS[report.label]}20` }}
                      >
                        {report.label}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="px-10 py-20 text-center text-gray-400 font-bold">Data tidak ditemukan.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-10 bg-gray-50/30 flex justify-between items-center">
            <div className="text-sm text-gray-400 font-bold">Hal {currentPage} / {totalPages || 1}</div>
            <div className="flex space-x-3">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-black text-[#003366] disabled:opacity-30 transition-all active:scale-95">Sebelumnya</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-black text-[#003366] disabled:opacity-30 transition-all active:scale-95">Berikutnya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
