import express from "express";
const router = express.Router();

import * as agent from "../controllers/project.js";

router.post("/", agent.createProject);
router.get("/", agent.getProjects);
router.get("/:id", agent.getProject);
router.put("/:id", agent.updateProject);
router.delete("/:id", agent.deleteProject);

export default router;
