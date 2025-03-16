// @ts-nocheck
export const singupOtpTemplate = (otp) => {
  return `<div style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #444; border-radius: 10px; font-family: Arial, sans-serif; background-color: #222; color: #ddd; text-align: left; box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.1);">
    <h2 style="color: #fff; margin-bottom: 10px;">Dear User,</h2>
    <p style="font-size: 16px;">Your One-Time Password (OTP) is</p>
    <p style="font-size: 22px; font-weight: bold; color: #d9534f; background-color: #333; display: inline-block; padding: 10px 20px; border-radius: 5px; border: 1px solid #d9534f;">
        ${otp}
    </p>
    <p style="font-size: 14px; margin-top: 15px;">
        This OTP is valid for 10 minutes and is required to <strong>verify your email </strong>.
    </p>
    <p style="font-size: 14px;">
        Please do not share this OTP with anyone. Our employees will never ask you for your password.
    </p>
    <p style="font-size: 14px;">
        If you did not request this OTP, please contact us immediately at 
        <strong style="color: #f4b400;">${process.env.EMAIL_USER}</strong>
    </p>
    <p style="margin-top: 20px; font-size: 14px;">
        Thank you,<br>
        <strong style="color: #1e90ff;">GC37O Team</strong>
    </p>
    </div>
    `;
};


export const textTemplate = (user, message) => {
    return  `
<h2>${user}</h2>
<p>${message} </p>
    `
}