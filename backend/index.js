const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// ✅ CORS FIX (VERY IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-vr-frontend-42cp5axl2-anand2776s-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ SERVE IMAGES (IMPORTANT)
app.use(express.static("public"));

// ROUTES
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));