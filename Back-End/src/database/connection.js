import mongoose from "mongoose";
import { ENV } from "../../config/env.service.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Error ❌", err.message);
    process.exit(1);
  }
};

export default connectDB;