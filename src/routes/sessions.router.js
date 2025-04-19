import { Router } from 'express';
import UserDTO from '../dtos/user.dto.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/current', auth, (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({ user: userDTO });
});

export default router;
