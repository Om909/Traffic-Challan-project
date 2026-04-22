// backend/seedChallans.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Challan from "./models/Challan.js";

async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.log("❌ ERROR: MONGO_URI missing in .env file!");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✔ MongoDB Connected");

    // Remove old challans (optional)
    await Challan.deleteMany({});
    console.log("🗑 Old challans removed");

    // Sample challans - NOTE: using fields 'cause' and 'fine' to match model/frontend
    const challans = [
      {
        vehicleNumber: "JH01AB1234",
        cause: "No Helmet",
        fine: 1000,
        address: "Main Road, Ranchi",
        issueDate: "2025-11-01",
        dueDate: "2025-11-21",
        status: "Pending"
      },
      {
        vehicleNumber: "JH01AB1234",
        cause: "Wrong Parking",
        fine: 500,
        address: "Kutchery Chowk, Ranchi",
        issueDate: "2025-11-10",
        dueDate: "2025-11-30",
        status: "Pending"
      },
      {
        vehicleNumber: "MH12XY9999",
        cause: "Over Speeding",
        fine: 1500,
        address: "Shivaji Nagar, Pune",
        issueDate: "2025-10-15",
        dueDate: "2025-11-05",
        status: "Paid"
      },
      {
        vehicleNumber: "DL05MK4321",
        cause: "Signal Jump",
        fine: 1200,
        address: "Karol Bagh, Delhi",
        issueDate: "2025-11-20",
        dueDate: "2025-12-05",
        status: "Pending"
      }
    ];

    // Normalize vehicle numbers to uppercase (in case user seeds lowercase)
    const normalized = challans.map(c => ({ ...c, vehicleNumber: c.vehicleNumber.toUpperCase() }));

    await Challan.insertMany(normalized);
    console.log("✔ Challans inserted successfully!");

    await mongoose.disconnect();
    console.log("✔ MongoDB disconnected");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seed();
