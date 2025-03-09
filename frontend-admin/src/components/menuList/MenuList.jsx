import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const MenuList = ({ menus, onDelete, onEdit, onOpenMenuModal }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.length === 0 ? (
                <p className="text-gray-500 text-center col-span-full">No hay menús disponibles.</p>
            ) : (
                menus.map((menu) => (
                    <div key={menu._id} className="bg-white shadow-md rounded-lg p-4 border flex flex-col h-full">
                        <h2 className="text-lg font-bold text-gray-800">{menu.name}</h2>
                        <p className="text-gray-600">{menu.description || "Sin descripción"}</p>

                        {/* Listado de categorías */}
                        <div className="mt-2 flex-1">
                            <h3 className="text-sm font-semibold">Categorías:</h3>
                            <ul className="text-md text-gray-700">
                                {menu.categories && menu.categories.length > 0 ? (
                                    menu.categories.map((category, index) => (
                                        <li key={category._id || `category-${index}`} className="text-blue-500">
                                            {category.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400">Sin categorías</li>
                                )}
                            </ul>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <button
                                className="text-yellow-500 hover:text-yellow-600"
                                onClick={() => onEdit(menu)}
                            >
                                <FaEdit className="text-lg" />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600"
                                onClick={() => onDelete(menu._id)}
                            >
                                <FaTrash className="text-lg" />
                            </button>
                            <button
                                className="text-green-500 hover:text-green-600"
                                onClick={() => onOpenMenuModal(menu)} 
                            >
                                <FaPlus className="text-lg"/>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MenuList;
