import express from "express";
import isAuthenticated from "../../middleware/authMiddleware.js";
import { AIGeneratedPlan, GetDayDietPlan, GetDietPlans, MealPlan } from "../Controller/diet.controller.js";

const router = express.Router();

router.post("/create-meal", isAuthenticated, MealPlan);
router.post("/ai-generated-plan", isAuthenticated, AIGeneratedPlan);
router.get("/get-diet", isAuthenticated, GetDietPlans);
router.get("/get-diet-day", isAuthenticated, GetDayDietPlan);

export default router;