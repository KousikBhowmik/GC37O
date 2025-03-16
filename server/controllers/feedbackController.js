import sendEmail from "../configs/nodeMailer.js";
import UserModel from "../models/userModel.js";
import { textTemplate } from "../utils/emailTemplate.js";

const feedbackEmail = async (req, res) => {
  const { userId } = req;
  const { subject, message } = req.body;

  if (!userId || !subject || !message)
    return res
      .status(401)
      .json({ success: false, message: "All field are required" });

  try {
    let user = await UserModel.findById(userId);
    if (!user?.email)
      return res
        .status(401)
        .json({ success: false, message: "Email not found" });

    console.log(user.email);

    const data = textTemplate(user.email, message);
    const admin = process.env.MY_EMAIL;
    await sendEmail(admin, subject, data);

    res.status(200).json({ success: true, message: "Feedback send" });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default feedbackEmail;
