import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const JWT_SECRET = config.jwtSecret || 'supersecreto';

export const generateToken = (user) => {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
