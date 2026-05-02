const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const exerciseRoutes = require("./routes/exerciseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get('/:any*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});