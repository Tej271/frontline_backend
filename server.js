// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // replaces body-parser

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Product routes
app.use("/api/v1/companies", require("./routes/company"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
