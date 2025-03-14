import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    passwordType: {
      type: String,
      enum: ["google", "custom"],
      default: "custom",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
      default: "",
    },
    profileStatus: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;
