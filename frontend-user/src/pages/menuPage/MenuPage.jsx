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
                setError("error al cargar el menú", error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchMenu();
    }, [id]);

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error: {error}</p>
    if (!menu) return <p>No se encontró el menú</p>;

    return (
        <div>
            <h1>{menu.name}</h1>
            <p>{menu.description}</p>
            <h2>Categorías</h2>
            <ul>
                {menu?.categories?.map((category, index) => (
                    <li key={category._id}>
                        <h2>Categoría {index + 1}: {category.name}</h2>

                        {/* Iteramos sobre los productos de cada categoría */}
                        {category.products && Array.isArray(category.products) && category.products.length > 0 ? (
                            <ul>
                                {category.products.map((product, index) => (
                                    <li key={`${product._id}-${index}`}>
                                        <h3>Producto {index + 1}: {product.name}</h3>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay productos en esta categoría</p>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    )
};

export default MenuPage;