import { useState, useEffect } from "react";
import { getCategories } from "../../../api/categoryApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MenuModal = ({ isOpen, onClose, onAssignCategory, menu }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                const availableCategories = response.data.filter(
                    (category) => !menu.categories.some((assignedCategory) => assignedCategory._id === category._id)
                );
                setCategories(availableCategories);
            } catch (error) {
                console.error("Error obteniendo categorías para agregar a productos", error);
            }
        };

        if (isOpen) {
            fetchCategories();
            setSelectedCategory([]); 
        }
    }, [isOpen, menu]); 

    const handleCheckboxChange = (categoryId) => {
        setSelectedCategory(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId) 
                : [...prev, categoryId] 
        );
    };

    const handleAssign = async () => {
        if (selectedCategory.length === 0) return alert("Seleccionar al menos una categoría");

        try {
            await Promise.all(selectedCategory.map((categoryId) => onAssignCategory(menu._id, categoryId)));

            MySwal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Categoría asignada",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                customClass: {
                    popup: "swal2-toast",
                },
            });

            onClose();
        } catch (error) {
            MySwal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Error al asignar",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Asignar Categorías</h2>

                <div className="mb-4 max-h-40 overflow-y-auto border p-2 rounded">
                    {categories.length === 0 ? (
                        <p>No hay categorías disponibles para asignar</p>
                    ) : (
                        categories.map((category) => (
                            <label key={category._id} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    value={category._id}
                                    checked={selectedCategory.includes(category._id)}
                                    onChange={() => handleCheckboxChange(category._id)}
                                />
                                {category.name}
                            </label>
                        ))
                    )}
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
    );
};

export default MenuModal;
