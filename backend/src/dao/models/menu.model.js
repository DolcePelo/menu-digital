import mongoose from "mongoose";

const menuCollection = "menu";

const MenuSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories"}],
});

const Menu = mongoose.model(menuCollection, MenuSchema);

export default Menu;

