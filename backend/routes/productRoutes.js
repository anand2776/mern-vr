const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ✅ GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.log("GET ERROR:", err.message);
        res.status(500).json({ message: "Error fetching products" });
    }
});


// ✅ ADD product (ADMIN ONLY)
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        // ✅ validation
        if (!name || !price) {
            return res.status(400).json({ message: "Name and price required" });
        }

        const product = await Product.create({
            name,
            price: Number(price), // 🔥 FIX
            image,
            description
        });

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (err) {
        console.log("PRODUCT ERROR:", err); // 🔥 DEBUG
        res.status(500).json({ message: "Error adding product" });
    }
});

module.exports = router;