import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        goal: {
            type: String,
        },
        age: {
            type: Number,
            min: [10, "Age must be at least 10"],
            max: [100, "Age must be less than 100"],
        },
        height: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        profileImage: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        activityLevel: {
            type: JSON,
        },
    },
    { timestamps: true }
);

// Optional: Hide password in JSON output
// userSchema.methods.toJSON = function () {
//     const user = this.toObject();
//     delete user.password;
//     return user;
// };

const User = mongoose.model("User", userSchema);
export default User;
