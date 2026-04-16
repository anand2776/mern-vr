const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            mobile
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, // 🔥 role included
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= MAKE ADMIN =================
// Only admin can promote another user
router.put("/make-admin/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: `${user.email} is now admin`,
            user
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Error updating role" });
    }
});


module.exports = router;