import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./User/routes/user.routes.js";
import foodRoutes from "./User/routes/food.routes.js";
import dietRoutes from "./User/routes/diet.routes.js";
import reciepeRoutes from "./User/routes/reciepe.routes.js";
import connectDB from "./utils/db.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(cors(corsOptions));


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/food", foodRoutes)
app.use("/api/v1/diet", dietRoutes)
app.use("/api/v1/reciepe", reciepeRoutes)

const PORT = process.env.PORT;


const startServer = async () => {
    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (error) {

        console.error("Failed to connect to the database:", error);

        process.exit(1);
    }
}


startServer();