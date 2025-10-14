import express from "express";
import { createRecipe } from "../Controller/recipe.controller.js";
import isAuthenticated from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-recipe", isAuthenticated, createRecipe);

export default router;