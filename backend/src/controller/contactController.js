const Contact = require('../models/contactModel');

// GET - Ambil semua data pesan
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.json({ success: true, data: contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET By ID - Ambil satu data pesan berdasarkan id
const getById = async (req, res) => {
  try {
    const contact = await Contact.getContactById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// CREATE - Simpan pesan baru dari form kontak
const create = async (req, res) => {
  try {
    const result = await Contact.createContact(req.body);
    res.status(201).json({
      success: true,
      message: "Message saved",
      data: { id: result.insertId, ...req.body },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Invalid data" });
  }
};

// DELETE - Hapus pesan berdasarkan id
const remove = async (req, res) => {
  try {
    const result = await Contact.deleteContact(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAll, getById, create, remove };
