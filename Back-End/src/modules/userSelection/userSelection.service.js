import UserSelection from "../../database/models/userSelection.model.js";
export const createUserSelection = async (data, userId) => {
  return await UserSelection.create({ ...data, userId });
};
export const getMySelections = async (userId) => {
  return await UserSelection.find({ userId });
};
export const getAllSelections = async () => {
  return await UserSelection.find().populate("userId", "email");
};
export const updateSelectionStatus = async (id, status) => {
  return await UserSelection.findByIdAndUpdate(id, { status }, { new: true });
};