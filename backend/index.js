const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)

// DB connection
mongoose.connect("mongodb+srv://anand:anand@cluster0.xpt2dix.mongodb.net/mern?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch(err => console.log(err))

// server
app.listen(5000, () => {
    console.log("Server running on port 5000")
})