import mongoose from "mongoose";
const settingsSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      required: true,
    },
    defaultMessage: {
      type: String,
      default: "Hello, I want to subscribe to",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Settings", settingsSchema);