import express from 'express';
import {GetProfile ,EditProfile } from '../controllers/ProfileController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';
const router = express.Router();

router.get('/:email', GetProfile);
router.put('/:email', EditProfile);
// router.put('/users/:username/password', isAuthenticated, ChangePassword);

export default router;  