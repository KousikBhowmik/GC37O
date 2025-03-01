import { Router } from "express";
import { otpSendApi, otpVerifyApi, registerUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sendOtp", otpSendApi);
authRouter.post("/verifyOtp", otpVerifyApi);
authRouter.post("/singUp", registerUser);

export default authRouter;
