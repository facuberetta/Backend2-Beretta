import UserDTO from '../services/dto/user.dto.js';

export const getCurrentUser = (req, res) => {
    if (!req.user) return res.status(401).json({ message: "No hay usuario en sesión" });

    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
};
