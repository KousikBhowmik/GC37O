import { Router } from "express";
import { loginWithGoogle, registerUser } from "../controllers/authController.js";
import { otpSendApi, otpVerifyApi } from "../controllers/otpController.js";

const authRouter = Router();

authRouter.post("/sendOtp", otpSendApi);
authRouter.post("/verifyOtp", otpVerifyApi);
authRouter.post("/singUp", registerUser);
authRouter.post("/loginWithGoogle", loginWithGoogle);

export default authRouter;
