// @ts-nocheck
import { cookieObj } from "../utils/constants.js";
import { createTokenFun, verifyJwtTokenFun } from "../utils/helperFunctions.js";
const tokenVerification = async (req, res, next) => {
  try {
    const token = req.cookies?.["user-token"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    
    
    const decodedToken = verifyJwtTokenFun(token);
    
    const newToken = createTokenFun(decodedToken.userId);
    
    res.cookie("user-token", newToken, cookieObj);
    
    req.userId = decodedToken.userId;
    
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default tokenVerification;
