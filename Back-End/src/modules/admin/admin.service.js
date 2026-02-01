import User from "../../database/models/user.model.js";

export const getAllUsers = async () => {
  return User.find().select("-password");
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return { message: "User deleted successfully" };
};