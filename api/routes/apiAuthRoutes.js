import express from 'express';
import { loginJWT, registerUser } from '../controllers/apiLoginController.js';

const router = express.Router();

router.post('/login', loginJWT);
router.post('/users', registerUser);

export default router;
