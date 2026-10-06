const express = require("express");
const router = express.Router();
const experienceController = require("../controller/experienceController");

// GET /api/experiences - Mengambil semua experience
router.get("/", experienceController.getAllExperiences);

// GET /api/experiences/:id - Mengambil satu experience berdasarkan ID
router.get("/:id", experienceController.getExperienceById);

// POST /api/experiences - Menambahkan experience baru
router.post("/", experienceController.createExperience);

// PUT /api/experiences/:id - Memperbarui experience berdasarkan ID
router.put("/:id", experienceController.updateExperience);

// DELETE /api/experiences/:id - Menghapus experience berdasarkan ID
router.delete("/:id", experienceController.deleteExperience);

module.exports = router;
