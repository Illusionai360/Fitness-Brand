import express from "express"
import { createUserByTrainer, GetTrainerById, getTrainerUsers, LoginTrainer, LogoutTrainer, RegisterTrainer } from "../controller/tariner.controller.js";
import isAuthenticated from "../../middleware/authMiddleware.js";
import { TrainerAIGeneratedPlan, TrainerGetDayDietPlan, TrainerGetDietPlans, TrainerMealPlan } from "../controller/trainerDiet.controller.js";

const router = express.Router();

router.post("/register-trainer", RegisterTrainer);
router.post("/login-trainer", LoginTrainer);
router.post("/logout-trainer", isAuthenticated, LogoutTrainer);
router.get("/trainer/:id", isAuthenticated, GetTrainerById);
router.get("/trainer-users", isAuthenticated, getTrainerUsers);
router.post("/create-user-by-trainer", isAuthenticated, createUserByTrainer);
router.post("/meal-plan-by-trainer", isAuthenticated, TrainerMealPlan);
router.post("/ai-generated-plan-by-trainer", isAuthenticated, TrainerAIGeneratedPlan);
router.get("/diet-plans-by-trainer", isAuthenticated, TrainerGetDietPlans);
router.get("/day-diet-plan-by-trainer", isAuthenticated, TrainerGetDayDietPlan);

export default router;
