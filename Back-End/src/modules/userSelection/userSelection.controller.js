import { Router } from "express";
import {
  createUserSelection,
  getMySelections,
  getAllSelections,
  updateSelectionStatus,
} from "./userSelection.service.js";
import { auth, adminOnly } from "../../middlewares/auth.middleware.js";
const router = Router();
router.post("/", auth, async (req, res) => {
  const selection = await createUserSelection(req.body, req.user._id);
  res.status(201).json(selection);
});
router.get("/my-selections", auth, async (req, res) => {
  res.json(await getMySelections(req.user._id));
});
router.get("/", auth, adminOnly, async (req, res) => {
  res.json(await getAllSelections());
});
router.patch("/:id/status", auth, adminOnly, async (req, res) => {
  res.json(await updateSelectionStatus(req.params.id, req.body.status));
});
export default router;