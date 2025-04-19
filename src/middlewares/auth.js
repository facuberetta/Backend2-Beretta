import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer TOKEN"

    try {
        const payload = verifyToken(token);
        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};
