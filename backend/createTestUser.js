import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");

    const hashed = await bcrypt.hash("user123", 10);

    await User.create({
      name: "Test User",
      email: "test@example.com",
      vehicleNumber: "JH01AB1234",
      password: hashed,
    });

    console.log("User created:");
    console.log("Email: test@example.com");
    console.log("Password: user123");

    await mongoose.disconnect();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createUser();
