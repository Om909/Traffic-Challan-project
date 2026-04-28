import mongoose from "mongoose";
import bcrypt from "bcrypts";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/trafficdb";

mongoose.connect(MONGO).then(() => {
  console.log("Connected to DB - creating admin");
  (async () => {
    try {
      await Admin.deleteMany({});
      const hashed = await bcrypt.hash("admin123", 10);
      await Admin.create({ username: "admin", password: hashed });
      console.log("Admin created: username=admin password=admin123");
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
});
