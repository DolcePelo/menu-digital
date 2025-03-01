import { Router } from "express";
import { getCategory, getCategoryById, saveCategory, deleteCategory, updateCategory, addCategoryToMenu } from "../controllers/category.controller.js";

const router = Router();

router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.post('/', saveCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);
router.put('/:categoryId/menu/:menuId', addCategoryToMenu); 

export default router;