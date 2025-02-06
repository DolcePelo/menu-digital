import { Router } from 'express';
import { getMenus, getMenuById, saveMenu, deleteMenu, updateMenu, addCategoryToMenu } from '../controllers/menu.controller.js';

const router = Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', saveMenu);
router.delete('/:id', deleteMenu);
router.put('/:id', updateMenu);
router.put('/:menuId/category/:categoryId', addCategoryToMenu);

export default router;