import Recipe from "../models/reciepe.model.js";

export const createRecipe = async (req, res) => {
    try {

        const { id } = req.id;

        const { name, ingredients, instructions, category, image } = req.body;

        if (!name || !ingredients) {
            return res.status(400).json({ message: "Name and ingredients are required" });
        }

        const recipe = await Recipe.create({
            name,
            ingredients,
            instructions,
            category,
            image,
            createdBy: id
        });

        return res.status(201).json({
            message: "Recipe created successfully",
            recipe
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create recipe",
            error: error.message
        });
    }
};