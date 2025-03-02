import { toast } from "react-toastify";

export const emailCheck = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const result = emailRegex.test(email);
  if (!result) toast.error("Enter a valid email");
  return result;
};

export const passwrodCheck = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};:'",.<>/?]{6,}$/;
  const result = passwordRegex.test(password);
  if (!result) {
    toast.error("Enter a storng Password");
    if(password.length < 6) toast.info("Password min length 6");
  }
  return result;
};

export const otpCheck = (otp) => {
  const otpRegex = /^[0-9]{6}$/;
  const result = otpRegex.test(otp);
  if (!result) toast.error("Enter 6 digit OTP");
  return result;
};
