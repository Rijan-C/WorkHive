import express from "express";
import {
  createGig,
  getAllGigs,
  getGigById,
  getMyGigs,
  updateGig,
  deleteGig,
} from "../controllers/gigController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadGigImages } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadGigImages.array("images", 5), createGig);
router.get("/", getAllGigs);
router.get("/my", protect, getMyGigs);
router.get("/:id", getGigById);
router.put("/:id", protect, updateGig);
router.delete("/:id", protect, deleteGig);

export default router;