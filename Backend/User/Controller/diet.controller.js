import Dietplan from "../models/dietPlan.model.js";

//  Add or update a meal for a client and day
export const MealPlan = async (req, res) => {
    try {
        const { day } = req.query;
        const { id } = req.id;

        const { mealType, foods } = req.body;

        let dietPlan = await Dietplan.findOne({
            day,
            createdBy: id
        })

        if (!dietPlan) {
            dietPlan = new Dietplan({
                day,
                meals: [{ mealType, foods }],
                createdBy: id
            });
        }
        else {

            const existingMeal = dietPlan.meals.find(m => m.mealType === mealType);

            if (existingMeal) {
                existingMeal.food = foods;
            }
            else {
                dietPlan.meals.push({ mealType, foods });
            }
        }

        res.status(200).json({ message: `${mealType} updated successfully`, dietPlan });

        await dietPlan.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const AIGeneratedPlan = async (req, res) => {
    try {

        const { id } = req.id;
        const { weeklyPlan } = req.body;

        if (!weeklyPlan) {
            return res.status(400).json({ message: "Weekly plan data is required" });
        }

        const savedPlans = [];


        for (const [day, meals] of Object.entries(weeklyPlan)) {
            const dayPlan = {
                day,
                meals: Object.entries(meals).map(([mealType, foods]) => ({
                    mealType,
                    foods,
                })),
                createdBy: id,
                generatedBy: "AI",
            };

            const existing = await Dietplan.findOne({ day, createdBy: id });

            if (existing) {
                existing.meals = dayPlan.meals; 
                await existing.save();
                savedPlans.push(existing);
            } else {
                const newPlan = new Dietplan(dayPlan);
                await newPlan.save();
                savedPlans.push(newPlan);
            }
        }

        res.status(200).json({
            message: "AI-generated weekly plan saved successfully",
            plans: savedPlans,
        });

    } catch (error) {
        console.error("❌ Error saving AI plan:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const GetDietPlans = async (req, res) => {
    try {
        const { id } = req.id;

        const dietPlans = await Dietplan.findById(id);

        if (!dietPlans) {
            return res.status(404).json({ message: "Diet plans not found" });
        }

        res.status(200).json({
            success: true,
            dietPlans
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const GetDayDietPlan = async (req, res) => {
    try {
        const { day } = req.query;
        const { id } = req.id;

        const dietPlan = await Dietplan.findOne({ day, createdBy: id });

        if (!dietPlan) {
            return res.status(404).json({ message: "Diet plan not found" });
        }

        res.status(200).json({
            success: true,
            dietPlan
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}