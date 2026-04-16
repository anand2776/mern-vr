const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ADMIN ONLY ADD PRODUCT
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        const product = await Product.create({
            name,
            price,
            image,
            description
        });

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Error adding product" });
    }
});

module.exports = router;