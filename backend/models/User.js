import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicleNumber: String
});

export default mongoose.model("User", UserSchema);
