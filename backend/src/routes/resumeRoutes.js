const express = require('express');
const router = express.Router();
const resumeController = require('../controller/resumeController');
const upload = require('../config/uploadConfig');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. GET /api/resumes - Ambil semua riwayat file CV (Admin)
router.get('/', verifyToken, authorizeRoles('admin'), resumeController.getAllResumes);

// 2. GET /api/resumes/active - Ambil 1 CV aktif (Publik, untuk tombol Download CV frontend)
//    Route ini HARUS didaftarkan SEBELUM /:id agar tidak tertangkap sebagai ID
router.get('/active', verifyToken, resumeController.getActiveResume);

// 3. GET /api/resumes/:id - Ambil detail CV berdasarkan ID (Admin)
router.get('/:id', verifyToken, authorizeRoles('admin'), resumeController.getResumeById);

// 4. POST /api/resumes - Upload file PDF CV baru (Admin, middleware upload.single("resume_file"))
router.post('/', verifyToken, authorizeRoles('admin'), upload.single('resume_file'), resumeController.uploadResume);

// 5. PUT /api/resumes/:id - Update data metadata CV (judul, versi, status aktif) (Admin)
router.put('/:id', verifyToken, authorizeRoles('admin'), resumeController.updateResume);

// 6. DELETE /api/resumes/:id - Hapus file PDF dan datanya dari server
router.delete('/:id', verifyToken, authorizeRoles('admin'), resumeController.deleteResume);

module.exports = router;
