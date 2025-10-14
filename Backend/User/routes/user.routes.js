import express from "express";
import isAuthenticated from "../../middleware/authMiddleware.js";
import { GetUserById, Login, Logout, Register } from "../Controller/auth.controller.js";

const router = express.Router();

router.post("/register", Register, isAuthenticated);
router.post("/login", Login, isAuthenticated);
router.post("/logout", isAuthenticated, Logout);
router.get("/get-user", isAuthenticated, GetUserById);

export default router;