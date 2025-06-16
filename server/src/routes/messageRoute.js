import express from 'express';
import { getMessages, getUsers, sendMessage } from '../controllers/messageController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/messages/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;