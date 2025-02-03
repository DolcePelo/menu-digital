import mongoose from "mongoose";

const categoryCollection = "category";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Category = mongoose.model(categoryCollection, CategorySchema);

export default Category;