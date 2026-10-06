const express = require("express");
const router = express.Router();
const skillController = require("../controller/skillController");

// GET /api/skills - Mengambil semua skill
router.get("/", skillController.getAllSkills);

// GET /api/skills/:id - Mengambil satu skill berdasarkan ID
router.get("/:id", skillController.getSkillById);

// POST /api/skills - Menambahkan skill baru
router.post("/", skillController.createSkill);

// PUT /api/skills/:id - Memperbarui skill berdasarkan ID
router.put("/:id", skillController.updateSkill);

// DELETE /api/skills/:id - Menghapus skill berdasarkan ID
router.delete("/:id", skillController.deleteSkill);

module.exports = router;
