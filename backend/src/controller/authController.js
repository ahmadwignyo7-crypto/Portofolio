const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// 1. REGISTER: Mendaftarkan akun baru (password di-hash)
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validasi input wajib
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, dan password wajib diisi',
            });
        }

        // Cek apakah username sudah dipakai
        const existingUsername = await userModel.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan, silakan pilih username lain!',
            });
        }

        // Cek apakah email sudah dipakai
        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar, silakan gunakan email lain!',
            });
        }

        // Enkripsi / Hashing password dengan bcrypt (Salt rounds = 10)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan ke database
        const result = await userModel.createUser({
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        res.status(201).json({
            success: true,
            message: 'Registrasi pengguna berhasil',
            data: {
                id: result.insertId,
                username,
                email,
                role: role || 'user',
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error saat registrasi',
            error: error.message,
        });
    }
};

// 2. LOGIN: Autentikasi user & pembuatan token JWT
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // Identifier bisa username atau email

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username/Email dan password wajib diisi',
            });
        }

        // Cari user berdasarkan username ATAU email
        let user = await userModel.findByUsername(identifier);
        if (!user) {
            user = await userModel.findByEmail(identifier);
        }

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Kombinasi kredensial (username/email) tidak ditemukan!',
            });
        }

        // Verifikasi password dengan bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password salah!',
            });
        }

        // Buat JWT Token
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        const secret = process.env.JWT_SECRET || 'kunci_rahasia_portofolio_super_aman_12345';
        const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
        const token = jwt.sign(payload, secret, { expiresIn });

        res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error saat login',
            error: error.message,
        });
    }
};

// 3. GET MY PROFILE: Melihat data user yang sedang login saat ini
const getMyProfile = async (req, res) => {
    try {
        // req.user diisi oleh middleware verifyToken
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Data pengguna tidak ditemukan',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// 4. GET ALL USERS: Melihat semua user (Hanya role admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({
            success: true,
            total: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    getMyProfile,
    getAllUsers,
};
