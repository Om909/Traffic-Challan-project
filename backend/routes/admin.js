// backend/routes/admin.js
import express from "express";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /admin/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Provide username and password" });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // sign JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token, username: admin.username });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Server error", error: err.message || err });
  }
});

export default router;
