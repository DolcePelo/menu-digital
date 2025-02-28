const ProductList = ({ products, onDelete, onEdit }) => {
    return (
        <ul className="border p-4">
            {products.map((product) => (
                <li key={product._id} className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2">
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex-1">
                            <h2 className="font-bold">{product.name}</h2>
                            <p>{product.description}</p>
                        </div>
                        <span className="text-green-600 font-bold text-right min-w-[80px]">${product.price}</span>
                    </div>
                    <div>
                        <button onClick={() => onEdit(product)} className="bg-yellow-500 text-white px-4 py-2 w-full !rounded-none">
                            Editar
                        </button>
                        <button onClick={() => onDelete(product._id)} className="bg-red-500 text-white px-4 py-2 w-full !rounded-none">
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;