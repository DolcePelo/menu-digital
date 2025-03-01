import mongoose from "mongoose";

const categoryCollection = "categories";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Category = mongoose.model(categoryCollection, CategorySchema);

export default Category;