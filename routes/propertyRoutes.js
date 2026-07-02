import express from "express";

import upload from "../middleware/upload.js";

import {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  changePropertyStatus,
  searchProperties,
  filterProperties,
  propertyDashboard,
  
} from "../controllers/propertyController.js";

const router = express.Router();

router.post(
  "/",
  upload.array("images", 20),
  addProperty
);

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put(
    "/:id",
    upload.array("images",10),
    updateProperty
  );

  router.delete("/:id", deleteProperty);
  router.patch("/:id/status", changePropertyStatus);
  router.get("/search/list", searchProperties);
  router.get("/filter/list", filterProperties);
  router.get("/dashboard/stats", propertyDashboard);

export default router;