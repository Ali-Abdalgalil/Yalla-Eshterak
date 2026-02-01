import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.service.js";

export const signToken = (payload) =>
  jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "7d" });
