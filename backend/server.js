import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";   // ✅ FIXED IMPORT
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import challanRoutes from "./routes/challan.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
await connectDB();   // ❗ DO NOT USE connectDB(process.env.MONGO_URI)

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/challan", challanRoutes);

app.get("/", (req, res) => res.send("Traffic Challan API running"));

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
