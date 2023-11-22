import express from "express";
const router = express.Router();

import * as agent from "../controllers/task.js";

router.post("/", agent.createTask);
router.get("/", agent.getTasks);
router.get("/:id", agent.getTask);
router.put("/:id", agent.updateTask);
router.delete("/:id", agent.deleteTask);

export default router;
