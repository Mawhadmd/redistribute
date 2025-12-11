const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Admin password verification endpoint
app.post("/api/admin/verify-password", (req, res) => {
  const { password } = req.body;

  // Validate input
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  // Get admin master password from environment
  const adminMasterPassword = process.env.ADMIN_MASTER_PASSWORD;

  if (!adminMasterPassword) {
    return res.status(500).json({
      success: false,
      message: "Admin master password not configured on server",
    });
  }

  // Verify password
  if (password === adminMasterPassword) {
    return res.status(200).json({
      success: true,
      message: "Admin password verified successfully",
      token: generateAdminToken(), // Optional: Generate a session token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid admin password",
    });
  }
});

// Optional: Generate a simple admin token
function generateAdminToken() {
  return Buffer.from(
    `admin_${Date.now()}_${Math.random().toString(36).substring(2)}`
  ).toString("base64");
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
