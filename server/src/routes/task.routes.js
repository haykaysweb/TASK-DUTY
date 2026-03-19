import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();


router.post("/create", authenticate, createTask);


router.get("/get", authenticate, getTasks);

router.patch("/update/:id", authenticate, updateTask);

router.delete("/delete/:id", authenticate, deleteTask);

export default router;
