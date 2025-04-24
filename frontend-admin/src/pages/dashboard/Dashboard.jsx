import { useState, useEffect, useRef } from "react";
import { getMenus } from "../../api/menuApi.js";
import { QRCodeCanvas } from "qrcode.react";
import MenuCustomizer from "../../components/menu/menuCustomizer/MenuCustomizer.jsx";

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
        console.log("URL del menú:", menuUrl);
    };

    const menuUrl = selectedMenu ? `https://menu-digital-six.vercel.app/menu/${selectedMenu}` : "";

    const handleDownloadQR = () => {
        if (qrRef.current) {
            const canvas = qrRef.current.querySelector("canvas");
            const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "menu-qr.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8 gap-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nombre del comercio"
                    className="border border-gray-300 rounded-md px-4 py-2"
                />
                <button
                    onClick={handlePublishCommerce}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
                >
                    Publicar Comercio
                </button>

                <select
                    value={selectedMenu}
                    onChange={(e) => setSelectedMenu(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2"
                >
                    <option value="">Selecciona un menú</option>
                    {menus.map((menu) => (
                        <option key={menu._id} value={menu._id}>
                            {menu.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handlePublishMenu}
                    className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition"
                >
                    Publicar Menú
                </button>

                {selectedMenu && (
                    <div className="text-center">
                        <p className="mb-2 text-sm text-gray-600">URL del Menú:</p>
                        <a href={menuUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm">
                            {menuUrl}
                        </a>
                    </div>
                )}
            </div>

            <div className="flex flex-row items-start gap-8">
                <MenuCustomizer menuId={selectedMenu} />

                {selectedMenu && (
                    <div className="flex flex-col items-center" ref={qrRef}>
                        <QRCodeCanvas value={menuUrl} size={180} />
                        <button
                            onClick={handleDownloadQR}
                            className="mt-4 bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-600 transition"
                        >
                            Descargar QR
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Dashboard;
