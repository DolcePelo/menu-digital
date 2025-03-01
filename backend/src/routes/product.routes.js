import { Router } from 'express';
import { saveProduct, getProducts, getProductById, updateProduct, deleteProduct, addProductToCategory } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/:productId/category/:categoryId', addProductToCategory);

export default router;

