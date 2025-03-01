import productModel from '../models/product.model.js';
import categoryModel from '../models/category.models.js';
import logger from '../../config/logger.js';

export default class Product {
    constructor() {
        console.log("Working product with database MongoDB")
    }

    getProducts = async () => {
        try {
            const product = await productModel.find();
            return product;
        } catch (error) {
            logger("error al obtener los productos", error)
        }
    }

    getProductById = async (id) => {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            logger("error al obtener el producto por id", error);
        }
    }

    saveProduct = async (product) => {
        try {
            let newProduct = new productModel(product);
            let result = await newProduct.save();
            return result;
        } catch (error) {
            logger("error al crear el producto", error);
        }
    }

    deleteProduct = async (id) => {
        try {
            let product = await productModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            logger("error al eliminar el producto", error);
        }
    }

    updateProduct = async (id, product) => {
        try {
            let productUpdated = await productModel.findByIdAndUpdate(id, product, { new: true });
            return productUpdated;
        } catch (error) {
            logger("error al actualizar el producto", error);
        }
    }

    addProductToCategory = async (productId, categoryId) => {
        try {
            let product = await productModel.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            console.log("product", product);
            let category = await categoryModel.findById(categoryId);
            if (!category) {
                throw new Error("Category not found");
            }
            console.log("category", category);
            category.products.push(product);
            let result = await category.save();
            console.log("result", result);
            return result;
        } catch (error) {
            logger("error al agregar el producto a la categoria", error);
        }
    }
}