import UserModel from "../models/userModel.js";
import { hash } from "bcryptjs";
import admin from "firebase-admin";
import { cookieObj } from "../utils/constants.js";
import { createTokenFun, hashPasswordFUn } from "../utils/helperFunctions.js";

// ------------------------- API for Register USER with email/pass --------------------------
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(401)
      .json({ success: false, message: "All field required" });

  try {
    const hashPassword = await hash(password, Number(process.env.SOLT_ROUNDS));
    const getCount = await UserModel.countDocuments();

    const user = await UserModel.create({
      email: email,
      password: hashPassword,
      name: `gcuser${getCount}`,
    });

    if (user) {
      const token = createTokenFun(user._id, "8d");

      res.cookie("user-token", token, cookieObj);

      res.status(201).json({
        success: true,
        message: "User register successful",
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
      const token = createTokenFun(user._id, "8d");

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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ---------------------- API for Login USER with email/pass -----------------

export const login = async (req, res) => {};
