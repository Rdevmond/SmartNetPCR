import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const dbService = {
  /**
   * Helper untuk merapikan nama lokasi (Trim & Title Case)
   */
  normalizeLocation: (loc) => {
    if (!loc) return "Unknown Area";
    return loc.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  },

  /**
   * Helper untuk menentukan Gedung berdasarkan nama lokasi
   */
  getBuildingByLocation: (location) => {
    const loc = location?.toLowerCase() || "";
    if (loc.includes('gu') || loc.includes('utama')) return 'Gedung Utama';
    if (loc.includes('gsg') || loc.includes('serba guna')) return 'Gedung Serba Guna';
    if (loc.includes('perpustakaan') || loc.includes('masjid') || loc.includes('kantin') || loc.includes('lapangan')) return 'Fasilitas Publik';
    return 'Gedung Utama'; 
  },

  /**
   * Mengambil data untuk Dashboard (Dinamis & Statis)
   */
  getDashboardData: async () => {
    try {
      const [dynamicRes, staticRes] = await Promise.allSettled([
        supabase.from('reports').select('*').order('timestamp', { ascending: false }),
        supabase.from('static_dataset').select('*')
      ]);

      const dynamicData = dynamicRes.status === 'fulfilled' ? (dynamicRes.value.data || []) : [];
      const staticDataRaw = staticRes.status === 'fulfilled' ? (staticRes.value.data || []) : [];

      // Proses data Dinamis
      const processedDynamic = dynamicData.map(r => ({ 
        ...r, 
        isStatic: false,
        location: dbService.normalizeLocation(r.location)
      }));
      
      // Proses data Statis
      const processedStatic = staticDataRaw.map(r => {
        const cleanLocation = dbService.normalizeLocation(r.location);
        let speedVal = 10;
        if (typeof r.speed === 'string') {
          const match = r.speed.match(/\d+/);
          speedVal = match ? parseInt(match[0]) : 10;
        } else {
          speedVal = r.speed || 10;
        }

        return { 
          ...r, 
          speed: speedVal, 
          isStatic: true,
          location: cleanLocation,
          building: r.building || dbService.getBuildingByLocation(cleanLocation)
        };
      });

      return {
        dynamicOnly: processedDynamic,
        mergedData: [...processedDynamic, ...processedStatic]
      };
    } catch (e) {
      console.error("Dashboard data fetch error", e);
      return { dynamicOnly: [], mergedData: [] };
    }
  },

  getMergedData: async () => {
    const data = await dbService.getDashboardData();
    return data.mergedData;
  },

  getReports: async () => {
    const { data } = await supabase.from('reports').select('*').order('timestamp', { ascending: false });
    return (data || []).map(r => ({ ...r, location: dbService.normalizeLocation(r.location) }));
  },

  saveReport: async (reportData) => {
    try {
      const cleanLoc = dbService.normalizeLocation(reportData.location);
      const dataToSave = {
        name: reportData.name,
        location: cleanLoc,
        building: reportData.building || dbService.getBuildingByLocation(cleanLoc),
        speed: parseFloat(reportData.speed),
        activity: reportData.activity,
        complaint: reportData.complaint,
        label: reportData.label,
        skor: parseFloat(reportData.skor),
        color: reportData.color,
        explanation: reportData.explanation,
        recommendation: reportData.recommendation,
        timestamp: reportData.timestamp || new Date().toISOString()
      };
      const { data, error } = await supabase.from('reports').insert([dataToSave]).select();
      if (error) throw error;
      return data[0];
    } catch (e) {
      console.error("Save error", e);
      return { ...reportData, id: Date.now() };
    }
  },

  getStats: (reports) => {
    const data = reports || [];
    const labels = ['Baik', 'Cukup', 'Buruk', 'Sangat Buruk'];
    const distribution = labels.map(label => ({
      name: label,
      value: data.filter(r => r.label === label).length
    }));
    const avgSpeed = data.length > 0 
      ? data.reduce((acc, r) => acc + (parseFloat(r.speed) || 0), 0) / data.length 
      : 0;

    return {
      total: data.length,
      avgSpeed: avgSpeed,
      distribution: distribution,
      recent: data.slice(0, 10),
      topLocation: dbService.getTopLocation(data),
      locationAnalysis: dbService.getLocationAnalysis(data)
    };
  },

  getTopLocation: (reports) => {
    if (!reports || reports.length === 0) return { name: "N/A", count: 0 };
    const counts = reports.reduce((acc, r) => {
      const loc = r.location;
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {});
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? { name: top[0], count: top[1] } : { name: "N/A", count: 0 };
  },

  getLocationAnalysis: (reports) => {
    if (!reports || reports.length === 0) return [];
    const locations = [...new Set(reports.map(r => r.location).filter(Boolean))];
    return locations.map(loc => {
      const locReports = reports.filter(r => r.location === loc);
      return {
        location: loc,
        total: locReports.length,
        baik: locReports.filter(r => r.label === 'Baik').length,
        cukup: locReports.filter(r => r.label === 'Cukup').length,
        buruk: locReports.filter(r => r.label === 'Buruk').length,
        sangatBuruk: locReports.filter(r => r.label === 'Sangat Buruk').length
      };
    }).sort((a, b) => b.total - a.total);
  },

  getRecommendation: (currentLocation, allReports = []) => {
    const analysis = dbService.getLocationAnalysis(allReports);
    const bestAlternatives = analysis
      .filter(a => a.location !== currentLocation)
      .sort((a, b) => b.baik - a.baik);
    return bestAlternatives.length > 0 ? bestAlternatives[0].location : "Area Masjid (Sinyal Stable)";
  },

  init: async () => {
    return await dbService.getReports();
  }
};
