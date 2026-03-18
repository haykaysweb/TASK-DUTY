import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

import { rateLimiter } from "../middleware/rateLimit.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();


router.post("/create", authenticate, rateLimiter(10), createTask);


router.get("/get", authenticate, getTasks);

router.patch("/update/:id", authenticate, rateLimiter(20), updateTask);

router.delete("/delete/:id", authenticate, deleteTask);

export default router;
