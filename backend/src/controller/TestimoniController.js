const testimoniModel = require('../models/TestimoniModels');

// 1. GET ALL TESTIMONI
const getAllTestimoni = async (req, res) => {
    try {
        const testimoni = await testimoniModel.getAllTestimoni();
        res.status(200).json({
            success: true,
            total: testimoni.length,
            data: testimoni
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 2. GET TESTIMONI BY ID
const getTestimoniById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimoni = await testimoniModel.getTestimoniById(id);

        if (!testimoni) {
            return res.status(404).json({
                success: false,
                message: 'Data testimoni tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: testimoni
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 3. CREATE TESTIMONI
const createTestimoni = async (req, res) => {
    try {
        const data = req.body;

        // Validasi input wajib
        if (!data.name || !data.role || !data.message) {
            return res.status(400).json({
                success: false,
                message: 'Nama (name), peran (role), dan pesan (message) wajib diisi'
            });
        }

        const result = await testimoniModel.createTestimoni(data);
        res.status(201).json({
            success: true,
            message: 'Testimoni berhasil ditambahkan',
            data: { id: result.insertId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 4. UPDATE TESTIMONI
const updateTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validasi input wajib
        if (!data.name || !data.role || !data.message) {
            return res.status(400).json({
                success: false,
                message: 'Nama (name), peran (role), dan pesan (message) wajib diisi'
            });
        }

        const result = await testimoniModel.updateTestimoni(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data testimoni tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimoni berhasil diperbarui'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 5. DELETE TESTIMONI
const deleteTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await testimoniModel.deleteTestimoni(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data testimoni tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimoni berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};
