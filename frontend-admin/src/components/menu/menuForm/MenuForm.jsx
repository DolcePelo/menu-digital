import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const MenuForm = ({ onSave, selectedMenu }) => {
    const [menu, setMenu] = useState({ name: '', description: '' });

    useEffect(() => {
        if (selectedMenu) {
            setMenu({ name: selectedMenu.name, description: selectedMenu.description });
        } else {
            setMenu({ name: '', description: '' });
        }
    }, [selectedMenu]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenu({ ...menu, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(menu);
        setMenu({ name: '', description: '' });

        Swal.fire({
                    title: selectedMenu ? "Menu actualizado" : "Menu agregado",
                    text: "El menu se ha guardado correctamente.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                name="name"
                value={menu.name}
                onChange={handleChange}
                placeholder="Nombre del menú"
                className="border p-2 mr-2"
                required
            />
            <input
                type="text"
                name="description"
                value={menu.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="border p-2 mr-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {selectedMenu ? "Actualizar" : "Agregar"}
            </button>
        </form>
    );
};

export default MenuForm;