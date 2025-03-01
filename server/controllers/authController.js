import sendEmail from "../configs/nodeMailer.js";
import OtpModel from "../models/otpModel.js";
import UserModel from "../models/userModel.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { singupOtpTemplate } from "../utils/emailTemplate.js";

// *************** API to send OTP for email verificatiion *******************
export const otpSendApi = async (req, res) => {
  const { email, otpType } = req.body;

  if (!email || !otpType)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpObj = await OtpModel.findOneAndUpdate(
      { email },
      { otp: hashedOtp },
      { upsert: true, new: true }
    );

    const emailContent = singupOtpTemplate(otp);

    const sendOtp = await sendEmail(email, otpType, emailContent);

    if (otpObj?._id && sendOtp)
      res.status(200).json({ success: true, message: "Otp sent succesfully" });
    else
      res.status(400).json({ success: false, message: "Unable to send otp" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Unable to send otp", error });
  }
};

// ******************* OTP Verify API ************************

export const otpVerifyApi = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord)
      return res.status(400).json({ success: false, message: "Expired OTP" });

    const isOtpMatch = await bcrypt.compare(otp, otpRecord.otp);

    if (!isOtpMatch)
      return res.status(400).json({ success: false, message: "Incorrect OTP" });

    const deleteOtp = await OtpModel.deleteOne({ email });

    if (deleteOtp?.deletedCount > 0)
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    else
      res
        .status(400)
        .json({ success: false, message: "OTP verification unsuccessful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Unable to verify otp", error });
  }
};

// ******************* API to Register USER *************************
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(401)
      .json({ success: false, message: "All field required" });

  try {
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SOLT_ROUNDS)
    );

    console.log(email, hashPassword);

    const user = await UserModel.create({
      email: email,
      password: hashPassword,
    });

    if (user) {
      const token = jwt.sign(
        { userId: user._id },
        String(process.env.JWT_SECRET),
        {
          expiresIn: "7d",
        }
      );

      res.cookie("user-token", token, {
        maxAge: 2592000000,
        secure: true,
        sameSite: "none",
      });

      res.status(201).json({
        success: true,
        message: "User register successfully",
        user: {
          profileStatus: user.profileStatus,
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
