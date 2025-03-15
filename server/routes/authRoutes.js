import { Router } from "express";
import {
  loginWithGoogle,
  loginUser,
  getUser,
  emailExist,
  resetPasswordApi,
  deleteUser,
  updateUserApi,
} from "../controllers/authController.js";
import { otpSendApi, otpVerifyApi } from "../controllers/otpController.js";
import tokenVerification from "../middlewares/tokenVerification.js";
import upload from "../middlewares/uploadMiddleware.js";

const authRouter = Router();

authRouter.get("/email-exist", emailExist);
authRouter.post("/send-otp", otpSendApi);
authRouter.post("/verify-otp", otpVerifyApi);
authRouter.post("/login-user", loginUser);
authRouter.post("/login-google", loginWithGoogle);
authRouter.get("/get-user", tokenVerification, getUser);
authRouter.put("/update-user", tokenVerification, updateUserApi)
// @ts-ignore
authRouter.put("/upload-image", tokenVerification, upload.single("profile"), updateUserApi);
authRouter.put("/reset-password", resetPasswordApi);
authRouter.delete("/delete-user", tokenVerification, deleteUser);

export default authRouter;
