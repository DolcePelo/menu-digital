import { useState, useEffect, useRef } from "react";
import { getMenus } from "../../api/menuApi.js";
import { QRCodeCanvas } from "qrcode.react";

const Dashboard = ({ setCommercialPremises }) => {
    const [inputValue, setInputValue] = useState("");
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("");
    const qrRef = useRef(null);

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

    const menuUrl = selectedMenu ? `http://localhost:5173/menu/${selectedMenu}` : "";

    // Función para descargar el QR como imagen
    const handleDownloadQR = () => {
        if (qrRef.current) {
            const canvas = qrRef.current.querySelector("canvas");
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;
            link.download = `QR_Menu_${selectedMenu}.png`;
            link.click();
        }
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

            {selectedMenu && (
                <div className="mt-6 text-center flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">Código QR del Menú</h2>
                    {console.log("QR generado con URL:", menuUrl)}

                    <div ref={qrRef} className="inline-block p-2 bg-white shadow-md rounded-lg">
                        <QRCodeCanvas value={menuUrl} size={200} />
                    </div>

                    <button
                        onClick={handleDownloadQR}
                        className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
                    >
                        Descargar QR
                    </button>
                </div>

            )}
        </div>
    );
};

export default Dashboard;
