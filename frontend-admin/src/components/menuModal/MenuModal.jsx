import { useState, useEffect } from "react";
import { getCategories } from "../../api/categoryApi";

const MenuModal = ({ isOpen, onClose, onAssignCategory, menu }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("error obteniendo categorias para agregar a productos", error);
            }
        };
        if (isOpen) {
            fetchCategories();
            setSelectedCategory([]);
        }
    }, [isOpen]);

    const handleCheckboxChange = (categoryId) => {
        setSelectedCategory(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId) 
                : [...prev, categoryId]
        );
    };

    const handleAssign = async () => {
        if (selectedCategory.length === 0) return alert("Seleccionar al menos una categoria");
        try {
            await Promise.all(selectedCategory.map((categoryId) => onAssignCategory(menu._id, categoryId)));

            alert("Categorías asignadas correctamente");
            onClose();
        } catch (error) {
            console.error("Error al asignar categoría al menú:", error);
        };
    };

    if (!isOpen) return null;
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Asignar Categorías</h2>

                <div className="mb-4 max-h-40 overflow-y-auto border p-2 rounded">
                    {categories.map((category) => (
                        <label key={category._id} className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                value={category._id}
                                checked={selectedCategory.includes(category._id)}
                                onChange={() => handleCheckboxChange(category._id)}
                            />
                            {category.name}
                        </label>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">
                        Cancelar
                    </button>
                    <button onClick={handleAssign} className="px-4 py-2 bg-blue-500 rounded text-white">
                        Asignar
                    </button>
                </div>
            </div>
        </div>
    )
};

export default MenuModal;