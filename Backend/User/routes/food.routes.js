import express from "express";
import isAuthenticated from "../../middleware/AuthMiddleware.js";
import { GetAllFood } from "../Controller/food.controller.js";

const router = express.Router();

router.get("/get-food", isAuthenticated, GetAllFood);

export default router;