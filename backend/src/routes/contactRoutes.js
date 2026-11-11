// Route pesan/contact
const express = require('express');
const router = express.Router();
const ContactCtrl = require('../controller/contactController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET /api/contacts - semua pesan (Admin)
router.get("/", verifyToken, authorizeRoles('admin'), ContactCtrl.getAll);

// GET /api/contacts/:id - satu pesan (Admin)
router.get('/:id', verifyToken, authorizeRoles('admin'), ContactCtrl.getById);

// POST /api/contacts - kirim pesan dari form kontak (Publik)
router.post('/', ContactCtrl.create);

// DELETE /api/contacts/:id - hapus pesan (Admin)
router.delete('/:id', verifyToken, authorizeRoles('admin'), ContactCtrl.remove);

module.exports = router;


