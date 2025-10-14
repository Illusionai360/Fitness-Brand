import express from "express";
import isAuthenticated from "../../middleware/AuthMiddleware.js";
import { createRecipe } from "../Controller/recipe.controller.js";

const router = express.Router();

router.post("/create-recipe", isAuthenticated, createRecipe);

export default router;