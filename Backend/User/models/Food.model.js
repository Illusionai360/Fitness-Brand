import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        calories: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        },
        fat: {
            type: Number,
            required: true
        },
        carbs: {
            type: Number,
            required: true
        },
        variants: {
            type: [String], // e.g., ["raw", "cooked", "boiled"]
            required: true
        },
        source: {
            type: String,
            enum: ["manual", "gemini"],
            default: "manual"
        },
    },
    { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
export default Food;
