import { useState } from "react";
import { Sun, Moon, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <header className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#3498db] text-[#2c3e50]'} shadow-md`}>
            <h1 className="text-xl font-bold">Nombre del comercio</h1>

            <div className="flex items-center space-x-6">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {darkMode ? <Sun /> : <Moon />}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <User />
                </button>
            </div>
        </header>
    );
}

export default Navbar;
