const CategoryList = ({ categories, onDelete, onEdit }) => {
    return (
        <ul className="border p-4">
            {categories.map((category) => (
                <li key={category._id} className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="font-bold">{category.name}</h2>
                        <p>{category.description}</p>
                    </div>
                    <div>
                        <button onClick={() => onEdit(category)} className="bg-yellow-500 text-white p-2 mr-2">
                            Editar
                        </button>
                        <button onClick={() => onDelete(category._id)} className="bg-red-500 text-white p-2">
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CategoryList;