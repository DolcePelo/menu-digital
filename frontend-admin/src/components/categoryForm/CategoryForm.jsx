import { useState, useEffect } from "react";

const CategoryForm = ({ onSave, selectedCategory }) => {
    const [category, setCategory] = useState({ name: '', description: '' });

    useEffect(() => {
        if (selectedCategory) {
            setCategory({ name: selectedCategory.name, description: selectedCategory.description });
        } else {
            setCategory({ name: '', description: '' });
        }
    }, [selectedCategory]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(category);
        setCategory({ name: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Nombre de la categoría"
                className="border p-2 mr-2"
                required
            />
            <input
                type="text"
                name="description"
                value={category.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {selectedCategory ? "Actualizar" : "Agregar"}
            </button>
        </form>
    );
};

export default CategoryForm;

