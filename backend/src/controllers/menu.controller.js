import menuService from '../dao/dbManager/menu.dao.js';
import logger from '../config/logger.js';

const menu = new menuService();

const getMenu = async (req, res) => {
    try {
        const menuList = await menu.getMenu();
        res.json({
            status: 200,
            message: "Menu List fetched successfully",
            data: menuList
        });
    } catch (error) {
        logger.error("error al obtener el menu", error);
    }
}

const getMenuById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await menu.getMenuById(id);
        res.json({
            status: 200,
            message: "Menu by id fetched successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al obtener el menu por id", error);
    }
}

const saveMenu = async (req, res) => {
    const { name, description, price, categoryId } = req.body;
    try {
        const response = await menu.saveMenu({ name, description, price, categoryId });
        res.json({
            status: 200,
            message: "Menu saved successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al guardar el menu", error);
    }
}

const deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await menu.deleteMenu(id);
        res.json({
            status: 200,
            message: "Menu deleted successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al eliminar el menu", error);
    }
}

const updateMenu = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;
    try {
        const response = await menu.updateMenu(id, { name, description, price, categoryId });
        res.json({
            status: 200,
            message: "Menu updated successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al actualizar el menu", error);
    }
}

export {
    getMenu,
    getMenuById,
    saveMenu,
    deleteMenu,
    updateMenu
}