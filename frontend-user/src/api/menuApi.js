import api from "./axiosConfig.js";

const getMenuById = async (id) => {
    try {
        const response = await api.get(`/api/menus/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el menú por id:", error);
        throw new Error(error.response?.data?.message || "No se pudo cargar el menú.");
    }
}

export { getMenuById };