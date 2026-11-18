const express = require('express');
const router = express.Router();
const testimoniController = require('../controller/TestimoniController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. GET /api/testimoni - Ambil semua data testimoni
router.get('/', verifyToken, testimoniController.getAllTestimoni);

// 2. GET /api/testimoni/:id - Ambil 1 testimoni berdasarkan ID
router.get('/:id', verifyToken, testimoniController.getTestimoniById);

// 3. POST /api/testimoni - Tambah data testimoni baru
router.post('/', verifyToken, authorizeRoles('admin'), testimoniController.createTestimoni);

// 4. PUT /api/testimoni/:id - Update data testimoni berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles('admin'), testimoniController.updateTestimoni);

// 5. DELETE /api/testimoni/:id - Hapus data testimoni berdasarkan ID
router.delete('/:id', verifyToken, authorizeRoles('admin'), testimoniController.deleteTestimoni);

module.exports = router;
