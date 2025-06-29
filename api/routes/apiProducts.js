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
import { guard } from '../../middlewares/jwtAuthMiddleware.js';

const router = express.Router();

router.post('/login', loginJWT);

router.get('/products', guard, listProducts);
router.get('/products/:productId', guard, getOneProduct);

router.post('/products', guard, upload.single('image'), addNewProduct);

router.put(
  '/products/:productId',
  guard,
  upload.single('image'),
  updateProduct,
);

router.delete('/products/:productId', guard, deleteProduct);

export default router;
