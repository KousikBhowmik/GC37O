import { hash, compare } from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const hashPasswordFUn = async (password) => {
  const result = await hash(password, Number(process.env.SOLT_ROUNDS));
  return result;
};

export const comparePasswordFun = async (password, hashedPassword) => {
  const result = await compare(password, hashedPassword);
  return result;
};

export const createTokenFun = (userId) => {
  // @ts-ignore
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_VALIDITY,
  });
  return token;
};

export const verifyJwtTokenFun = (userToken) => {
  // @ts-ignore
  const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
  return decoded;
};
