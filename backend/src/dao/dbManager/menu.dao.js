import menuModel from '../models/menu.model.js';
import logger from '../../config/logger.js';

export default class Menu {
    constructor() {
        console.log("Working Menu with database mongodb")
    }

    getMenus = async () => {
        try {
            const menu = await menuModel.find();
            return menu;
        } catch (error) {
            logger("error al obtener los menues", error)
        }
    }

    getMenuById = async (id) => {
        try {
            const menu = await menuModel.findById(id);
            return menu;
        } catch (error) {
            logger("error al obtener el menu por id", error);
        }
    }

    saveMenu = async (menu) => {
        try {
            let newMenu = new menuModel(menu);
            let result = await newMenu.save();
            return result;
        } catch (error) {
            logger("error al crear el menu", error);
        }
    }

    deleteMenu =async (id) => {
        try {
            let menu = await menuModel.findByIdAndDelete(id);
            return menu;
        } catch (error) {
            logger("error al eliminar el menu", error);
        }
    }

    updateMenu = async (id, menu) => {
        try {
            let menuUpdated = await menuModel.findByIdAndUpdate(id, menu, { new: true });
            return menuUpdated;
        } catch (error) {
            logger("error al actualizar el menu", error);
        }
    }
}