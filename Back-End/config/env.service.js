import dotenv from "dotenv";
import Joi from "joi";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/.env" });
}
const envSchema = Joi.object({
  MONGO_URI: Joi.string()
    .uri()
    .required()
    .messages({
      "any.required": "❌ MONGO_URI is required",
      "string.uri": "❌ MONGO_URI must be a valid URI",
    }),
  JWT_SECRET: Joi.string()
    .min(10)
    .required()
    .messages({
      "any.required": "❌ JWT_SECRET is required",
      "string.min": "❌ JWT_SECRET must be at least 10 characters",
    }),
}).unknown(true);
const { error, value } = envSchema.validate(process.env);
if (error) {
  console.error("🚨 Environment validation error:");
  console.error(error.message);
  process.exit(1);
}
export const ENV = {
  MONGO_URI: value.MONGO_URI,
  JWT_SECRET: value.JWT_SECRET,
  PORT: value.PORT
};
console.log("✅ Environment variables validated successfully");