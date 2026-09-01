// 1. Import library yang dibutuhkan

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Load file konfigurasi .env
dotenv.config();

// 3. Inisialisasi aplikasi Express

const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware dasar

app.use(cors()); // Mengizinkan request dari domain lain (Frontend)
app.use(express.json()); // Membaca body request bertipe JSON
app.use(express.urlencoded({ extended: true })); // Membaca body request bertipe form-data/url-encoded

// 5. Endpoint dasar (Testing Server)

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di API Portofolio Dinamis!',
    version: '1.0.0'
  });
});

// Endpoint untuk cek status API

app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server dalam keadaan sehat dan aktif.',
    timestamp: new Date().toISOString()
  });
});

// tugas
app.get('/api/biodata', (req, res) => {
  res.status(200).json({
    success: true,
   "data": {
    "nama": "josent",
    "kelas": "XI RPL 1",
    "cita_cita": "Fullstack Developer",
    "hobi": "Coding & Gaming" }
  });
});

app.put('/api/biodata', (req, res) => {
    biodata = {
        nama: req.body.nama,
        kelas: req.body.kelas,
        cita_cita: req.body.cita_cita,
        hobi: req.body.hobi
    };

    res.status(200).json({
        success: true,
        data: biodata,
        message: "Biodata berhasil diperbarui"
    });
});

// 6. Middleware untuk menangani route yang tidak ditemukan (404 Not Found)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan!'
  });
});

// 7. Menjalankan server

app.listen(PORT, () => {
  console.log(`============================================`);
  console.log(`Server berjalan di: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`============================================`);
});
