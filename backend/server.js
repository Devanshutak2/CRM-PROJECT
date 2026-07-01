require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customers");
const vehicleRoutes = require("./routes/vehicles");
const testRideRoutes = require("./routes/testrides");
const serviceRoutes = require("./routes/services");
const { requireAuth } = require("./middleware/auth");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true, // falls back to open CORS in local dev
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Sangam Motors CRM API is running" });
});

// Auth routes (login is public; /me requires a valid token)
app.use("/api/auth", authRoutes);

// Module routes — all require a logged-in user
app.use("/api/customers", requireAuth, customerRoutes);
app.use("/api/vehicles", requireAuth, vehicleRoutes);
app.use("/api/testrides", requireAuth, testRideRoutes);
app.use("/api/services", requireAuth, serviceRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sangam_motors_crm";

if (!process.env.JWT_SECRET) {
  console.warn(
    "WARNING: JWT_SECRET is not set in the environment. Set a strong random value before going live."
  );
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Starting server without DB connection (for demo purposes only)...");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
