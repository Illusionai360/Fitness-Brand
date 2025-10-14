import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealType: {
        type: String,
        required: true,
        enum: ["breakfast", "lunch", "dinner", "snack"]
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }
})

const dietPlanSchema = new mongoose.Schema(
    {
        day: {
            type: String,
            required: true,
            enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        },
        meals: [mealSchema],

        totalCalories: {
            type: Number,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    },
)

const Dietplan = mongoose.model("DietPlan", dietPlanSchema);
export default Dietplan;