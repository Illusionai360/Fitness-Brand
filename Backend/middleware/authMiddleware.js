import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers["authorization"]?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = {
            id: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default isAuthenticated;
