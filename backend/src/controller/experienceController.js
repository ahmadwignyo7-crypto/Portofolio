const experienceModel = require("../models/experienceModel");

// 1. Mengambil semua experience (GET ALL)
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.getAllExperiences();
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua data experience.",
      total: experiences.length,
      data: experiences,
    });
  } catch (error) {
    console.error("Error getAllExperiences:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 2. Mengambil satu experience berdasarkan ID (GET BY ID)
const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await experienceModel.getExperienceById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: `Experience dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data experience.",
      data: experience,
    });
  } catch (error) {
    console.error("Error getExperienceById:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 3. Menambahkan experience baru (CREATE / POST)
const createExperience = async (req, res) => {
  try {
    const data = req.body;
    // Validasi minimal: title dan company wajib diisi
    if (!data.title || !data.company) {
      return res.status(400).json({
        success: false,
        message: 'Kolom "title" dan "company" wajib diisi!',
      });
    }
    const result = await experienceModel.createExperience(data);
    res.status(201).json({
      success: true,
      message: "Experience baru berhasil ditambahkan!",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error createExperience:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 4. Memperbarui data experience (UPDATE / PUT)
const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // Validasi minimal: title dan company wajib diisi
    if (!data.title || !data.company) {
      return res.status(400).json({
        success: false,
        message: 'Kolom "title" dan "company" wajib diisi!',
      });
    }
    const result = await experienceModel.updateExperience(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Experience dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data experience berhasil diperbarui.",
    });
  } catch (error) {
    console.error("Error updateExperience:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// 5. Menghapus experience (DELETE)
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await experienceModel.deleteExperience(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Experience dengan ID ${id} tidak ditemukan.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Experience berhasil dihapus.",
    });
  } catch (error) {
    console.error("Error deleteExperience:", error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
