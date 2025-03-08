import { FaEdit, FaTrash } from "react-icons/fa";

const CategoriaList = ({ categories, onDelete, onEdit }) => {
    return (
        <div className="border p-4 rounded-lg bg-white shadow-md">
            <div className="grid grid-cols-2 font-bold border-b pb-4 text-gray-700 bg-blue-100 p-2 rounded-md">
                <span>Categoría</span>
                <span className="text-center">Acciones</span>
            </div>

            <ul>
                {categories.map((category) => (
                    <li key={category._id} className="grid grid-cols-2 items-center py-4 border-b">
                        <h2 className="font-semibold">{category.name}</h2>

                        <div className="flex justify-center gap-4">
                            <FaEdit
                                className="text-yellow-500 cursor-pointer hover:text-yellow-600 text-lg"
                                onClick={() => onEdit(category)}
                            />
                            <FaTrash
                                className="text-red-500 cursor-pointer hover:text-red-600 text-lg"
                                onClick={() => onDelete(category._id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriaList;
