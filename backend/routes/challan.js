// backend/routes/challan.js
import express from "express";
import jwt from "jsonwebtoken";
import Challan from "../models/Challan.js";

const router = express.Router();

// verifyAdmin middleware (token in Authorization header)
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Add challan (admin) - accepts optional userId
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.vehicleNumber) payload.vehicleNumber = payload.vehicleNumber.toUpperCase();
    const challan = await Challan.create(payload);
    res.json({ message: "Challan added", challan });
  } catch (err) {
    console.error("Add challan error:", err);
    res.status(400).json({ message: "Error adding challan", error: err.message });
  }
});

// Get all challans (admin)
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const challans = await Challan.find().sort({ issueDate: -1 });
    const total = challans.length;
    const paid = challans.filter(c => c.status === "Paid").length;
    const pending = challans.filter(c => c.status === "Pending").length;
    res.json({ total, paid, pending, challans });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get challans for a user by userId
router.get("/user/:id", async (req, res) => {
  try {
    const challans = await Challan.find({ userId: req.params.id }).sort({ issueDate: -1 });
    res.json(challans || []);
  } catch (err) {
    console.error("User challans error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Pay challan
router.post("/pay/:id", async (req, res) => {
  try {
    await Challan.findByIdAndUpdate(req.params.id, { status: "Paid" });
    res.json({ message: "Challan Paid" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get challans by vehicle (case-insensitive)
router.get("/vehicle/:vehicleNumber", async (req, res) => {
  try {
    const v = req.params.vehicleNumber;
    const challans = await Challan.find({
      vehicleNumber: { $regex: `^${v}$`, $options: "i" }
    }).sort({ issueDate: -1 });
    res.json(challans || []);
  } catch (err) {
    console.error("Vehicle search error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
