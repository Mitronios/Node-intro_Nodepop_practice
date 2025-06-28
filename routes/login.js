import express from 'express';
import * as loginController from '../controllers/loginController.js';

const router = express.Router();

//Get
router.get('/', loginController.index);

//Post
router.post('/', loginController.postLogin);

//logout
router.get('/logout', loginController.logOut);

export default router;
