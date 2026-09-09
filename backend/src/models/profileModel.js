const db = require('../config/db');

// 1.mengabil dara profil(hanya 1 file baris, karena profile 1 pemilik)
const getProfile = async () => {
  const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
  return rows[0];  // Ambil data baris pertama
};

// 2.memperbaiki data profil berdasarkan id
const updateProfile = async (id, data) => {
  const {
    name, role, bio, about, avatar_url, resume_url,
    email, phone, address, github_url, linkedin_url, instagram_url
  } = data;

  const [result] = await db.query(
    `UPDATE profile SET
      name = ?, role = ?, bio = ?, about = ?,
      avatar_url = ?, resume_url = ?,
      email = ?, phone = ?, address = ?,
      github_url = ?, linkedin_url = ?, instagram_url = ?
    WHERE id = ?`,
    [name, role, bio, about, avatar_url, resume_url,
     email, phone, address, github_url, linkedin_url, instagram_url, id]
  );

  return result;
};

module.exports = {
  getProfile,
  updateProfile
};
