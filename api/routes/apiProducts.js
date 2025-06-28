import express from 'express';
import { listProducts } from '../apiProductController.js';

const router = express.Router();

//Get
router.get('/products', listProducts);

export default router;
