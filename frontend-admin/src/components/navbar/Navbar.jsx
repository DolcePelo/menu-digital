import { useState } from "react";
import { Sun, Moon, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, logout }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <header className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#3498db] text-[#2c3e50]'} shadow-md relative`}>
            <h1 className="text-xl font-bold">Nombre del comercio</h1>

            <div className="flex items-center space-x-6">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {darkMode ? <Sun /> : <Moon />}
                </button>

                {/* Botón de usuario con dropdown */}
                <div className="relative">
                    <button 
                        onClick={toggleDropdown} 
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <User />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-65 bg-white shadow-lg rounded-lg p-3">
                            <p className="text-sm text-gray-700 break-words">{user?.result.email || "Usuario"}</p>
                            <button 
                                onClick={logout}
                                className="w-full mt-2 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;

