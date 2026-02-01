import { Router } from "express";
import * as C from "./admin.controller.js";
import { authMiddleware, allowRoles } from "../../middlewares/auth.middleware.js";

const r = Router();

r.get("/users", authMiddleware, allowRoles("admin"), C.getUsers);
r.delete("/users/:id", authMiddleware, allowRoles("admin"), C.deleteUser);


export default r;
