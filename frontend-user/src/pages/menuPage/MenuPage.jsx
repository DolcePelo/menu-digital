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
                console.log(menuData.data);
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
                {menu.categories.map((categoryId, index) => (
                    <li key={categoryId}>
                        Categoría {index + 1}: {categoryId}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default MenuPage;