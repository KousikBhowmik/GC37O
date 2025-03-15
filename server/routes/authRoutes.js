import { Router } from "express";
import { loginWithGoogle, loginUser, getUser } from "../controllers/authController.js";
import { otpSendApi, otpVerifyApi } from "../controllers/otpController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const authRouter = Router();

authRouter.post("/send-otp", otpSendApi);
authRouter.post("/verify-otp", otpVerifyApi);
authRouter.post("/login-user", loginUser);
authRouter.post("/login-google", loginWithGoogle);
authRouter.get("/get-user", tokenVerification, getUser);

export default authRouter;
