import express from "express";
import upload from "../middleware/upload.js";

import {
  saveHeroSection,
  getHeroSection,
  deleteHeroImage,
} from "../controllers/heroSectionController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "backgroundImage1",
      maxCount: 1,
    },
    {
      name: "backgroundImage2",
      maxCount: 1,
    },
    {
      name: "backgroundImage3",
      maxCount: 1,
    },
  ]),
  saveHeroSection
);

router.get("/", getHeroSection);

router.delete("/image", deleteHeroImage);

export default router;