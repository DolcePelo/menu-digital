import mongoose from "mongoose";

const menuCollection = "menu";

const MenuSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories"}],
    businessName: { type: String },
    logo: { type: String },
    banner: { type: String },
    style: {
        backgroundColor: { type: String, default: "#ffffff" },
        textColor: { type: String, default: "#000000" },
    }
});

const Menu = mongoose.model(menuCollection, MenuSchema);

export default Menu;

