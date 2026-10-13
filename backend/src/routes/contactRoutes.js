// Route pesan/contact
const express = require('express');
const router = express.Router();
const ContactCtrl = require('../controller/contactController');

router.get("/", ContactCtrl.getAll);       // GET    /api/contacts - semua pesan
router.get('/:id', ContactCtrl.getById);   // GET    /api/contacts/:id - satu pesan
router.post('/', ContactCtrl.create);      // POST   /api/contacts - kirim pesan
router.delete('/:id', ContactCtrl.remove); // DELETE /api/contacts/:id - hapus pesan

module.exports = router;


