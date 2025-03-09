import { useEffect, useState } from "react";
import { getMenus, saveMenu, deleteMenu, updateMenu, addCategoryToMenu, deleteCategoryFromMenu } from "../../api/menuApi.js";
import MenuForm from "../../components/menuForm/MenuForm.jsx";
import MenuList from "../../components/menuList/MenuList.jsx";
import MenuModal from "../../components/menuModal/MenuModal.jsx";
import Swal from "sweetalert2";

const Menus = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchMenus = async () => {
        try {
            const response = await getMenus();
            setMenus(response.data);
        } catch (error) {
            console.error("Error fetching menus", error);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleSaveMenu = async (menu) => {
        try {
            if (selectedMenu) {
                await updateMenu(selectedMenu._id, menu);
            } else {
                await saveMenu(menu);
            }

            fetchMenus();
            setSelectedMenu(null);
        } catch (error) {
            console.error("Error al guardar el Menu", error);
        }
    };

    const handleDeleteMenu = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este menu.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteMenu(id);
                    fetchMenus();
                    Swal.fire("Eliminado", "El menu ha sido eliminado.", "success");
                } catch (error) {
                    console.error("Error al eliminar el menu:", error);
                    Swal.fire("Error", "No se pudo eliminar el menu.", "error");
                }
            }
        });
    };

    const handleEditMenu = (menu) => {
        setSelectedMenu(menu);
    };

    const handleAssignCategory = async (menuId, categoryId) => {
        try {
            await addCategoryToMenu(menuId, categoryId);
            fetchMenus();
            setSelectedMenu(null);
        } catch (error) {
            console.error("Error al asignar categoría al menú:", error);
        }
    };

    const handleDeleteCategory = async (menuId, categoryId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar esta categoria.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCategoryFromMenu(menuId, categoryId);
                    fetchMenus();
                    Swal.fire("Eliminada", "La categoria ha sido eliminada.", "success");
                } catch (error) {
                    console.error("Error al eliminar la categoria:", error);
                    Swal.fire("Error", "No se pudo eliminar la categoria.", "error");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Menús</h1>
            <MenuForm onSave={handleSaveMenu} selectedMenu={selectedMenu} />
            <MenuList menus={menus} onDelete={handleDeleteMenu} onEdit={handleEditMenu} onDeleteCategory={handleDeleteCategory}
            onOpenMenuModal={(menu) => {
                setSelectedMenu(menu);
                setOpenModal(true);
            }} />
            <MenuModal 
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onAssignCategory={handleAssignCategory}
            menu={selectedMenu}
            />
        </div>
    );
};

export default Menus;
