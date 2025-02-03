import mongoose from "mongoose";

const productCollection = "product";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
});

const Product = mongoose.model(productCollection, ProductSchema);

export default Product;