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

    const menuUrl = selectedMenu ? `http://localhost:5174/menu/${selectedMenu}` : "";

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
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div>
                <h2>Selecciona un menú</h2>
                <select value={selectedMenu} onChange={(e) => setSelectedMenu(e.target.value)}>
                    <option value="">-- Selecciona un menú --</option>
                    {menus.map((menu) => (
                        <option key={menu._id} value={menu._id}>
                            {menu.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedMenu && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Personalizar Menú</h2>
                    <MenuCustomizer menuId={selectedMenu} />
                </div>
            )}

            <div style={{ marginTop: "20px" }}>
                <h2>Publicar Comercio</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nombre del comercio"
                />
                <button onClick={handlePublishCommerce}>Publicar Comercio</button>
            </div>

            {selectedMenu && (
                <div style={{ marginTop: "20px" }}>
                    <h2>QR del Menú</h2>
                    <div ref={qrRef}>
                        <QRCodeCanvas value={menuUrl} size={256} />
                    </div>
                    <button onClick={handleDownloadQR}>Descargar QR</button>
                    <button onClick={handlePublishMenu}>Console.log (borrar)</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
