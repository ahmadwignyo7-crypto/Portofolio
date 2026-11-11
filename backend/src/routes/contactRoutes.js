// Route pesan/contact
const express = require('express');
const router = express.Router();
const ContactCtrl = require('../controller/contactController');

router.get("/", verifyToken, authorizeRoles('admin'), ContactCtrl.getAll);       // GET    /api/contacts - semua pesan
router.get('/:id', verifyToken, authorizeRoles('admin'), ContactCtrl.getById);   // GET    /api/contacts/:id - satu pesan
router.post('/', verifyToken, authorizeRoles('admin', 'user'), ContactCtrl.create);      // POST   /api/contacts - kirim pesan
router.delete('/:id', verifyToken, authorizeRoles('admin'), ContactCtrl.remove); // DELETE /api/contacts/:id - hapus pesan

module.exports = router;


