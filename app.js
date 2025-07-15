// app.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Corrected route imports
const authRoutes = require("./routes/auth");

const expenseRoutes = require("./routes/expenses");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);       // Handles register/login
app.use("/api/expenses", expenseRoutes); // Handles expense operations

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(5000, () => {
    console.log(" Server started on port 5000");
    console.log(" MongoDB connected");
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});
