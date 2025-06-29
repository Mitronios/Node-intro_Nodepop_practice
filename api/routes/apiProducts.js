import express from 'express';
import upload from '../../lib/uploadConfig.js';
import {
  listProducts,
  getOneProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/apiProductController.js';
import { loginJWT } from '../controllers/apiLoginController.js';

const router = express.Router();

router.post('/login', loginJWT);

router.get('/products', listProducts);
router.get('/products/:productId', getOneProduct);

router.post('/products', upload.single('image'), addNewProduct);

router.put('/products/:productId', upload.single('image'), updateProduct);

router.delete('/products/:productId', deleteProduct);

export default router;
