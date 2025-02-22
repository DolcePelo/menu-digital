import api from "./axiosConfig.js";

const getCategories = async () => {
    try {
        const response = await api.get("/api/categories");
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw new Error(error.response?.data?.message || "No se pudieron cargar las categorías.");
    }
};

const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/api/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la categoría por id:", error);
        throw new Error(error.response?.data?.message || "No se pudo cargar la categoría.");
    }
}

const saveCategory = async (category) => {
    try {
        const response = await api.post("/api/categories", category);
        return response.data;
    } catch (error) {
        console.error("Error al guardar la categoría:", error);
        throw new Error(error.response?.data?.message || "No se pudo guardar la categoría.");
    }
}

const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/api/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        throw new Error(error.response?.data?.message || "No se pudo eliminar la categoría.");
    }
}

const updateCategory = async (id, category) => {
    try {
        const response = await api.put(`/api/categories/${id}`, category);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        throw new Error(error.response?.data?.message || "No se pudo actualizar la categoría.");
    }
}

export { getCategories, getCategoryById, saveCategory, deleteCategory, updateCategory };