import Trainer from "../models/trainer.model.js";
import User from "../../User/models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const RegisterTrainer = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Insuffient data",
                success: false,
            });
        };

        let trainer = await Trainer.findOne({ email });

        if (trainer) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        await Trainer.create({
            name,
            email,
            password: hashedPassword,

        })

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}


export const LoginTrainer = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Insufficient data",
                success: false,
            });
        }


        let trainer = await Trainer.findOne({ email });


        if (!trainer) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }

        const isHassedMatch = await bcrypt.compare(password, trainer.password);

        if (!isHassedMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        }


        const tokenData = {
            userId: trainer._id,
        }

        //➡️ This creates a payload for the JWT (JSON Web Token).
        //It includes the user's MongoDB _id, which uniquely identifies the user.



        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        trainer = {
            id: trainer._id,
            fullName: trainer.fullName,
            email: trainer.email,
            createdAt: trainer.createdAt,
            updatedAt: trainer.updatedAt,
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        }).json({
            message: `Welcome back ${trainer.fullName}`,
            success: true,
            trainer,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        })
    }
}

export const LogoutTrainer = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfull",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const GetTrainerById = async (req, res) => {
    try {
        const id = req.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const trainer = await Trainer.findById(id).select("-password");
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "User not found. Create an account first.",
            });
        }
        return res.status(200).json({
            success: true,
            trainer,
        })
    }
    catch (error) {

        console.error("Error fetching user and tasks by ID:", error);

        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};



export const getTrainerUsers = async (req, res) => {
    try {

        const trainerId = req.id;

        const trainer = await Trainer.findById(trainerId)
            // .populate("users", "name email goal age weight height")
            // .lean();

        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }

        res.status(200).json({
            message: "Users fetched successfully",
            trainer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createUserByTrainer = async (req, res) => {
    try {
        const trainerId = req.id;
        const { name, email, password, gender } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            createdByTrainer: trainerId,
            assignedTrainer: trainerId,
        });

        res.status(201).json({
            message: "User created successfully by trainer",
            user,
        });
    } catch (error) {
        console.error("Error creating user by trainer:", error);
        res.status(500).json({ message: "Server error" });
    }
};