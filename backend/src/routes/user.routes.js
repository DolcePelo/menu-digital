import { Router } from "express";
import { getUsers, getUserById, saveUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', saveUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


export default router;