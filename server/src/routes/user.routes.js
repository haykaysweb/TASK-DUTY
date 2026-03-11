import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  refreshToken,
} from "../controller/user.controller.js";

import { validateFormData } from "../middleware/validateFormData.js";

import {
  validateRegisterUserSchema,
  validateLoginUserSchema,
} from "../utils/formValidation.js";

import { rateLimiter } from "../middleware/rateLimit.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post(
  "/create",
  rateLimiter(10),
  validateFormData(validateRegisterUserSchema),
  registerUser,
);

router.post(
  "/login",
  rateLimiter(5),
  validateFormData(validateLoginUserSchema),
  loginUser,
);

router.post("/logout", authenticate, logoutUser);

router.get("/get", authenticate, getUser);

router.post("/refresh-token", refreshToken);

export default router;
