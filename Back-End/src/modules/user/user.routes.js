import { Router } from "express";
import * as C from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const r = Router();
r.post("/signup", C.signup);
r.post("/login", C.login);
r.get("/me", authMiddleware, C.me);
r.put("/change-password", authMiddleware, C.changePassword);
r.post("/forgot-password", C.forgotPassword);
r.post("/reset-password/:token", C.resetPassword);
r.put('/me', authMiddleware, C.updateProfile)
export default r;