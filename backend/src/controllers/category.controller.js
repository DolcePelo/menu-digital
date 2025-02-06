import categoryService from '../dao/dbManager/category.dao.js';
import logger from '../config/logger.js';

const category = new categoryService();

const getCategory = async (req, res) => {
    try {
        const categoryList = await category.getCategory();
        res.json({
            status: 200,
            message: "Category List fetched successfully",
            data: categoryList
        });
    } catch (error) {
        logger.error("error al obtener las categorias", error);
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await category.getCategoryById(id);
        res.json({
            status: 200,
            message: "Category by id fetched successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al obtener la categoria por id", error);
    }
}

const saveCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await category.saveCategory({ name });
        res.json({
            status: 200,
            message: "Category saved successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al guardar la categoria", error);
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await category.deteletCategory(id);
        res.json({
            status: 200,
            message: "Category deleted successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al eliminar la categoria", error);
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const response = await category.updateCategory(id, { name });
        res.json({
            status: 200,
            message: "Category updated successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al actualizar la categoria", error);
    }
}

const addProductToCategory = async (req, res) => {
    try {
        const { categoryId, productId } = req.params;

        const result = category.addProductToCategory(categoryId, productId);
        if (!result) {
            res.json({
                status: 400,
                message: "Error al agregar producto a la categoria",
            })
        }

        res.json({
            status: 200,
            message: "Producto agregado a la categoria",
            data: result
        });
    } catch (error) {
        logger.error("error al agregar producto a la categoria", error);
    }
}

export { getCategory, getCategoryById, saveCategory, deleteCategory, updateCategory, addProductToCategory };