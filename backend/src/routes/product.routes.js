import { Router } from 'express';
import { saveProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

