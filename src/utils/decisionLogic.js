/**
 * Rule-Based Decision Tree Logic for NetCheck PCR
 * 
 * Formula: skor = kec + keluhan - demand_gap
 * Surplus: surplus = kec - demand
 * 
 * Labels:
 * - Skor <= -0.5: Sangat Buruk
 * - Skor <= 1.5: Buruk
 * - Skor <= 2.5: Cukup
 * - Surplus <= 0.5: Cukup
 * - Else: Baik
 */

export const ACTIVITIES = {
  "browsing": { demand: 1.5, label: "Browsing Umum" },
  "streaming": { demand: 4.5, label: "Streaming Video" },
  "meeting": { demand: 4, label: "OnlineMeeting" },
  "social": { demand: 2, label: "Social Media" },
  "gaming": { demand: 2.5, label: "Online Gaming" },
  "download": { demand: 8, label: "Download File Besar" }
};

export const SPEEDS = [
  { value: 0.5, label: "< 1 Mbps" },
  { value: 2, label: "1 - 5 Mbps" },
  { value: 7, label: "5 - 10 Mbps" },
  { value: 15, label: "10 - 20 Mbps" },
  { value: 30, label: "> 20 Mbps" }
];

export const COMPLAINTS = {
  "none": { value: 2, label: "Tidak ada keluhan" },
  "slow": { value: 0, label: "Loading lambat" },
  "unstable": { value: -1, label: "Sering terputus" },
  "high_latency": { value: 0.5, label: "Ping tinggi / Lag" }
};

// Helper to map raw Mbps to 1-5 scale
const getSpeedRank = (mbps) => {
  if (mbps <= 1) return 1;
  if (mbps <= 5) return 2;
  if (mbps <= 10) return 3;
  if (mbps <= 20) return 4;
  return 5;
};

export const predictQuality = (mbps, activityKey, complaintKey) => {
  const activity = ACTIVITIES[activityKey] || ACTIVITIES.browsing;
  const complaint = COMPLAINTS[complaintKey] || COMPLAINTS.none;
  const speedRank = getSpeedRank(mbps);
  
  const demand = activity.demand;
  const demand_gap = Math.max(0, demand - speedRank);
  const surplus = speedRank - demand;
  const skor = speedRank + complaint.value - demand_gap;

  let result = {
    label: "",
    color: "",
    explanation: "",
    recommendation: "",
    skor,
    surplus
  };

  if (skor <= -0.5) {
    result.label = "Sangat Buruk";
    result.color = "#ef4444";
    result.explanation = `Skor Anda (${skor.toFixed(2)}) menunjukkan gangguan parah. Kecepatan terdeteksi (${mbps} Mbps) jauh di bawah kebutuhan ${activity.label}.`;
    result.recommendation = "Gunakan koneksi alternatif atau lapor ke BSTI PCR jika ini area publik.";
  } else if (skor <= 1.5) {
    result.label = "Buruk";
    result.color = "#f97316";
    result.explanation = `Skor Anda (${skor.toFixed(2)}) tergolong buruk. Keluhan "${complaint.label}" sangat mempengaruhi pengalaman ${activity.label}.`;
    result.recommendation = "Coba pindah ke area dengan sinyal lebih kuat (Gedung Utama/Perpustakaan).";
  } else if (skor <= 2.5 || surplus <= 0.5) {
    result.label = "Cukup";
    result.color = "#eab308";
    result.explanation = `Koneksi Anda cukup, namun pas-pasan (Skala: ${speedRank}/5). Risiko buffering pada ${activity.label} masih ada.`;
    result.recommendation = "Tutup aplikasi latar belakang yang menggunakan data internet.";
  } else {
    result.label = "Baik";
    result.color = "#22c55e";
    result.explanation = `Koneksi Anda stabil dan sangat mencukupi untuk ${activity.label} (Peringkat: ${speedRank}/5).`;
    result.recommendation = "Nikmati fasilitas jaringan PCR! Jangan lupa tetap bijak dalam penggunaan.";
  }

  return result;
};
