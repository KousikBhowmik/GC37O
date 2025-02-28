import { Router } from "express";
import { otpSendApi, otpVerifyApi } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sendOtp", otpSendApi);
authRouter.post("/verifyOtp", otpVerifyApi);

export default authRouter;
