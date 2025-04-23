import { useState, useEffect } from "react";
import { updateMenuCustomization, getMenuById } from "../../../api/menuApi.js";
import Swal from 'sweetalert2';

const MenuCustomizer = ({ menuId }) => {
    const [customization, setCustomization] = useState({
        businessName: "",
        logo: "",
        banner: "",
        style: {
            backgroundColor: "#ffffff",
            textColor: "#000000"
        }
    });

    useEffect(() => {
        const fetchMenuDetails = async () => {
            if (!menuId) return;
    
            try {
                const { data: menuData } = await getMenuById(menuId);

                // Reset antes de setear, por las dudas
                setCustomization({
                    businessName: "",
                    logo: "",
                    banner: "",
                    style: {
                        backgroundColor: "#ffffff",
                        textColor: "#000000"
                    }
                });
    
                setTimeout(() => {
                    setCustomization({
                        businessName: menuData.businessName || "",
                        logo: menuData.logo || "",
                        banner: menuData.banner || "",
                        style: {
                            backgroundColor: menuData.style?.backgroundColor || "#ffffff",
                            textColor: menuData.style?.textColor || "#000000"
                        }
                    });
                }, 50); // pequeño delay opcional para asegurar render
            } catch (error) {
                console.error("Error al traer el menú:", error);
            }
        };
    
        fetchMenuDetails();
    }, [menuId]);
    


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "backgroundColor" || name === "textColor") {
            setCustomization(prev => ({
                ...prev,
                style: {
                    ...prev.style,
                    [name]: value
                }
            }));
        } else {
            setCustomization(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("businessName", customization.businessName);
            formData.append("style", JSON.stringify(customization.style));
            if (customization.logo instanceof File) {
                formData.append("logo", customization.logo);
            }
            if (customization.banner instanceof File) {
                formData.append("banner", customization.banner);
            }

            await updateMenuCustomization(menuId, formData);
            Swal.fire({
                title: "Personalización guardada",
                text: "La personalización del menú se ha guardado correctamente.",
                icon: "success",
                confirmButtonText: "OK"
            })
        } catch (error) {
            console.error("Error al guardar la personalización:", error);
            alert("Ocurrió un error al guardar la personalización.");
        }
    };


    if (!menuId) {
        return <p>Selecciona un menú para personalizarlo.</p>;
    }

    return (
        <div>
            <h3>Personalizar Menú</h3>
            <div>
                <label>Nombre del comercio:</label>
                <input
                    type="text"
                    name="businessName"
                    value={customization.businessName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Logo (IMAGEN):</label>
                <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={(e) => setCustomization(prev => ({ ...prev, logo: e.target.files[0] }))}
                />
            </div>
            <div>
                <label>Banner (IMAGEN):</label>
                <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    onChange={(e) => setCustomization(prev => ({ ...prev, banner: e.target.files[0] }))}
                />
            </div>
            <div>
                <label>Color de fondo:</label>
                <input
                    type="color"
                    name="backgroundColor"
                    value={customization.style.backgroundColor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Color de texto:</label>
                <input
                    type="color"
                    name="textColor"
                    value={customization.style.textColor}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Guardar Personalización</button>
        </div>
    );
};

export default MenuCustomizer;
