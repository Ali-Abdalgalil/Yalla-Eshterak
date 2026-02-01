import mongoose from "mongoose";
const userSelectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platformName: { type: String, required: true },
    platformPlan: { type: String, default: "Not specified" },
    status: {
      type: String,
      enum: ["pending", "contacted", "closed"],
      default: "pending",
    },
  },
  { timestamps: true }
);
export default mongoose.model("UserSelection", userSelectionSchema);