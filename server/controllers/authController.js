import UserModel from "../models/userModel.js";
import TasksModel from "../models/tasksModel.js";
import EventsModel from "../models/eventsModel.js";
import { hash } from "bcryptjs";
import admin from "firebase-admin";
import { cookieObj } from "../utils/constants.js";
import {
  comparePasswordFun,
  createTokenFun,
  hashPasswordFUn,
} from "../utils/helperFunctions.js";
import dotenv from "dotenv";

dotenv.config();

//  -------------------------- Api to check email exist or not --------------------------

export const emailExist = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const getEmail = await UserModel.findOne({ email });
    
    if (!getEmail) {
      res.status(200).json({
        success: false,
        message: "Email doesn't exist",
      });
    } else if (getEmail && getEmail.email === email) {
      res.status(200).json({
        success: true,
        message: "Email already exists",
        loginType: getEmail.passwordType,
      });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ------------------------- API for Register USER with email/pass --------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(401)
      .json({ success: false, message: "All field are required" });

  try {
    let user = await UserModel.findOne({ email });
    const getCount = await UserModel.countDocuments();
    let isUserExist = false;

    if (user) {
      isUserExist = await comparePasswordFun(password, user.password);

      if (!isUserExist)
        return res
          .status(401)
          .json({ success: false, message: "Wrong password" });
    } else {
      const hashPassword = await hash(
        password,
        Number(process.env.SOLT_ROUNDS)
      );
      user = await UserModel.create({
        email: email,
        password: hashPassword,
        name: `GCUSER${getCount}`,
      });
      isUserExist = user ? true : false;
    }
    if (user && isUserExist) {
      const token = createTokenFun(user._id);

      res.cookie("user-token", token, cookieObj);
      res.status(200).json({
        success: true,
        message: "user logged in successfully",
        user: {
          name: user.name,
          profilePic: user.profilePic,
          email: user.email,
        },
      });
    } else
      res
        .status(400)
        .json({ success: false, message: "Faild to register user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ------------------------ Api for Sing up and Login user with google --------------------

export const loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken)
    return res
      .status(400)
      .json({ success: false, message: "Invalid authentication" });

  try {
    const decodeToken = await admin.auth().verifyIdToken(idToken);

    const { uid, name, email, picture } = decodeToken;

    let user = await UserModel.findOne({ email });

    if (user?.passwordType === "custom")
      return res
        .status(400)
        .json({ success: false, message: "Login with email and password" });

    if (!user) {
      const hashPassword = await hashPasswordFUn(uid);
      const getCount = await UserModel.countDocuments();
      user = await UserModel.create({
        email: email,
        passwordType: "google",
        password: hashPassword,
        name: name || `GCUSER${getCount}`,
        profilePic: picture,
      });
    }
    if (user) {
      const token = createTokenFun(user._id);

      res.cookie("user-token", token, cookieObj);

      res.status(201).json({
        success: true,
        message: "User login successful",
        user: {
          name: user.name,
          profilePic: user.profilePic,
        },
      });
    } else
      res.status(400).json({ success: false, message: "Faild to Login user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ---------------------- API for Login USER with email/pass -----------------

export const getUser = async (req, res) => {
  const { userId } = req;
  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "user ID is required" });

  try {
    const user = await UserModel.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user data not found" });

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to get your data",
      error: error.message,
    });
  }
};

// ------------------------------ Api for reset password ------------------------------

export const resetPasswordApi = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const hashedPassword = await hashPasswordFUn(password);

    const passUpdate = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!passUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found or unable to update password",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//  ------------------------- Delete user Api ----------------------------

export const deleteUser = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    // Find the user first
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const delTasks = await TasksModel.deleteMany({ user: userId });
    const delEvents = await EventsModel.deleteMany({ user: userId });

    const delUser = await UserModel.findByIdAndDelete(userId);

    if (!delTasks || !delEvents || !delUser)
      return res
        .status(400)
        .json({ success: false, message: "Unable to delete user" });

    res.status(200).json({
      success: true,
      message: "User and related data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//  --------------------------- update user Api ---------------------------

export const updateUserApi = async (req, res) => {
  const { userId } = req;
  const updateFields = req.body;
  if (req.file) {
    updateFields.profileImage = req.file.path;
  }

  if (!userId || !updateFields || Object.keys(updateFields).length === 0) {
    return res.status(400).json({
      success: false,
      message: "User ID and update fields are required",
    });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
