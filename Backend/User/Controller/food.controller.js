import { GoogleGenAI } from "@google/genai"
import Food from "../models/Food.model.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({
    apiKey: `${process.env.GEMINI_API_KEY}`
})


export const GetAllFood = async (req, res) => {

    const query = req.query.query?.toLowerCase();
    
    if (!query) {
        return res.status(400).json({
            message: "Query is required"
        })
    }
    try {

        const existingFood = await Food.find({
            name: {
                $regex: query,
                $options: "i"
            }
        })

        if (existingFood.length > 0) {
            return res.status(200).json({
                message: "Food found",
                data: existingFood
            })
        }

        console.log("🔍 Not found, fetching from Gemini...");

        const prompt = `Provide nutritional information for "${query}" based on the required JSON schema.`;

        const responseSchema = {
            type: "object",
            properties: {
                name: { type: "string" },
                category: { type: "string" },
                calories: { type: "number" },
                protein: { type: "number" },
                fat: { type: "number" },
                carbs: { type: "number" },
                variants: {
                    type: "array",
                    items: { type: "string" }
                }
            },
            required: ["name", "category", "calories", "protein", "fat", "carbs", "variants"]
        };

        const responseModel = await genAI.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });


        const responseText = await responseModel.text;
        const foodData = JSON.parse(responseText);

        const newFood = await Food.create({
            ...foodData,
            source: "gemini",
        });

        console.log("✅ Added new food from Gemini");
        return res.status(201).json(newFood);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}