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
    origin: process.env.FRONTEND_URL,
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

// Trial check middleware (skips admins)
async function checkTrialStatus(req, res, next) {
  try {
    // Admins bypass trial check
    if (req.user.role === "admin") {
      return next();
    }

    // Get user subscription status
    const { data: userData, error } = await supabase
      .from("users")
      .select("trial_end_date, subscription_status")
      .eq("id", req.user.id)
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Error checking trial status",
      });
    }

    // If user has active subscription, allow access
    if (userData.subscription_status === "active") {
      return next();
    }

    // Check if trial has expired
    const now = new Date();
    const trialEnd = new Date(userData.trial_end_date);

    if (now > trialEnd) {
      return res.status(402).json({
        success: false,
        message: "Trial period has ended",
        trialExpired: true,
      });
    }

    // Trial is still active
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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

// Admin verification endpoint (verify JWT token for admin)
app.get("/api/admin/verify", authenticateToken, (req, res) => {
  // Check if the user from JWT has admin role
  if (req.user && req.user.role === "admin") {
    return res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "Not authorized as admin",
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
      // Calculate trial end date (14 days from now)
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 14);

      const { error: profileError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email,
          display_name: displayName,
          role: "user",
          created_at: new Date().toISOString(),
          trial_end_date: trialEndDate.toISOString(),
          subscription_status: "trial",
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
      // Try to find user by ID first, then by email
      let { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching user by ID:", profileError);
      }

      // If no profile exists by ID, check by email
      if (!profileData) {
        const { data: userByEmail } = await supabase
          .from("users")
          .select("*")
          .eq("email", data.user.email)
          .maybeSingle();
     
        if (userByEmail) {
          // Found by email - update the ID to match Supabase Auth
          const { error: updateError } = await supabase
            .from("users")
            .update({ id: data.user.id })
            .eq("email", data.user.email);

          if (updateError) {
            console.error("Error updating user ID:", updateError);
          }
          profileData = { ...userByEmail, id: data.user.id };
        } else {
          // Create new user profile
          const trialEndDate = new Date();
          trialEndDate.setDate(trialEndDate.getDate() + 14);

          const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                display_name: data.user.email.split("@")[0],
                role: "user",
                created_at: new Date().toISOString(),
                trial_end_date: trialEndDate.toISOString(),
                subscription_status: "trial",
              },
            ])
            .select()
            .single();

          if (insertError) {
            console.error("Error creating user profile:", insertError);
            // Continue anyway with default role
          } else {
            profileData = newUser;
          }
        }
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
app.get(
  "/api/auth/user",
  authenticateToken,
  checkTrialStatus,
  async (req, res) => {
    try {
      // Get user details including trial info
      const { data: userData, error } = await supabase
        .from("users")
        .select("trial_end_date, subscription_status, display_name")
        .eq("id", req.user.id)
        .maybeSingle();

      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error fetching user data: " + error.message,
        });
      }

      // If no user record exists, try to fetch by email first
      if (!userData) {
        // Check if user exists with this email
        const { data: userByEmail, error: emailError } = await supabase
          .from("users")
          .select("*")
          .eq("email", req.user.email)
          .maybeSingle();

        if (emailError) {
          return res.status(500).json({
            success: false,
            message: "Error fetching user by email: " + emailError.message,
          });
        }

        // If user exists with email, return that user's data
        if (userByEmail) {
          const daysRemaining = userByEmail.trial_end_date
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(userByEmail.trial_end_date) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )
              )
            : 0;

          return res.status(200).json({
            success: true,
            data: {
              ...req.user,
              displayName: userByEmail.display_name,
              trialEndDate: userByEmail.trial_end_date,
              subscriptionStatus: userByEmail.subscription_status,
              daysRemaining,
            },
          });
        }

        // If user doesn't exist at all, create new profile
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 14);

        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              id: req.user.id,
              email: req.user.email,
              display_name: req.user.email?.split("@")[0] || "User",
              role: req.user.role || "user",
              created_at: new Date().toISOString(),
              trial_end_date: trialEndDate.toISOString(),
              subscription_status: "trial",
            },
          ])
          .select()
          .single();

        if (insertError) {
          return res.status(500).json({
            success: false,
            message: "Error creating user profile: " + insertError.message,
          });
        }

        return res.status(200).json({
          success: true,
          data: {
            ...req.user,
            displayName: newUser.display_name,
            trialEndDate: newUser.trial_end_date,
            subscriptionStatus: newUser.subscription_status,
            daysRemaining: 14,
          },
        });
      }

      // Handle users without trial_end_date (existing users)
      let daysRemaining = 0;
      if (userData.trial_end_date) {
        const now = new Date();
        const trialEnd = new Date(userData.trial_end_date);
        daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
      } else {
        // Set trial for existing users who don't have it
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 14);

        await supabase
          .from("users")
          .update({
            trial_end_date: trialEndDate.toISOString(),
            subscription_status: "trial",
          })
          .eq("id", req.user.id);

        daysRemaining = 14;
      }

      res.status(200).json({
        success: true,
        data: {
          ...req.user,
          displayName: userData.display_name,
          trialEndDate: userData.trial_end_date,
          subscriptionStatus: userData.subscription_status,
          daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Verify token endpoint
app.get("/api/auth/verify", authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// ============ SHOP ROUTES ============

// Get user's YouTube channels
app.get(
  "/api/channels",
  authenticateToken,
  checkTrialStatus,
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("youtube_channels")
        .select("*")
        .eq("user_id", req.user.id)
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
  }
);

// Add a new YouTube channel
app.post(
  "/api/channels",
  authenticateToken,
  checkTrialStatus,
  async (req, res) => {
    try {
      const { channelId } = req.body;

      if (!channelId) {
        return res.status(400).json({
          success: false,
          message: "Channel ID is required",
        });
      }

      // Validate YouTube API key
      const youtubeApiKey = process.env.YOUTUBE_API_KEY;
      if (!youtubeApiKey) {
        return res.status(500).json({
          success: false,
          message: "YouTube API key not configured",
        });
      }

      // Fetch channel data from YouTube API to validate and get channel name
      let channelData;
      try {
        let apiUrl;

        // Check if input is a channel ID (starts with UC and 24 chars total)
        if (/^UC[\w-]{22}$/.test(channelId)) {
          // Direct channel ID lookup
          apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${youtubeApiKey}`;
        } else if (channelId.startsWith("@")) {
          // Handle format - need to use forHandle parameter
          const handle = channelId.replace("@", "");
          apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${handle}&key=${youtubeApiKey}`;
        } else {
          // Try as username first
          apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forUsername=${channelId}&key=${youtubeApiKey}`;
        }

        const response = await axios.get(apiUrl);

        if (!response.data.items || response.data.items.length === 0) {
          return res.status(404).json({
            success: false,
            message:
              "Channel not found on YouTube. Please provide a valid channel ID (starts with UC) or handle (@username).",
          });
        }

        channelData = response.data.items[0];
        // Use the actual channel ID from the response
        channelId = channelData.id;
      } catch (youtubeError) {
        console.error(
          "YouTube API error:",
          youtubeError.response?.data || youtubeError.message
        );
        return res.status(400).json({
          success: false,
          message:
            "Failed to fetch channel from YouTube. Please verify the channel ID is correct.",
        });
      }

      // Check if channel already exists for this user
      const { data: existingChannel } = await supabase
        .from("youtube_channels")
        .select("*")
        .eq("user_id", req.user.id)
        .eq("channel_id", channelId)
        .single();

      if (existingChannel) {
        return res.status(400).json({
          success: false,
          message: "You've already added this channel",
        });
      }

      // Generate verification code
      const verificationCode = `verify-${Math.random()
        .toString(36)
        .substring(2, 10)}-${Date.now().toString(36)}`;

      // Insert channel with fetched data
      // Note: channel_thumbnail and subscriber_count are optional fields
      // Only include them if the columns exist in your database
      const channelInsertData = {
        user_id: req.user.id,
        channel_id: channelId,
        channel_name: channelData.snippet.title,
        verification_code: verificationCode,
        is_verified: false,
        added_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("youtube_channels")
        .insert([channelInsertData])
        .select();

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      res.status(201).json({
        success: true,
        data: data[0],
        message: `Successfully added ${channelData.snippet.title}`,
      });
    } catch (error) {
      console.error("Error adding channel:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Verify a YouTube channel
app.post(
  "/api/channels/:id/verify",
  authenticateToken,
  checkTrialStatus,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Get channel from database
      const { data: channel, error: fetchError } = await supabase
        .from("youtube_channels")
        .select("*")
        .eq("id", id)
        .eq("user_id", req.user.id)
        .single();

      if (fetchError || !channel) {
        return res.status(404).json({
          success: false,
          message: "Channel not found",
        });
      }

      // Fetch channel description from YouTube API
      const youtubeApiKey = process.env.YOUTUBE_API_KEY;
      if (!youtubeApiKey) {
        return res.status(500).json({
          success: false,
          message: "YouTube API key not configured",
        });
      }

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channel.channel_id}&key=${youtubeApiKey}`
      );

      if (!response.data.items || response.data.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Channel not found on YouTube",
        });
      }

      const channelDescription = response.data.items[0].snippet.description;

      // Check if verification code is in the description
      if (channelDescription.includes(channel.verification_code)) {
        // Update channel to verified
        const { data: updatedChannel, error: updateError } = await supabase
          .from("youtube_channels")
          .update({ is_verified: true })
          .eq("id", id)
          .select();

        if (updateError) {
          return res.status(400).json({
            success: false,
            message: updateError.message,
          });
        }

        // Subscribe to YouTube webhook notifications
        const callbackUrl = `${
          process.env.BACKEND_URL || "http://localhost:5000"
        }/api/webhooks/youtube`;
        await subscribeToChannel(channel.channel_id, callbackUrl);

        res.status(200).json({
          success: true,
          message: "Channel verified successfully",
          data: updatedChannel[0],
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Verification code not found in channel description",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Delete a YouTube channel
app.delete(
  "/api/channels/:id",
  authenticateToken,
  checkTrialStatus,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Get channel before deleting
      const { data: channel } = await supabase
        .from("youtube_channels")
        .select("channel_id")
        .eq("id", id)
        .eq("user_id", req.user.id)
        .single();

      const { error } = await supabase
        .from("youtube_channels")
        .delete()
        .eq("id", id)
        .eq("user_id", req.user.id);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      // Unsubscribe from YouTube webhook
      if (channel) {
        const callbackUrl = `${
          process.env.BACKEND_URL || "http://localhost:5000"
        }/api/webhooks/youtube`;
        await unsubscribeFromChannel(channel.channel_id, callbackUrl);
      }

      res.status(200).json({
        success: true,
        message: "Channel deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Get uploads for user's verified channels
app.get(
  "/api/uploads",
  authenticateToken,
  checkTrialStatus,
  async (req, res) => {
    try {
      // Get user's verified channels
      const { data: channels, error: channelsError } = await supabase
        .from("youtube_channels")
        .select("channel_id")
        .eq("user_id", req.user.id)
        .eq("is_verified", true);

      if (channelsError) {
        return res.status(400).json({
          success: false,
          message: channelsError.message,
        });
      }

      if (!channels || channels.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      const channelIds = channels.map((c) => c.channel_id);

      // Get uploads for these channels
      const { data: uploads, error: uploadsError } = await supabase
        .from("youtube_uploads")
        .select("*")
        .in("channel_id", channelIds)
        .order("uploaded_at", { ascending: false })
        .limit(50);

      if (uploadsError) {
        return res.status(400).json({
          success: false,
          message: uploadsError.message,
        });
      }

      res.status(200).json({
        success: true,
        data: uploads || [],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ============ YOUTUBE WEBHOOK ROUTES ============

/**
 * Subscribe to YouTube channel updates via PubSubHubbub
 */
async function subscribeToChannel(channelId, callbackUrl) {
  const hubUrl = "https://pubsubhubbub.appspot.com/subscribe";
  const topicUrl = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const response = await axios.post(
      hubUrl,
      new URLSearchParams({
        "hub.callback": callbackUrl,
        "hub.topic": topicUrl,
        "hub.verify": "async",
        "hub.mode": "subscribe",
        "hub.lease_seconds": "864000", // 10 days
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(`✓ Subscribed to channel: ${channelId}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to subscribe to ${channelId}:`, error.message);
    return false;
  }
}

/**
 * Unsubscribe from YouTube channel updates
 */
async function unsubscribeFromChannel(channelId, callbackUrl) {
  const hubUrl = "https://pubsubhubbub.appspot.com/subscribe";
  const topicUrl = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`;

  try {
    await axios.post(
      hubUrl,
      new URLSearchParams({
        "hub.callback": callbackUrl,
        "hub.topic": topicUrl,
        "hub.verify": "async",
        "hub.mode": "unsubscribe",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(`✓ Unsubscribed from channel: ${channelId}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to unsubscribe from ${channelId}:`, error.message);
    return false;
  }
}

// YouTube webhook verification (GET) and notification (POST)
app.get("/api/webhooks/youtube", (req, res) => {
  // YouTube sends verification challenge
  const challenge = req.query["hub.challenge"];
  const mode = req.query["hub.mode"];
  const topic = req.query["hub.topic"];

  console.log(`YouTube webhook verification: mode=${mode}, topic=${topic}`);

  if (challenge) {
    // Respond with challenge to confirm subscription
    res.status(200).send(challenge);
  } else {
    res.status(400).send("No challenge found");
  }
});

app.post(
  "/api/webhooks/youtube",
  express.raw({ type: "application/atom+xml" }),
  async (req, res) => {
    try {
      // Parse XML notification from YouTube
      const xml = req.body.toString();
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(xml);

      // Extract video information
      const entry = result.feed?.entry?.[0];
      if (!entry) {
        return res.status(200).send("OK");
      }

      const videoId = entry["yt:videoId"]?.[0];
      const channelId = entry["yt:channelId"]?.[0];
      const title = entry.title?.[0];
      const published = entry.published?.[0];

      if (!videoId || !channelId) {
        return res.status(200).send("OK");
      }

      console.log(`📹 New upload detected: ${title} (${videoId})`);

      // Get channel info from database
      const { data: channel } = await supabase
        .from("youtube_channels")
        .select("channel_name, user_id")
        .eq("channel_id", channelId)
        .eq("is_verified", true)
        .single();

      if (channel) {
        // Store upload in database
        const { error } = await supabase.from("youtube_uploads").upsert(
          [
            {
              channel_id: channelId,
              video_id: videoId,
              video_title: title,
              uploaded_at: published,
              notified_at: new Date().toISOString(),
            },
          ],
          { onConflict: "video_id" }
        );

        if (!error) {
          // Send real-time notification via WebSocket
          io.to(`user:${channel.user_id}`).emit("new-upload", {
            channelId,
            channelName: channel.channel_name,
            videoId,
            videoTitle: title,
            uploadedAt: published,
          });

          console.log(`✓ Notified user ${channel.user_id} of new upload`);
        }
      }

      res.status(200).send("OK");
    } catch (error) {
      console.error("Error processing YouTube webhook:", error);
      res.status(200).send("OK"); // Always return 200 to YouTube
    }
  }
);

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
