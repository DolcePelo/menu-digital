import { FaEdit, FaTrash, FaTag } from "react-icons/fa";

const ProductList = ({ products, onDelete, onEdit, onOpenCategoryModal }) => {
    return (
        <div className="border p-6 rounded-lg bg-white shadow-md">
            {/* Encabezados de la tabla */}
            <div className="grid grid-cols-4 font-bold border-b pb-4 text-gray-700 bg-gray-100 p-2 rounded-t-lg">
                <span>Producto</span>
                <span>Precio</span>
                <span>Categoría</span>
                <span className="text-center">Acciones</span>
            </div>

            <ul>
                {products.map((product) => (
                    <li key={product._id} className="grid grid-cols-4 items-center py-4 border-b">
                        {/* Nombre y descripción del producto */}
                        <div className="py-4">
                            <h2 className="font-semibold">{product.name}</h2>
                            <p className="text-sm text-gray-500">{product.description}</p>
                        </div>

                        {/* Precio */}
                        <span className="text-green-600 font-bold">${product.price}</span>

                        {/* Categoría */}
                        <div className="flex items-center gap-2">
                            {product.category ? (
                                <span className="text-blue-600 font-medium">{product.category.name}</span>
                            ) : (
                                <span className="text-red-500 font-medium flex items-center gap-1">⚠️ Sin categoría</span>
                            )}
                            
                        </div>

                        {/* Acciones con iconos */}
                        <div className="flex justify-center gap-6">
                            <FaEdit
                                className="text-yellow-500 cursor-pointer hover:text-yellow-600 text-xl"
                                onClick={() => onEdit(product)}
                            />
                            <FaTrash
                                className="text-red-500 cursor-pointer hover:text-red-600 text-xl"
                                onClick={() => onDelete(product._id)}
                            />
                            <FaTag
                                className="text-gray-500 cursor-pointer hover:text-gray-700 text-lg"
                                onClick={() => onOpenCategoryModal(product)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
