import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    experience: {
        type: String,
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        enum: ["trainer", "admin"],
        default: "trainer",
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;
