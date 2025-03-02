import axios from "axios";
import { serverURL } from "../utils/constant.js";

export const apiClient = axios.create({
  baseURL: serverURL,
});
