const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product"); // 🔥 IMPORTANT
const authMiddleware = require("../middleware/authMiddleware");


// ✅ ADD TO CART
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { productId } = req.body;

        // 🔍 Debug logs
        console.log("USER:", req.user);
        console.log("PRODUCT ID:", productId);

        // ✅ Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // ✅ Find user's cart
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            // create new cart
            cart = await Cart.create({
                userId: req.user.id,
                items: [{ productId, quantity: 1 }]
            });
        } else {
            // check if product already exists
            const index = cart.items.findIndex(
                item => item.productId.toString() === productId
            );

            if (index > -1) {
                cart.items[index].quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }

            await cart.save();
        }

        res.status(201).json({
            message: "Added to cart",
            cart
        });

    } catch (err) {
        console.log("CART ERROR:", err);  // 🔥 DEBUG
        res.status(500).json({ message: "Cart error" });
    }
});


// ✅ GET CART
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate("items.productId");

        res.json(cart);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching cart" });
    }
});

module.exports = router;