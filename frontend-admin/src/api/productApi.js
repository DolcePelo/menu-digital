import api from "./axiosConfig.js";

const getProducts = async () => {
    try {
        const response = await api.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw new Error(error.response?.data?.message || 'No se pudieron cargar los productos.');
    }
}

const getProductById = async (id) => {
    try {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto por id:', error);
        throw new Error(error.response?.data?.message || 'No se pudo cargar el producto.');
    }
}

const saveProduct = async (product) => {
    try {
        const response = await api.post('/api/products', product);
        return response.data;
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw new Error(error.response?.data?.message || 'No se pudo guardar el producto.');
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw new Error(error.response?.data?.message || 'No se pudo eliminar el producto.');
    }
}

const updateProduct = async (id, product) => {
    try {
        const response = await api.put(`/api/products/${id}`, product);
        console.log("response: ", response)
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw new Error(error.response?.data?.message || 'No se pudo actualizar el producto.');
    }
}

const addProductToCategory = async (productId, categoryId) => {
    try {
        const response = await api.put(`/api/products/${productId}/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error al agregar el producto a la categoría:', error);
        throw new Error(error.response?.data?.message || 'No se pudo agregar el producto a la categoria');
    }
}

export { getProducts, getProductById, saveProduct, deleteProduct, updateProduct, addProductToCategory };