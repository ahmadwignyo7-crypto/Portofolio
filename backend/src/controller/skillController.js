const skillModel = require("../models/skillModel");

// 1. Mengambil semua skill (GET ALL)
const getAllSkills = async (req, res) => {
  try {
    const skills = await skillModel.getAllSkills();
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua data skill.",
      total: skills.length,
      data: skills,
    });
  } catch (error) {
    console.error("Error getAllSkills:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 2. Mengambil satu skill berdasarkan ID (GET BY ID)
const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await skillModel.getSkillById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: `Skill dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data skill.",
      data: skill,
    });
  } catch (error) {
    console.error("Error getSkillById:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 3. Menambahkan skill baru (CREATE / POST)
const createSkill = async (req, res) => {
  try {
    const data = req.body || {};
    // Validasi: pastikan name tidak kosong
    if (!data.name) {
      return res.status(400).json({
        success: false,
        message: 'Kolom "name" wajib diisi!',
      });
    }
    const result = await skillModel.createSkill(data);
    res.status(201).json({
      success: true,
      message: "Skill baru berhasil ditambahkan!",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error createSkill:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 4. Memperbarui data skill (UPDATE / PUT)
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body || {};
    // Validasi: pastikan name tidak kosong
    if (!data.name) {
      return res.status(400).json({
        success: false,
        message: 'Kolom "name" wajib diisi!',
      });
    }
    const result = await skillModel.updateSkill(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data skill berhasil diperbarui.",
    });
  } catch (error) {
    console.error("Error updateSkill:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 5. Menghapus skill (DELETE)
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await skillModel.deleteSkill(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Skill dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Skill berhasil dihapus.",
    });
  } catch (error) {
    console.error("Error deleteSkill:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
