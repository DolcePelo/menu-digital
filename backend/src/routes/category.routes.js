import { Router } from "express";
import { getCategory, getCategoryById, saveCategory, deleteCategory, updateCategory, addProductToCategory } from "../controllers/category.controller.js";

const router = Router();

router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.post('/', saveCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);
router.put('/:categoryId/product/:productId', addProductToCategory); // tal vez no sea necesario ya que se puede agregar el campo de category en el body del producto


export default router;