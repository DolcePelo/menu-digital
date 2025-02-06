import mongoose from "mongoose";

const categoryCollection = "categories";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Category = mongoose.model(categoryCollection, CategorySchema);

export default Category;