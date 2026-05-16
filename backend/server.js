import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./netcheck.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTables();
  }
});

function createTables() {
  db.run(`CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_id INTEGER,
    name TEXT,
    location TEXT,
    building TEXT,
    speed REAL,
    activity TEXT,
    complaint TEXT,
    label TEXT,
    skor REAL,
    color TEXT,
    explanation TEXT,
    recommendation TEXT,
    timestamp TEXT,
    isExcelData INTEGER DEFAULT 0
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err.message);
    } else {
      seedDatabase();
    }
  });
}

function seedDatabase() {
  db.get("SELECT COUNT(*) as count FROM reports", (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (row.count === 0) {
      console.log('Seeding database with initial data...');
      const initialData = [{"id":3000,"name":"Bay","location":"Masjid","speed":10,"activity":"browsing","complaint":"none","label":"Cukup","timestamp":"2026-05-15T11:51:26.279Z"},{"id":3001,"name":"Khalifa Nayna Rizalni","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-15T10:51:26.290Z"},{"id":3002,"name":"Putri Ayu Lestari","location":"Lt. 1 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-15T09:51:26.290Z"},{"id":3003,"name":"Tashya Aulia","location":"Perpustakaan","speed":0.5,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-15T08:51:26.290Z"},{"id":3004,"name":"Aldo Alvaro","location":"Lt. 3 GU (koridor)","speed":10,"activity":"browsing","complaint":"none","label":"Cukup","timestamp":"2026-05-15T07:51:26.290Z"},{"id":3005,"name":"Stefanny","location":"Lt. 1 GSG (koridor)","speed":30,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-15T06:51:26.290Z"},{"id":3006,"name":"Morino","location":"Lt. 3 GU (koridor)","speed":10,"activity":"browsing","complaint":"none","label":"Cukup","timestamp":"2026-05-15T05:51:26.290Z"},{"id":3007,"name":"Dimas Putra Pratama","location":"Masjid","speed":20,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-15T04:51:26.290Z"},{"id":3008,"name":"Nur Mufidah","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-15T03:51:26.290Z"},{"id":3009,"name":"Daniel Endru","location":"Perpustakaan","speed":20,"activity":"browsing","complaint":"unstable","label":"Cukup","timestamp":"2026-05-15T02:51:26.290Z"},{"id":3010,"name":"Elen Fransiska","location":"Lt. 2 GSG (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-15T01:51:26.290Z"},{"id":3011,"name":"Melissa Satta","location":"Lt. 1 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-15T00:51:26.290Z"},{"id":3012,"name":"Michael Shiginta","location":"Lt. 3 GU (dalam ruang)","speed":3,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-14T23:51:26.290Z"},{"id":3013,"name":"Willyana","location":"Lt. 3 GSG (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T22:51:26.290Z"},{"id":3014,"name":"Rasya Olivia","location":"Lt. 1 GU (dalam ruang)","speed":0.5,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-14T21:51:26.290Z"},{"id":3015,"name":"Volta Ahamad Jonneva","location":" Lt. 3 GU (dalam ruang)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-14T20:51:26.290Z"},{"id":3016,"name":"Aida Kamila","location":"Lt. 3 GSG (dalam ruang)","speed":30,"activity":"browsing","complaint":"slow","label":"Baik","timestamp":"2026-05-14T19:51:26.290Z"},{"id":3017,"name":"Victor","location":"Lt. 3 GU (koridor)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T18:51:26.290Z"},{"id":3018,"name":"Ilham Aryansyah","location":"Amphi Teater Dalam","speed":10,"activity":"gaming","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T17:51:26.290Z"},{"id":3019,"name":"Dzaky Murtadho Aghlab","location":"Amphi Teater Dalam","speed":3,"activity":"gaming","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-14T16:51:26.290Z"},{"id":3020,"name":"Andi Muhammad Syahri","location":"Amphi Teater Dalam","speed":3,"activity":"browsing","complaint":"none","label":"Buruk","timestamp":"2026-05-14T15:51:26.290Z"},{"id":3021,"name":"Reginald Ricky","location":"Amphi Teater Dalam","speed":3,"activity":"gaming","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-14T14:51:26.290Z"},{"id":3022,"name":"Novri Renata Puri","location":"Lt. 1 GU (dalam ruang)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-14T13:51:26.290Z"},{"id":3023,"name":"David Steven","location":"Perpustakaan","speed":0.5,"activity":"gaming","complaint":"none","label":"Sangat Buruk","timestamp":"2026-05-14T12:51:26.290Z"},{"id":3024,"name":"Dea Falara Putri","location":"Lt. 1 GU (dalam ruang)","speed":3,"activity":"gaming","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-14T11:51:26.290Z"},{"id":3025,"name":"Sabra Shatila Alra","location":"Lt. 1 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T10:51:26.290Z"},{"id":3026,"name":"Eka Kurnia Zebua","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T09:51:26.290Z"},{"id":3027,"name":"Racita Jasmine","location":"Kantin","speed":10,"activity":"browsing","complaint":"none","label":"Cukup","timestamp":"2026-05-14T08:51:26.290Z"},{"id":3028,"name":"Najah Nasywa Zahara","location":"Area Parkir/Lapangan","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-14T07:51:26.290Z"},{"id":3029,"name":"Hansen Wijaya","location":"Lt. 2 GU (dalam ruang)","speed":20,"activity":"browsing","complaint":"unstable","label":"Cukup","timestamp":"2026-05-14T06:51:26.290Z"},{"id":3030,"name":"M. Fatir Refanthira","location":"Area Parkir/Lapangan","speed":3,"activity":"streaming_hd","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-14T05:51:26.290Z"},{"id":3031,"name":"Cinta Rahmadani","location":"Lt. 1 GU (koridor)","speed":30,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-14T04:51:26.290Z"},{"id":3032,"name":"Victor","location":"Kantin","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T03:51:26.290Z"},{"id":3033,"name":"Aditya De Foeng","location":"Kantin","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-14T02:51:26.290Z"},{"id":3034,"name":"Juwan Andoki","location":"Kantin","speed":10,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-14T01:51:26.290Z"},{"id":3035,"name":"Tommy Sanjaya","location":"Area Parkir/Lapangan","speed":30,"activity":"browsing","complaint":"slow","label":"Baik","timestamp":"2026-05-14T00:51:26.290Z"},{"id":3036,"name":"Marwanto Asnan","location":"Kantin","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T23:51:26.290Z"},{"id":3037,"name":"Yulvi Al Mizan","location":"Kantin","speed":10,"activity":"browsing","complaint":"none","label":"Buruk","timestamp":"2026-05-13T22:51:26.290Z"},{"id":3038,"name":"Nurhadi","location":"Kantin","speed":3,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T21:51:26.290Z"},{"id":3039,"name":"Owen Braintly Taniel","location":"Kantin","speed":3,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T20:51:26.290Z"},{"id":3040,"name":"Muhamad Zakky","location":"Amphi Teater Dalam","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T19:51:26.290Z"},{"id":3041,"name":"M. Narum Bella","location":"Kantin","speed":0.5,"activity":"browsing","complaint":"none","label":"Sangat Buruk","timestamp":"2026-05-13T18:51:26.290Z"},{"id":3042,"name":"Muhammad Hafiz Ramadhan","location":"Lt. 1 GSG (dalam ruang)","speed":10,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-13T17:51:26.290Z"},{"id":3043,"name":"Mirna","location":"Lt. 3 GU (koridor)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-13T16:51:26.290Z"},{"id":3044,"name":"Muhammad Arya Fahrez","location":"Lt. 1 GSG (dalam ruang)","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T15:51:26.290Z"},{"id":3045,"name":"Ghania Zafira Eryo","location":"Lt. 3 GU (dalam ruang)","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T14:51:26.290Z"},{"id":3046,"name":"M. Ridho Saputra","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"none","label":"Buruk","timestamp":"2026-05-13T13:51:26.290Z"},{"id":3047,"name":"Arta Lita Sihombing","location":"Kantin","speed":3,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-13T12:51:26.290Z"},{"id":3048,"name":"Wulandari","location":"Lt. 3 GSG (dalam ruang)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-13T11:51:26.291Z"},{"id":3049,"name":"Theresa Olivia","location":"Lt. 2 GU (koridor)","speed":3,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T10:51:26.291Z"},{"id":3050,"name":"Ivana Azra Bawafie","location":"Lt. 2 GSG (koridor)","speed":3,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-13T09:51:26.291Z"},{"id":3051,"name":"Naila Nurzalika","location":"Lt. 2 GSG (koridor)","speed":30,"activity":"download","complaint":"unstable","label":"Baik","timestamp":"2026-05-13T08:51:26.291Z"},{"id":3052,"name":"Aliya Safwa Shafira","location":"Lt. 2 GSG (koridor)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-13T07:51:26.291Z"},{"id":3053,"name":"Prengki Ardiansyah","location":"Lt. 3 GU (dalam ruang)","speed":30,"activity":"browsing","complaint":"slow","label":"Baik","timestamp":"2026-05-13T06:51:26.291Z"},{"id":3054,"name":"Gpuaks","location":"Masjid","speed":20,"activity":"browsing","complaint":"unstable","label":"Cukup","timestamp":"2026-05-13T05:51:26.291Z"},{"id":3055,"name":"Figo Alimbel","location":"Lt. 3 GSG (dalam ruang)","speed":3,"activity":"video_conference","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-13T04:51:26.291Z"},{"id":3056,"name":"Perriska Berlian","location":"Lt. 2 GSG (koridor)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-13T03:51:26.291Z"},{"id":3057,"name":"Syifa Nasywa Azzahra","location":"Lt. 3 GU (koridor)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-13T02:51:26.291Z"},{"id":3058,"name":"Muhammad Hafiz Andhika","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-13T01:51:26.291Z"},{"id":3059,"name":"Isra Rahma Wina","location":"Lt. 3 GU (dalam ruang)","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-13T00:51:26.291Z"},{"id":3060,"name":"Nurul Anisa","location":"Kantin","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-12T23:51:26.291Z"},{"id":3061,"name":"Muhammad Salman Arrif","location":"Lt. 3 GU (koridor)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-12T22:51:26.291Z"},{"id":3062,"name":"Cyntia Dewi","location":"Kantin","speed":30,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-12T21:51:26.291Z"},{"id":3063,"name":"Galileo Yohanes Karozae Sitepu","location":"GOR","speed":30,"activity":"browsing","complaint":"slow","label":"Baik","timestamp":"2026-05-12T20:51:26.291Z"},{"id":3064,"name":"Afii","location":"Lt. 2 GU (koridor)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-12T19:51:26.291Z"},{"id":3065,"name":"Rafael Ardhiwinatta Lubis","location":"Masjid","speed":20,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-12T18:51:26.291Z"},{"id":3066,"name":"Suci Andestia P","location":"Kantin","speed":20,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-12T17:51:26.291Z"},{"id":3067,"name":"Ahmad Fauzi","location":"Lt. 3 GU (dalam ruang)","speed":3,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-12T16:51:26.291Z"},{"id":3068,"name":"Altaf Fayin Faizullah","location":"Lt. 1 GSG (dalam ruang)","speed":3,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-12T15:51:26.291Z"},{"id":3069,"name":"Defani Zahra Afikah","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-12T14:51:26.291Z"},{"id":3070,"name":"Fitriana Tasya","location":"Lt. 3 GU (dalam ruang)","speed":20,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-12T13:51:26.291Z"},{"id":3071,"name":"Ruthiana Marbun","location":"Perpustakaan","speed":3,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-12T12:51:26.291Z"},{"id":3072,"name":"Fatimah Azzahra","location":"Lt. 1 GSG (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-12T11:51:26.291Z"},{"id":3073,"name":"Lady Trie Arthisya","location":"Lt. 3 GSG (dalam ruang)","speed":20,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-12T10:51:26.291Z"},{"id":3074,"name":"Amelia Golisa","location":"Lt. 1 GU (dalam ruang)","speed":3,"activity":"browsing","complaint":"none","label":"Buruk","timestamp":"2026-05-12T09:51:26.291Z"},{"id":3075,"name":"Filbert Anggriawan","location":"Perpustakaan","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-12T08:51:26.291Z"},{"id":3076,"name":"Rufina Pramudita","location":"Lt. 3 GU (dalam ruang)","speed":30,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-12T07:51:26.291Z"},{"id":3077,"name":"Siti Harnisa Nurhabiby","location":"Kantin","speed":30,"activity":"browsing","complaint":"unstable","label":"Baik","timestamp":"2026-05-12T06:51:26.291Z"},{"id":3078,"name":"Sefriansyah S","location":"Amphi Teater Dalam","speed":20,"activity":"browsing","complaint":"slow","label":"Cukup","timestamp":"2026-05-12T05:51:26.291Z"},{"id":3079,"name":"Givo Fadlillah","location":"Lt. 3 GU (dalam ruang)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-12T04:51:26.291Z"},{"id":3080,"name":"Lysander Vincent Fu","location":"Lt. 1 GU (koridor)","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-12T03:51:26.291Z"},{"id":3081,"name":"Rezky Kurniawan","location":"Lt. 3 GU (dalam ruang)","speed":30,"activity":"browsing","complaint":"unstable","label":"Baik","timestamp":"2026-05-12T02:51:26.291Z"},{"id":3082,"name":"Muhammad Fikrya","location":"Workshop Mesin","speed":30,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-12T01:51:26.291Z"},{"id":3083,"name":"Alya Deka","location":"Perpustakaan","speed":0.5,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-12T00:51:26.291Z"},{"id":3084,"name":"Muhammad Luthfi Hatta","location":"Lt. 2 GSG (dalam ruang)","speed":10,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-11T23:51:26.291Z"},{"id":3085,"name":"Dian Natasya Br Hutagaol","location":"Kantin","speed":0.5,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-11T22:51:26.291Z"},{"id":3086,"name":"Elvin Winata","location":"Lt. 1 GSG (dalam ruang)","speed":3,"activity":"browsing","complaint":"none","label":"Buruk","timestamp":"2026-05-11T21:51:26.291Z"},{"id":3087,"name":"Afzan Baitul Akmal","location":"Lt. 1 GSG (koridor)","speed":10,"activity":"browsing","complaint":"none","label":"Baik","timestamp":"2026-05-11T20:51:26.291Z"},{"id":3088,"name":"Rizky Gustiyanto","location":"Mechanical & Electrical Workshop","speed":0.5,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-11T19:51:26.291Z"},{"id":3089,"name":"Mila Azizah","location":"Kantin","speed":10,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-11T18:51:26.291Z"},{"id":3090,"name":"Mulki Ahmad Mubasir","location":"Amphi Teater Dalam","speed":30,"activity":"browsing","complaint":"slow","label":"Baik","timestamp":"2026-05-11T17:51:26.291Z"},{"id":3091,"name":"Gede Abhita Tangkas Aryasuta Gandi","location":"Amphi Teater Dalam","speed":10,"activity":"browsing","complaint":"slow","label":"Buruk","timestamp":"2026-05-11T16:51:26.291Z"},{"id":3092,"name":"M. Dzaki Faadhilah","location":"Masjid","speed":30,"activity":"gaming","complaint":"none","label":"Baik","timestamp":"2026-05-11T15:51:26.291Z"},{"id":3093,"name":"Pradipa Atallah Anargya","location":"Lt. 1 GU (dalam ruang)","speed":20,"activity":"browsing","complaint":"unstable","label":"Cukup","timestamp":"2026-05-11T14:51:26.291Z"},{"id":3094,"name":"Ahmad Shalahuddin","location":"Amphi Teater Dalam","speed":10,"activity":"browsing","complaint":"unstable","label":"Buruk","timestamp":"2026-05-11T13:51:26.291Z"},{"id":3095,"name":"Tiara Kania Noer Riska","location":"Lt. 3 GU (dalam ruang)","speed":3,"activity":"browsing","complaint":"slow","label":"Sangat Buruk","timestamp":"2026-05-11T12:51:26.291Z"},{"id":3096,"name":"Jolin Christina","location":"Perpustakaan","speed":10,"activity":"browsing","complaint":"none","label":"Buruk","timestamp":"2026-05-11T11:51:26.291Z"},{"id":3097,"name":"Raymond","location":"Perpustakaan","speed":3,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-11T10:51:26.291Z"},{"id":3098,"name":"Zidam Dafa Alfarel","location":"Mechanical & Electrical Workshop","speed":30,"activity":"browsing","complaint":"unstable","label":"Baik","timestamp":"2026-05-11T09:51:26.291Z"},{"id":3099,"name":"Muhammad Habib Al Azmi","location":"Perpustakaan","speed":3,"activity":"browsing","complaint":"unstable","label":"Sangat Buruk","timestamp":"2026-05-11T08:51:26.291Z"}];

      const stmt = db.prepare(`INSERT INTO reports (
        original_id, name, location, building, speed, activity, complaint, label, skor, color, explanation, recommendation, timestamp, isExcelData
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`);

      initialData.forEach(item => {
        stmt.run(
          item.id,
          item.name,
          item.location,
          item.building || 'Unknown',
          item.speed,
          item.activity,
          item.complaint,
          item.label,
          item.skor || 0,
          item.color || '',
          item.explanation || '',
          item.recommendation || '',
          item.timestamp
        );
      });
      stmt.finalize();
      console.log('Seeding completed.');
    }
  });
}

// Routes
app.get('/api/reports', (req, res) => {
  db.all("SELECT * FROM reports ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Map database fields to match frontend expectations if necessary
    const reports = rows.map(row => ({
      ...row,
      id: row.id // Use internal SQL id as primary
    }));
    res.json(reports);
  });
});

app.post('/api/reports', (req, res) => {
  const { name, location, building, speed, activity, complaint, label, skor, color, explanation, recommendation, timestamp } = req.body;
  const sql = `INSERT INTO reports (
    name, location, building, speed, activity, complaint, label, skor, color, explanation, recommendation, timestamp
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const params = [name, location, building, speed, activity, complaint, label, skor, color, explanation, recommendation, timestamp];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      ...req.body
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
