const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // Token expires in 7 days

if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET is not defined in environment variables!");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    req.user = user;
    next();
  });
}

// Generate JWT Token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "user",
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

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
    // Generate JWT token for admin
    const token = generateToken({
      id: "admin",
      email: "admin@system",
      role: "admin",
    });

    return res.status(200).json({
      success: true,
      message: "Admin password verified successfully",
      token,
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

// ============ AUTH ROUTES ============

// User sign up
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and display name are required",
      });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({
        success: false,
        message: authError.message,
      });
    }

    if (authData.user) {
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email,
          display_name: displayName,
          role: "user",
          created_at: new Date().toISOString(),
        },
      ]);

      if (profileError) {
        return res.status(400).json({
          success: false,
          message: profileError.message,
        });
      }

      // Generate JWT token
      const token = generateToken({
        id: authData.user.id,
        email: authData.user.email,
        role: "user",
      });

      res.status(200).json({
        success: true,
        data: {
          user: authData.user,
          token,
          role: "user",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User creation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// User sign in
app.post("/api/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        return res.status(400).json({
          success: false,
          message: profileError.message,
        });
      }

      const userRole = profileData?.role || "user";

      // Generate JWT token
      const token = generateToken({
        id: data.user.id,
        email: data.user.email,
        role: userRole,
      });

      return res.status(200).json({
        success: true,
        data: {
          user: data.user,
          token,
          role: userRole,
        },
      });
    }

    res.status(400).json({
      success: false,
      message: "Authentication failed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Sign out
app.post("/api/auth/signout", async (req, res) => {
  // With JWT, we just need to let the client delete the token
  // No server-side session to clear
  res.status(200).json({
    success: true,
    message: "Signed out successfully",
  });
});

// Get current user (protected route)
app.get("/api/auth/user", authenticateToken, async (req, res) => {
  try {
    // User info is already in req.user from the JWT middleware
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Verify token endpoint
app.get("/api/auth/verify", authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// ============ SHOP ROUTES ============

// Get all shop items (public)
app.get("/api/shop/items", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ShopItems")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Add new shop item (protected - admin only)
app.post("/api/shop/items", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const item = req.body;

    const { data, error } = await supabase
      .from("ShopItems")
      .insert([item])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update shop item (protected - admin only)
app.put("/api/shop/items/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const { id } = req.params;
    const item = req.body;

    const { data, error } = await supabase
      .from("ShopItems")
      .update(item)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete shop item (protected - admin only)
app.delete("/api/shop/items/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const { id } = req.params;

    const { error } = await supabase.from("ShopItems").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Upload image
app.post("/api/upload/image", async (req, res) => {
  try {
    const { fileData, fileName, bucket = "shop-images" } = req.body;

    if (!fileData || !fileName) {
      return res.status(400).json({
        success: false,
        message: "File data and file name are required",
      });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(fileData, "base64");
    const fileExt = fileName.split(".").pop();
    const newFileName = `${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(newFileName, buffer, {
        contentType: `image/${fileExt}`,
      });

    if (uploadError) {
      return res.status(400).json({
        success: false,
        message: uploadError.message,
      });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(newFileName);

    res.status(200).json({
      success: true,
      data: data.publicUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete image
app.delete("/api/upload/image", async (req, res) => {
  try {
    const { imagePath, bucket = "shop-images" } = req.body;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image path is required",
      });
    }

    const fileName = imagePath.split("/").pop();
    if (!fileName) {
      return res.status(400).json({
        success: false,
        message: "Invalid image path",
      });
    }

    const { error } = await supabase.storage.from(bucket).remove([fileName]);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
