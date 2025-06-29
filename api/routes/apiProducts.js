import express from 'express';
import upload from '../../lib/uploadConfig.js';
import {
  listProducts,
  getOneProduct,
  addNewProduct,
} from '../apiProductController.js';

const router = express.Router();

router.get('/products', listProducts);
router.get('/products/:productId', getOneProduct);

router.post('/products', upload.single('image'), addNewProduct);

export default router;
