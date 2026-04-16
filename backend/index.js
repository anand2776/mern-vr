const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();


// ✅ Middlewares
app.use(cors());
app.use(express.json());


// ✅ Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes); // VERY IMPORTANT


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log("DB error:", err));


// ✅ Server start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});