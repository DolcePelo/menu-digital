const MenuList = ({ menus, onDelete, onEdit }) => {
    return (
        <ul className="border p-4">
            {menus.map((menu) => (
                <li key={menu._id} className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="font-bold">{menu.name}</h2>
                        <p>{menu.description}</p>
                    </div>
                    <div>
                        <button onClick={() => onEdit(menu)} className="bg-yellow-500 text-white p-2 mr-2">
                            Editar
                        </button>
                        <button onClick={() => onDelete(menu._id)} className="bg-red-500 text-white p-2">
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MenuList;
