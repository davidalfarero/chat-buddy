import express from 'express';
import { checkRoute, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkRoute);

export default router;