import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


import propertyRoutes from "./routes/propertyRoutes.js";
import heroSectionRoutes from "./routes/heroSectionRoutes.js";
import roundSectionRoutes from "./routes/roundSectionRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import agentCornerRoutes from "./routes/agentCornerRoutes.js";
import agentNetworkRoutes from "./routes/agentNetworkRoutes.js";
import networkDensityRoutes from "./routes/networkDensityRoutes.js";
import planSectionRoutes from "./routes/planSectionRoutes.js";
import aboutStatsRoutes from "./routes/aboutStatsRoutes.js";
import aboutGenesisRoutes from "./routes/aboutGenesisRoutes.js";
import aboutMissionVisionRoutes from "./routes/aboutMissionVisionRoutes.js";
import aboutVisionaryRoutes from "./routes/aboutVisionaryRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/properties", propertyRoutes);
app.use("/api/cms/hero", heroSectionRoutes);
app.use("/api/cms/round-section", roundSectionRoutes);
app.use("/api/cms/testimonials", testimonialRoutes);
app.use("/api/cms/agentcorner", agentCornerRoutes);
app.use(
  "/api/cms/plan-section",
  planSectionRoutes
);

app.use(
  "/api/cms/agent-network",
  agentNetworkRoutes
  );

  app.use(
    "/api/cms/network-density",
    networkDensityRoutes
  );

  app.use(
    "/api/cms/about-stats",
    aboutStatsRoutes
  );

  app.use(
    "/api/cms/about-genesis",
    aboutGenesisRoutes
    );

    app.use(
      "/api/cms/about-mission-vision",
      aboutMissionVisionRoutes
    );

    app.use(
      "/api/cms/about-visionaries",
      aboutVisionaryRoutes
      );

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});