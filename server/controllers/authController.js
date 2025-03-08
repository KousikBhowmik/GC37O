import UserModel from "../models/userModel.js";
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
