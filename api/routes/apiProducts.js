import express from 'express';
import { listProducts, getOneProduct } from '../apiProductController.js';

const router = express.Router();

//Get
router.get('/products', listProducts);
router.get('/products/:productId', getOneProduct);

export default router;
