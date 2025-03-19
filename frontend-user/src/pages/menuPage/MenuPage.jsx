import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuById } from "../../api/menuApi.js";

const MenuPage = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const menuData = await getMenuById(id);
                setMenu(menuData.data);
            } catch (error) {
                setError("Error al cargar el menú");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [id]);

    if (loading) return <p className="text-center text-gray-400">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!menu) return <p className="text-center text-gray-400">No se encontró el menú</p>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#1a1c20] via-[#222831] to-[#31363f] text-white p-8">
            <div className="max-w-6xl mx-auto bg-[#2e323a] shadow-2xl rounded-2xl p-12 border border-[#b49e74]">
                {/* Título del Menú */}
                <h1 className="text-5xl font-extrabold text-[#f8f8f2] tracking-wide">{menu.name}</h1>
                <p className="text-lg text-gray-400 mt-3">{menu.description}</p>

                {/* Contenedor de Categorías */}
                <div className="mt-8">
                    <h2 className="text-3xl font-semibold text-[#e8e6e3] mb-6 border-b-[2px] border-[#b49e74] pb-3">Categorías</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menu?.categories?.map((category) => (
                            <div key={category._id} className="p-8 border rounded-xl bg-gradient-to-br from-[#3b3f45] to-[#282c34] shadow-lg border-[#b49e74] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                                <h3 className="text-2xl font-semibold text-[#f8f8f2] mb-4">{category.name}</h3>

                                {category.products && category.products.length > 0 ? (
                                    <ul className="space-y-3">
                                        {category.products.map((product, index) => (
                                            <li 
                                                key={`${product._id}-${index}`} 
                                                className="bg-[#41454d] p-4 rounded-lg shadow text-gray-300 border-l-4 border-[#b49e74] transition-all duration-200 hover:bg-[#535860]"
                                            >
                                                {product.name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 mt-2 italic">No hay productos en esta categoría</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
