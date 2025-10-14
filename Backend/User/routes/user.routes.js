import express from "express";
import isAuthenticated from "../../middleware/AuthMiddleware.js";
import { GetUserById, Login, Logout, Register } from "../Controller/auth.controller.js";
import { GetAllFood } from "../Controller/food.controller.js";

const router = express.Router();

router.post("/register", Register, isAuthenticated);
router.post("/login", Login, isAuthenticated);
router.post("/logout", isAuthenticated, Logout);
router.get("/get-user", isAuthenticated, GetUserById);

export default router;