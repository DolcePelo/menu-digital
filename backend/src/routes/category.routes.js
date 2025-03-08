import { Router } from "express";
import { getCategory, getCategoryById, saveCategory, deleteCategory, updateCategory} from "../controllers/category.controller.js";

const router = Router();

router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.post('/', saveCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

export default router;