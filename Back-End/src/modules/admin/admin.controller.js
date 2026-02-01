import * as AdminService from "./admin.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const result = await AdminService.deleteUser(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};