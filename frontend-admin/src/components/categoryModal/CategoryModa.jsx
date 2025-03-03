import { useState, useEffect } from "react";
import { getCategories } from "../../api/categoryApi";

const CategoryModal = ({ isOpen, onClose, onAssignCategory, product }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("error obteniendo categorias para agregar a productos", error);
            }
        };
        if (isOpen) fetchCategories();
    }, [isOpen]);

    const handleAssign = async () => {
        if (!selectedCategory) return alert("Seleccionar una categoria");

        await onAssignCategory(product._id, selectedCategory);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Asignar Categoría</h2>

                <select
                    className="w-full p-2 border rounded mb-4"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">Cancelar</button>
                    <button onClick={handleAssign} className="px-4 py-2 bg-blue-500 rounded text-white">Asignar</button>
                </div>
            </div>
        </div>
    )
};

export default CategoryModal;