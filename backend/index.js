require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const Email = require("./models/Email");

const app = express();

// CORS Configuration for Vercel
app.use(cors({
  origin: [
    'https://bulk-mail-frontend-app.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Determine the correct path to frontend dist
const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("📁 Looking for frontend at:", frontendPath);
console.log("📁 Frontend exists:", fs.existsSync(frontendPath));

// Serve static files from frontend build
app.use(express.static(frontendPath));

// Environment variables with fallbacks for local development
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bulkmail";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access denied" });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.json({ message: "Bulk Mail Server is running!" });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  
  // Simple authentication (in production, use proper auth with hashed passwords)
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Send bulk email endpoint
app.post("/api/send-bulk-email", async (req, res) => {
  try {
    const { subject, text, html, recipients } = req.body;
    
    if (!subject || !recipients || recipients.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Subject and recipients are required" 
      });
    }

    let successCount = 0;
    let failedCount = 0;
    const errors = [];

    // Send email to each recipient
    for (const recipient of recipients) {
      try {
        await transporter.sendMail({
          from: `"Bulk Mail Server" <${EMAIL_USER}>`,
          to: recipient,
          subject: subject,
          text: text || "Default text message",
          html: html || `<p>${text}</p>`,
        });
        successCount++;
      } catch (error) {
        failedCount++;
        errors.push({ recipient, error: error.message });
      }
    }

    // Save to database
    const emailRecord = new Email({
      subject,
      body: text,
      recipients,
      status: failedCount === 0 ? 'sent' : (successCount === 0 ? 'failed' : 'partial'),
      successCount,
      failedCount
    });
    await emailRecord.save();

    console.log(`Bulk email sent: ${successCount} success, ${failedCount} failed`);
    
    res.json({
      success: true,
      message: "Bulk email process completed",
      successCount,
      failedCount,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error("Error sending bulk email:", error.message);
    
    res.status(500).json({
      success: false,
      message: "Failed to send bulk email",
      error: error.message
    });
  }
});

// Get email history
app.get("/api/email-history", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 }).limit(50);
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch email history", error: error.message });
  }
});

app.get("/api/test-email", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"Test Sender" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: "Test Email",
      text: "This is a test email sent from Nodemailer.",
      html: "<b>This is a test email sent from Nodemailer.</b>"
    });

    console.log("Test email sent:", info.messageId);
    
    res.json({
      success: true,
      message: "Test email sent successfully",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("Error sending test email:", error.message);
    
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message
    });
  }
});

// Catch-all route - serve React app for any non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/dist/index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error("❌ index.html not found at:", indexPath);
    res.status(500).send("Frontend not built. Please run: npm run build");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ MongoDB Connected`);
  console.log(`✅ Serving frontend from: ${path.join(__dirname, "../frontend/dist")}`);
});
