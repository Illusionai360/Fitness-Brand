import Dietplan from "../../User/models/dietPlan.model.js"

//  Add or update a meal for a client and day
export const TrainerMealPlan = async (req, res) => {
    try {
        const { day } = req.query;
        const { id } = req.id;
        const userId = req.params.id;

        const { mealType, foods } = req.body;

        let dietPlan = await Dietplan.findOne({
            day,
            createdBy: id,
            assignedTo: userId
        })

        if (!dietPlan) {
            dietPlan = new Dietplan({
                day,
                meals: [{ mealType, foods }],
                createdBy: id,
                assignedTo: userId
            });
        }
        else {

            const existingMeal = dietPlan.meals.find(m => m.mealType === mealType);

            if (existingMeal) {
                existingMeal.food = foods.map(f => f._id);
            } else {
                dietPlan.meals.push({
                    mealType,
                    food: foods.map(f => f._id)
                });
            }
        }

        res.status(200).json({ message: `${mealType} updated successfully`, dietPlan });

        await dietPlan.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const TrainerAIGeneratedPlan = async (req, res) => {
    try {

        const { id } = req.id;
        const userId = req.params.id;
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
                assignedTo: userId,
                generatedBy: "AI",
            };

            const existing = await Dietplan.findOne({ day, createdBy: id, assignedTo: userId });

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

export const TrainerGetDietPlans = async (req, res) => {
    try {
        const { id } = req.id;
        const userId = req.params.id;

        const dietPlans = await Dietplan.findById(id, userId);

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

export const TrainerGetDayDietPlan = async (req, res) => {
    try {
        const { day } = req.query;
        const { id } = req.id;
        const userId = req.params.id;

        const dietPlan = await Dietplan.findOne({ day, createdBy: id, assignedTo: userId });

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