import express from "express";

import {

  getAboutMissionVision,

  updateAboutMissionVision,

} from "../controllers/aboutMissionVisionController.js";

const router = express.Router();

router.get("/", getAboutMissionVision);

router.put("/", updateAboutMissionVision);

export default router;