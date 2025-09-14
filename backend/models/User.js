import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },   // Only for local signup
  authProvider: { type: String, enum: ["google", "local"], required: true },
  googleId: { type: String },       // Only for Google users
  role: { type: String, enum: ["user", "admin"], default: "user" }  // ✅ Added role
});

export default mongoose.model("User", userSchema);
