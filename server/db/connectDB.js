import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
};
