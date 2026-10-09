// contactModel.js
// Model untuk mengelola data pesan/contact dari form kontak
// Berisi operasi CRUD: Read (semua & by id), Create, Delete

const db = require('../config/db');

// GET - Tampilkan semua data pesan, diurutkan dari yang terbaru
const getAllContacts = async () => {
  const [rows] = await db.query(
    'SELECT * FROM messages ORDER BY created_at DESC'
  );
  return rows; // kembalikan array berisi semua baris pesan
};

// GET By ID - Tampilkan satu data pesan berdasarkan id
const getContactById = async (id) => {
  const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [id]);
  return rows[0]; // kembalikan objek pertama (atau undefined jika tidak ada)
};

// CREATE - Tambah data pesan baru
const createContact = async (data) => {
  // Ambil field dari objek data yang dikirim dari controller
  const { sender_name, sender_email, subject, message } = data;

  // Simpan ke tabel messages dengan parameterized query (aman dari SQL injection)
  const [result] = await db.query(
    'INSERT INTO messages (sender_name, sender_email, subject, message) VALUES (?, ?, ?, ?)',
    [sender_name, sender_email, subject, message]
  );
  return result; // berisi insertId & affectedRows
};

// DELETE - Hapus data pesan berdasarkan id
const deleteContact = async (id) => {
  const [result] = await db.query('DELETE FROM messages WHERE id = ?', [id]);
  return result; // berisi affectedRows (0 jika id tidak ditemukan)
};

// Ekspor semua fungsi model agar bisa dipakai di controller
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
};