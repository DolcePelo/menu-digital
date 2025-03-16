import { useState, useEffect } from "react";
import { getMenus } from "../../api/menuApi.js";

const Dashboard = ({ setCommercialPremises }) => {
    const [inputValue, setInputValue] = useState("");
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(""); 

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await getMenus();
                setMenus(response.data);
            } catch (error) {
                console.error("Error fetching menus", error);
            }
        };
        fetchMenus();
    }, []); 

    const handlePublishCommerce = () => {
        console.log("Publicando comercio:", inputValue);
        setCommercialPremises(inputValue);
        setInputValue("");
    };

    const handlePublishMenu = () => {
        if (!selectedMenu) {
            console.log("No se ha seleccionado un menú.");
            return;
        }
        console.log("Publicando menú con ID:", selectedMenu);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Inicio</h1>

            <div className="flex flex-col gap-2 mb-4 input-group">
                <input
                    type="text"
                    placeholder="Nombre del comercio"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handlePublishCommerce}
                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all"
                >
                    Publicar Comercio
                </button>
            </div>

            <div className="flex flex-col !gap-2 input-group">
                <label className="block text-gray-600 text-sm font-medium">
                    Selecciona un Menú:
                </label>
                <select
                    className="!w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedMenu}
                    onChange={(e) => setSelectedMenu(e.target.value)}
                >
                    <option value="" disabled>Elige un menú</option>
                    {menus.map((menu) => (
                        <option key={menu._id} value={menu._id}>
                            {menu.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handlePublishMenu}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
                >
                    Publicar Menú
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
