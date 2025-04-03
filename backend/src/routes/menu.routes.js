import { Router } from 'express';
import { getMenus, getMenuById, saveMenu, deleteMenu, updateMenu, addCategoryToMenu, deleteCategoryFromMenu, updateMenuCustomization } from '../controllers/menu.controller.js';

const router = Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', saveMenu);
router.delete('/:id', deleteMenu);
router.put('/:id', updateMenu);
router.put('/:menuId/category/:categoryId', addCategoryToMenu);
router.delete('/:menuId/category/:categoryId', deleteCategoryFromMenu);
router.put('/:id/customization', updateMenuCustomization);

export default router;