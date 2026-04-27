import express from 'express';
import { superAdminLogin, createGroupAndPresident, getDashboardStats, getGroups } from '../controllers/superAdminController.js';
import { requireSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', superAdminLogin);

// Protected specifically for Super Admin
router.get('/stats', requireSuperAdmin, getDashboardStats);
router.get('/groups', requireSuperAdmin, getGroups);
router.post('/create-group', requireSuperAdmin, createGroupAndPresident);

export default router;
