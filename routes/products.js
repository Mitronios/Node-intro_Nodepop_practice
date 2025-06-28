import express from 'express';
import * as productsController from '../controllers/productsController.js';
import { guard } from '../lib/sessionManager.js';
import upload from '../lib/uploadConfig.js';

const router = express.Router();

//Get
router.get('/add', guard, productsController.index);

//Post
router.post(
  '/add',
  guard,
  upload.single('productImage'),
  productsController.postNewProduct,
);

//Delete]
router.post(
  '/product/delete/:productId',
  guard,
  productsController.deleteProduct,
);

export default router;
