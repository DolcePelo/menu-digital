import userService from '../dao/dbManager/user.dao.js';
import logger from '../config/logger.js';

const user = new userService();

const getUsers = async (req, res) => {
    try {
        const userList = await user.getUsers();
        res.json({
            status: 200,
            message: "User List fetched successfully",
            data: userList
        });
    } catch (error) {
        logger.error("error al obtener los usuarios", error);
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await user.getUserById(id);
        res.json({
            status: 200,
            message: "User by id fetched successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al obtener el usuario por id", error);
    }
}

const saveUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const response = await user.saveUser({ name, email, password, role });
        res.json({
            status: 200,
            message: "User saved successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al guardar el usuario", error);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await user.deleteUser(id);
        res.json({
            status: 200,
            message: "User deleted successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al eliminar el usuario", error);
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    try {
        const response = await user.updateUser(id, { name, email, password, role });
        res.json({
            status: 200,
            message: "User updated successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al actualizar el usuario", error);
    }
}

export {
    getUsers,
    getUserById,
    saveUser,
    deleteUser,
    updateUser
}