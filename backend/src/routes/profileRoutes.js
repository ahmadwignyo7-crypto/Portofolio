const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET /api/profile Mengambil data profil pemilik portofolio
router.get('/',verifyToken, profileController.getProfile);

// PUT/api/profile/:id Memperbarui data profil berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles('admin'), profileController.updateProfile);

module.exports = router;