import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  getProfileById,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadProfileImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/me")
  .get(protect, getMyProfile)
  .put(protect, uploadProfileImage.single("profileImage"), createOrUpdateProfile);
router.get("/:userId", getProfileById);

export default router;
