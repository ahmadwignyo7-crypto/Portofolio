const db = require("../config/db");

// FUNGSI 1: Mengambil SEMUA data experience
const getAllExperiences = async () => {
  const [rows] = await db.query("SELECT * FROM experiences ORDER BY start_date DESC");
  return rows;
};

// FUNGSI 2: Mengambil SATU experience berdasarkan ID
const getExperienceById = async (id) => {
  const [rows] = await db.query("SELECT * FROM experiences WHERE id = ?", [id]);
  return rows[0];
};

// FUNGSI 3: Menambahkan experience baru (CREATE)
const createExperience = async (data) => {
  const { title, company, location, start_date, end_date, is_current, description } = data;
  const [result] = await db.query(
    "INSERT INTO experiences (title, company, location, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, company, location, start_date, end_date, is_current || false, description]
  );
  return result;
};

// FUNGSI 4: Memperbarui data experience (UPDATE)
const updateExperience = async (id, data) => {
  const { title, company, location, start_date, end_date, is_current, description } = data;
  const [result] = await db.query(
    "UPDATE experiences SET title = ?, company = ?, location = ?, start_date = ?, end_date = ?, is_current = ?, description = ? WHERE id = ?",
    [title, company, location, start_date, end_date, is_current, description, id]
  );
  return result;
};

// FUNGSI 5: Menghapus experience (DELETE)
const deleteExperience = async (id) => {
  const [result] = await db.query("DELETE FROM experiences WHERE id = ?", [id]);
  return result;
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
