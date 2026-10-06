const db = require("../config/db");

// FUNGSI 1: Mengambil SEMUA data skill
const getAllSkills = async () => {
  const [rows] = await db.query("SELECT * FROM skills ORDER BY category, name");
  return rows;
};

// FUNGSI 2: Mengambil SATU skill berdasarkan ID
const getSkillById = async (id) => {
  const [rows] = await db.query("SELECT * FROM skills WHERE id = ?", [id]);
  return rows[0];
};

// FUNGSI 3: Menambahkan skill baru (CREATE)
const createSkill = async (data) => {
  const { name, category, icon } = data;
  const [result] = await db.query(
    "INSERT INTO skills (name, category, icon) VALUES (?, ?, ?)",
    [name, category || "Other", icon]
  );
  return result;
};

// FUNGSI 4: Memperbarui data skill (UPDATE)
const updateSkill = async (id, data) => {
  const { name, category, icon } = data;
  const [result] = await db.query(
    "UPDATE skills SET name = ?, category = ?, icon = ? WHERE id = ?",
    [name, category, icon, id]
  );
  return result;
};

// FUNGSI 5: Menghapus skill (DELETE)
const deleteSkill = async (id) => {
  const [result] = await db.query("DELETE FROM skills WHERE id = ?", [id]);
  return result;
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
