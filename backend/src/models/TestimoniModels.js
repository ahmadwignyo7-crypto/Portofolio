const db = require('../config/db');

// 1. GET ALL - Mengambil semua data testimoni (diurutkan dari yang terbaru)
const getAllTestimoni = async () => {
    const [rows] = await db.query('SELECT * FROM testimoni ORDER BY created_at DESC');
    return rows;
};

// 2. GET BY ID - Mengambil 1 data testimoni berdasarkan ID
const getTestimoniById = async (id) => {
    const [rows] = await db.query('SELECT * FROM testimoni WHERE id = ?', [id]);
    return rows[0];
};

// 3. CREATE - Menambahkan testimoni baru ke database
const createTestimoni = async (data) => {
    const { name, role, company, message, avatar_url, rating } = data;
    const [result] = await db.query(
        'INSERT INTO testimoni (name, role, company, message, avatar_url, rating) VALUES (?, ?, ?, ?, ?, ?)',
        [name, role, company || null, message, avatar_url || null, rating || 5]
    );
    return result;
};

// 4. UPDATE - Memperbarui data testimoni berdasarkan ID
const updateTestimoni = async (id, data) => {
    const { name, role, company, message, avatar_url, rating } = data;
    const [result] = await db.query(
        'UPDATE testimoni SET name = ?, role = ?, company = ?, message = ?, avatar_url = ?, rating = ? WHERE id = ?',
        [name, role, company || null, message, avatar_url || null, rating || 5, id]
    );
    return result;
};

// 5. DELETE - Menghapus testimoni dari database berdasarkan ID
const deleteTestimoni = async (id) => {
    const [result] = await db.query('DELETE FROM testimoni WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};
