import { Router } from "express";
import { loginWithGoogle, loginUser, getUser } from "../controllers/authController.js";
import { otpSendApi, otpVerifyApi } from "../controllers/otpController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const authRouter = Router();

authRouter.post("/sendOtp", otpSendApi);
authRouter.post("/verifyOtp", otpVerifyApi);
authRouter.post("/loginUser", loginUser);
authRouter.post("/loginWithGoogle", loginWithGoogle);
authRouter.get("/getUser", tokenVerification, getUser);

export default authRouter;
