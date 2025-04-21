import { Router } from 'express';
import { getMenus, getMenuById, saveMenu, deleteMenu, updateMenu, addCategoryToMenu, deleteCategoryFromMenu, updateMenuCustomization } from '../controllers/menu.controller.js';
import upload from '../config/multerConfig.js';

const router = Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', saveMenu);
router.delete('/:id', deleteMenu);
router.put('/:id', updateMenu);
router.put('/:menuId/category/:categoryId', addCategoryToMenu);
router.delete('/:menuId/category/:categoryId', deleteCategoryFromMenu);
router.put('/:id/customization',
    upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 },
    ]),
    updateMenuCustomization);

export default router;