import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/UserController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/users', registerUser);
router.post('/users/login', loginUser);
router.get('/users/profile', authenticateToken, getUserProfile);

export default router;
