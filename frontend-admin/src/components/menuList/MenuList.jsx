import { FaEdit, FaTrash } from "react-icons/fa";

const MenuList = ({ menus, onDelete, onEdit }) => {
    return (
        <div className="border p-6 rounded-lg bg-white shadow-md">
            <div className="grid grid-cols-2 font-bold border-b pb-2 text-gray-700 bg-blue-100 p-2 rounded-md">
                <span>Menú</span>
                <span className="text-center">Acciones</span>
            </div>

            <ul>
                {menus.map((menu) => (
                    <li key={menu._id} className="grid grid-cols-2 items-center py-2 border-b">
                        <h2 className="font-semibold">{menu.name}</h2>

                        <div className="flex justify-center gap-4">
                            <FaEdit
                                className="text-yellow-500 cursor-pointer hover:text-yellow-600 text-lg"
                                onClick={() => onEdit(menu)}
                            />
                            <FaTrash
                                className="text-red-500 cursor-pointer hover:text-red-600 text-lg"
                                onClick={() => onDelete(menu._id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuList;
