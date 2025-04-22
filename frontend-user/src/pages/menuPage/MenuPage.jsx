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

    const { businessName, logo, banner, style } = menu;
    const backgroundColor = style?.backgroundColor || "#ffffff";
    const textColor = style?.textColor || "#000000";

    const backendUrl = "http://localhost:3000";
    const logoUrl = logo ? `${backendUrl}${logo}` : null;
    const bannerUrl = banner ? `${backendUrl}${banner}` : null;

    return (
        <div
            className="min-h-screen p-6"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div
                className="max-w-6xl mx-auto rounded-xl p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-md"
                style={{ backgroundColor: `${backgroundColor}cc`, color: textColor }}
            >
                {/* LOGO */}
                {logoUrl && (
                    <div className="flex justify-center mb-4">
                        <img src={logoUrl} alt="Logo del comercio" className="h-24 object-contain" />
                    </div>
                )}

                {/* NOMBRE DEL COMERCIO */}
                {businessName && (
                    <h1 className="text-4xl font-bold text-center mb-2">{businessName}</h1>
                )}

                {/* BANNER */}
                {bannerUrl && (
                    <div className="my-6">
                        <img src={bannerUrl} alt="Banner del comercio" className="w-full h-56 object-cover rounded-lg shadow-md" />
                    </div>
                )}

                {/* DESCRIPCIÓN DEL MENÚ */}
                <h2 className="text-2xl font-semibold text-center mb-6">{menu.name}</h2>
                <p className="text-center text-md mb-10">{menu.description}</p>

                {/* CATEGORÍAS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menu?.categories?.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white/20 border border-white/30 backdrop-blur-sm p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                            style={{ color: textColor }}
                        >
                            <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                            {category.products?.length ? (
                                <ul className="space-y-2">
                                    {category.products.map((product, index) => (
                                        <li
                                        key={`${product._id}-${index}`}
                                        className="bg-white/30 rounded px-4 py-2 flex justify-between items-center"
                                        style={{ color: textColor }}
                                    >
                                        <span>{product.name}</span>
                                        <span className="text-sm font-medium opacity-80">${product.price}</span>
                                    </li>
                                    
                                    ))}
                                </ul>
                            ) : (
                                <p className="italic text-sm opacity-70">No hay productos en esta categoría</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
