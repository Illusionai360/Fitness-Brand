import Dietplan from "../models/dietPlan.model";

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