import User from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { signToken } from "../../utils/jwt.js";

export const signup = async ({ firstName, lastName, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "user",
  });
  return {
    message: "Registered successfully.",
  };
};
export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  const token = signToken({
    id: user._id,
    role: user.role,
  });
return {
  token,
  user: {
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
  },
}
};
export const me = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};
export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password incorrect");
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return { message: "Password updated successfully" };
};
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "If email exists, reset link sent" };
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();
  console.log(
    "🔑 RESET PASSWORD LINK:",
    `http://localhost:3000/reset-password/${resetToken}`
  );
  return { message: "Reset link sent" };
};
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid or expired token");
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
  return { message: "Password reset successfully" };
};
export const updateProfile = async (userId, firstName, lastName) => {
    console.log("BODY:", firstName, lastName);
  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true }
  ).select('-password')
  if (!user) throw new Error("User not found");
  return user;
}