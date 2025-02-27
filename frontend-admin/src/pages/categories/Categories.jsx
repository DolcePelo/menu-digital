import { useState, useEffect } from "react";
import { getCategories, saveCategory, deleteCategory, updateCategory } from "../../api/categoryApi.js";
import CategoryForm from "../../components/categoryForm/CategoryForm.jsx";
import CategoryList from "../../components/categoryList/CategoryList.jsx";


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSaveCategory = async (category) => {
        try {
            if (selectedCategory) {
                await updateCategory(selectedCategory._id, category);
            } else {
                await saveCategory(category);
            }

            fetchCategories();
            setSelectedCategory(null);
        } catch (error) {
            console.error("Error al guardar la categoría", error);
        };
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (error) {
            console.error("Error al eliminar la categoría", error);
        }
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
    };
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Categorias</h1>
            <CategoryForm onSave={handleSaveCategory} selectedCategory={selectedCategory} />
            <CategoryList categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />
        </div>
    );
};

export default Categories;
