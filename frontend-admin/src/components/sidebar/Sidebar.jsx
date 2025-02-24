import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <nav className="sidebar">  {/* Aquí usamos la clase sidebar */}
            <ul>
                <li>
                    <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
                </li>
                <li>
                    <Link to="/menus" className="block py-2 px-4 rounded hover:bg-gray-700">Menús</Link>
                </li>
                <li>
                    <Link to="/categories" className="block py-2 px-4 rounded hover:bg-gray-700">Categorías</Link>
                </li>
                <li>
                    <Link to="/products" className="block py-2 px-4 rounded hover:bg-gray-700">Productos</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
