import sendEmail from "../configs/nodeMailer.js";
import OtpModel from "../models/otpModel.js";
import { hash, compare } from "bcryptjs";
import { singupOtpTemplate } from "../utils/emailTemplate.js";

// --------------------- API to send OTP  --------------------

export const otpSendApi = async (req, res) => {
  const { email, otpType } = req.body;

  if (!email || !otpType)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await hash(otp, 10);

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

// ----------------------- OTP Verify API -------------------------

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

    const isOtpMatch = await compare(otp, otpRecord.otp);

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
