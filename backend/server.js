require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();

// Connect DB
connectDB();

app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: 'https://employee-management-xy7c.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});