import productService from '../dao/dbManager/product.dao.js';
import logger from '../config/logger.js';

const product = new productService();

const getProduct = async (req, res) => {
    try {
        const productList = await product.getProduct();
        res.json({
            status: 200,
            message: "Product List fetched successfully",
            data: productList
        });
    } catch (error) {
        logger.error("error al obtener los productos", error);
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await product.getProductById(id);
        res.json({
            status: 200,
            message: "Product by id fetched successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al obtener el producto por id", error);
    }
}

const saveProduct = async (req, res) => {
    const { name, price, categoryId } = req.body;
    try {
        const response = await product.saveProduct({ name, price, categoryId });
        res.json({
            status: 200,
            message: "Product saved successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al guardar el producto", error);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await product.deleteProduct(id);
        res.json({
            status: 200,
            message: "Product deleted successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al eliminar el producto", error);
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    try {
        const response = await product.updateProduct(id, { name, price, categoryId });
        res.json({
            status: 200,
            message: "Product updated successfully",
            data: response
        });
    } catch (error) {
        logger.error("error al actualizar el producto", error);
    }
}

export default {
    getProduct,
    getProductById,
    saveProduct,
    deleteProduct,
    updateProduct
};