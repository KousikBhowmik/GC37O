import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile: {
      firstName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: false,
      },
      profilePic: {
        type: String,
        required: false,
        default: ""
      },
    },
    profileStatus:{
      type: Boolean,
      default: false
    }
    // tasks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "taskModel",
    //   },
    // ],
    // events: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "eventModel",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);

export default UserModel;
