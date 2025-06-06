import mongoose from "mongoose";

const productCollection = "product";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const Product = mongoose.model(productCollection, ProductSchema);

export default Product;