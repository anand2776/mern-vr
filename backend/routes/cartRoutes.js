const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// ADD TO CART
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId });
    }

    await cart.save();

    res.json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Cart error", error: err.message });
  }
});

// GET CART
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Cart fetch error" });
  }
});

module.exports = router;