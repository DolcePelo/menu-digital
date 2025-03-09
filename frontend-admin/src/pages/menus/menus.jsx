import { useEffect, useState } from "react";
import { getMenus, saveMenu, deleteMenu, updateMenu, addCategoryToMenu, deleteCategoryFromMenu } from "../../api/menuApi.js";
import MenuForm from "../../components/menuForm/MenuForm.jsx";
import MenuList from "../../components/menuList/MenuList.jsx";
import MenuModal from "../../components/menuModal/MenuModal.jsx";

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
        try {
            await deleteMenu(id);
            fetchMenus();
        } catch (error) {
            console.error("Error al eliminar el menú:", error);
        }
    };

    const handleEditMenu = (menu) => {
        setSelectedMenu(menu);
    };

    const handleAssignCategory = async (menuId, categoryId) => {
        try {
            await addCategoryToMenu(menuId, categoryId);
            fetchMenus();
        } catch (error) {
            console.error("Error al asignar categoría al menú:", error);
        }
    };

    const handleDeleteCategory = async (menuId, categoryId) => {
        try {
            await deleteCategoryFromMenu(menuId, categoryId);
            fetchMenus();
        } catch (error) {
            console.error("Error al eliminar categoría del menú:", error);
        }
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
