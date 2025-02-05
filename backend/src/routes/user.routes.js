import { Router } from "express";
import { getUser, getUserById, saveUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/', getUser);
router.get('/:id', getUserById);
router.post('/', saveUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


export default router;