import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;

