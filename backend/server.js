import express from "express";
import path from "path";
import cors from "cors";

require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();


connectDB();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));

app.use(express.json());



app.use('/api/auth', require('./routes/auth'));

app.use('/api/exercises', require('./routes/exerciseRoutes'));

app.use('/api/user', require('./routes/userRoutes'));


const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.get('/', (req, res) => {
  res.send('IronPulse API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});