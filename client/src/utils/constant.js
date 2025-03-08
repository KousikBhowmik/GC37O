// @ts-nocheck
export const serverURL = import.meta.env.VITE_SERVER_URL;

export const authRoute = "/api/authentication";
export const otpSendRoute = `${authRoute}/sendOtp`;
export const otpVerifyRoute = `${authRoute}/verifyOtp`;
export const singUpRoute = `${authRoute}/loginUser`;
export const googleLoginRoute = `${authRoute}/loginWithGoogle`;
export const getUserRoute = `${authRoute}/getUser`;


