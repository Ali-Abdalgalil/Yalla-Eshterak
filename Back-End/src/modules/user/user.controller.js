import * as UserService from "./user.service.js";
import User from "../../database/models/user.model.js";
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await UserService.signup({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const me = async (req, res, next) => {
  try {
    const user = await UserService.me(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await UserService.changePassword(
      req.user.id,
      oldPassword,
      newPassword
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await UserService.forgotPassword(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const result = await UserService.resetPassword(token, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName },
    { new: true }
  ).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
}