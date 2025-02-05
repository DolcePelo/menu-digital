import { Router } from 'express';
import { getMenu, getMenuById, saveMenu, deleteMenu, updateMenu } from '../controllers/menu.controller.js';

const router = Router();

router.get('/', getMenu);
router.get('/:id', getMenuById);
router.post('/', saveMenu);
router.delete('/:id', deleteMenu);
router.put('/:id', updateMenu);

export default router;