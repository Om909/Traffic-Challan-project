import mongoose from "mongoose";

const ChallanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vehicleNumber: String,
  cause: String,
  fine: Number,
  address: String,
  issueDate: String,
  dueDate: String,
  status: { type: String, default: "Pending" }
});

export default mongoose.model("Challan", ChallanSchema);
