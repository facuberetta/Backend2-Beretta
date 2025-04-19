import express from 'express';
import passport from 'passport';
import UserRepository from '../repositories/user.repository.js';

const router = express.Router();
const userRepo = new UserRepository();

router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userDTO = await userRepo.getUserDTOById(req.user._id);
    res.json(userDTO);
});

export default router;
