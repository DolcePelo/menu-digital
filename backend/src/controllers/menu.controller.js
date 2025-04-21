import menuService from '../dao/dbManager/menu.dao.js';
import logger from '../config/logger.js';

const menu = new menuService();

const getMenus = async (req, res) => {
    try {
        const menuList = await menu.getMenus();
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
    const { user, name, description, categoryId } = req.body;
    try {
        const response = await menu.saveMenu({ user, name, description, categoryId });
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

const updateMenuCustomization = async (req, res) => {
    const { id } = req.params;
    const { businessName, style } = req.body;
    const logo = req.files?.logo?.[0]?.filename;
    const banner = req.files?.banner?.[0]?.filename;

    try {
        const customizationData = {
            businessName,
            style: JSON.parse(style),
        };

        if (logo) customizationData.logo = `/uploads/${logo}`;
        if (banner) customizationData.banner = `/uploads/${banner}`;

        const response = await menu.updateMenuCustomization(id, customizationData);

        if (!response) {
            return res.status(404).json({ message: "Menú no encontrado" });
        }

        res.json({
            status: 200,
            message: "Personalización del menú actualizada con éxito",
            data: response
        });
        console.log("Logo guardado en:", req.files?.logo?.[0]?.path);
        console.log("Banner guardado en:", req.files?.banner?.[0]?.path);


    } catch (error) {
        logger.error("error al actualizar la personalizacion del menu", error);
        res.status(500).json({ message: "Error al actualizar la personalización del menú" });
    }
}

const addCategoryToMenu = async (req, res) => {
    try {
        const { menuId, categoryId } = req.params;
        const response = await menu.addCategoryToMenu(menuId, categoryId);

        if (!response) {
            return res.status(404).json({ status: 404, message: "Category not found" });
        }
        res.json({
            status: 200,
            message: "Category added to menu successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al agregar la categoria al menu", error);
    }
}

const deleteCategoryFromMenu = async (req, res) => {
    try {
        const { menuId, categoryId } = req.params;
        const response = await menu.deleteCategoryFromMenu(menuId, categoryId);
        res.json({
            status: 200,
            message: "Category deleted from menu successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al eliminar la categoria del menu", error);
    }
}

export {
    getMenus,
    getMenuById,
    saveMenu,
    deleteMenu,
    updateMenu,
    addCategoryToMenu,
    deleteCategoryFromMenu,
    updateMenuCustomization,
}