import menuModel from '../models/menu.model.js';
import categoryModel from '../models/category.models.js';
import logger from '../../config/logger.js';

export default class Menu {
    constructor() {
        console.log("Working Menu with database mongodb")
    }

    getMenus = async () => {
        try {
            const menu = await menuModel.find().populate({ path: 'categories', model: categoryModel }).lean();
            return menu;
        } catch (error) {
            logger.error("error al obtener los menues", error)
        }
    }

    getMenuById = async (id) => {
        try {
            const menu = await menuModel.findById(id).populate({ path: 'categories', model: categoryModel }).lean();
            return menu;
        } catch (error) {
            logger.error("error al obtener el menu por id", error);
        }
    }

    saveMenu = async (menu) => {
        try {
            let newMenu = new menuModel(menu);
            let result = await newMenu.save();
            return result;
        } catch (error) {
            logger.error("error al crear el menu", error);
        }
    }

    deleteMenu =async (id) => {
        try {
            let menu = await menuModel.findByIdAndDelete(id);
            return menu;
        } catch (error) {
            logger.error("error al eliminar el menu", error);
        }
    }

    updateMenu = async (id, menu) => {
        try {
            let menuUpdated = await menuModel.findByIdAndUpdate(id, menu, { new: true });
            return menuUpdated;
        } catch (error) {
            logger.error("error al actualizar el menu", error);
        }
    }

    addCategoryToMenu = async (menuId, categoryId) => {
        try {
            let menu = await menuModel.findById(menuId);
            if (!menu) {
                throw new Error("Menu not found");
            }
            let category = await categoryModel.findById(categoryId);
            if (!category) {
                throw new Error("Category not found");
            }
            menu.categories.push(categoryId);
            let result = await menu.save();
            return result;
        } catch (error) {
            logger.error("error al agregar la categoria al menu", error);
        }
    }

    deleteCategoryFromMenu = async (menuId, categoryId) => {
        try {
            let menu = await menuModel.findById(menuId);
            if (!menu) {
                throw new Error("Menu not found");
            }
            let category = await categoryModel.findById(categoryId);
            if (!category) {
                throw new Error("Category not found");
            }
            menu.categories = menu.categories.filter(c => c.toString() !== categoryId);
            let result = await menu.save();
            return result;
        } catch (error) {
            logger.error("error al eliminar la categoria del menu", error);
        }
    }
}