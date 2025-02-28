import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  {
    timestamps: true,
  }
);

const OtpModel = mongoose.models.Otps || mongoose.model("Otps", OtpSchema);

export default OtpModel;
