import express from 'express';
import { createMember, getGroupMembers, getGroupInfo } from '../controllers/memberController.js';
import { requirePresident, authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get group info (General authenticated user in group)
router.get('/group-info', authenticate, getGroupInfo);

// President specific routes
router.post('/add', requirePresident, createMember);
router.get('/list', requirePresident, getGroupMembers);

export default router;
