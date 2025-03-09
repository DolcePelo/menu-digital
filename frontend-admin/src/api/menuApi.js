import api from "./axiosConfig.js";

const getMenus = async () => {
    try {
        const response = await api.get('/api/menus');
        return response.data;
    } catch (error) {
        console.error("Error al obtener menús:", error);
        throw new Error(error.response?.data?.message || "No se pudieron cargar los menús.");
    }
}

const getMenuById = async (id) => {
    try {
        const response = await api.get(`/api/menus/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el menú por id:", error);
        throw new Error(error.response?.data?.message || "No se pudo cargar el menú.");
    }
}

const saveMenu = async (menu) => {
    try {
        const response = await api.post("/api/menus", menu);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el menú:", error);
        throw new Error(error.response?.data?.message || "No se pudo guardar el menú.");
    }
}

const deleteMenu = async (id) => {
    try {
        const response = await api.delete(`/api/menus/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el menú:", error);
        throw new Error(error.response?.data?.message || "No se pudo eliminar el menú.");
    }
}

const updateMenu = async (id, menu) => {
    try {
        const response = await api.put(`/api/menus/${id}`, menu);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el menú:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar el menú.");
    }
}

const addCategoryToMenu = async (menuId, categoryId) => {
    try {
        const response = await api.put(`/api/menus/${menuId}/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error al agregar categoría al menú:", error);
    }
}

const deleteCategoryFromMenu = async (menuId, categoryId) => {
    try {
        const response = await api.delete(`/api/menus/${menuId}/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar categoría del menú:", error);
    }
}

export { getMenus, getMenuById, saveMenu, deleteMenu, updateMenu, addCategoryToMenu, deleteCategoryFromMenu };