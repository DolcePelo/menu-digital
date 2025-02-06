import categoryModel from '../models/category.models.js';
import productModel from '../models/product.model.js';
import logger from '../../config/logger.js';

export default class Category {
    constructor() {
        console.log("Working category with database MongoDB")
    }

    getCategory = async () => {
        try {
            const category = await categoryModel.find();
            return category;
        } catch (error) {
            logger.error("error al obtener las categorias", error);
        }
    }

    getCategoryById = async (id) => {
        try {
            const category = await categoryModel.findById(id);
            return category;
        } catch (error) {
            logger.error("error al obtener la categoria por id", error);
        }
    }

    saveCategory = async (category) => {
        try {
            let newCategory = new categoryModel(category);
            let result = await newCategory.save();
            return result;
        } catch (error) {
            logger.error("error al guardar la categoria", error);
        }
    }

    deteletCategory = async (id) => {
        try {
            let category = await categoryModel.findByIdAndDelete(id);
            return category;
        } catch (error) {
            logger.error("error al eliminar la categoria", error);
        }
    }

    updateCategory = async (id, category) => {
        try {
            let categoryUpdated = await categoryModel.findByIdAndUpdate(id, category, { new: true });
            return categoryUpdated;
        } catch (error) {
            logger.error("error al actualizar la categoria", error);
        }
    }

    addProductToCategory = async (categoryId, productId) => {
        try {
            let category = await categoryModel.findById(categoryId);
            if (!category) {
                throw new Error("Category not found");
            }

            let product = await productModel.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }

            product.category = categoryId;
            let result = await product.save();
            return result;
        } catch (error) {
            logger.error("error al agregar producto a la categoria", error);
        }
    }
} 