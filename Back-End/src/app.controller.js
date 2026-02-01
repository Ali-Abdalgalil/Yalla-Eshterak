import express from "express";
import cors from "cors";
import connectDB from "./database/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { ENV } from "./../config/env.service.js";
export const bootstrap = async () => {
  const app = express();
  const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  await connectDB();
  app.get("/", (req, res) => {
    res.send("API ALIVE 🚀");
  });
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.listen(ENV.PORT, "0.0.0.0", () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
};