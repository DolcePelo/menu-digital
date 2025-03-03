import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import './Sidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); 
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>  
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? <FaBars /> : <FaTimes />}
            </button>

            <ul>
                <li>
                    <Link to="/dashboard">
                        <span className="icon">📊</span> 
                        {!isCollapsed && <span className="text">Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/menus">
                        <span className="icon">📜</span> 
                        {!isCollapsed && <span className="text">Menús</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/categories">
                        <span className="icon">📁</span> 
                        {!isCollapsed && <span className="text">Categorías</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/products">
                        <span className="icon">🛒</span> 
                        {!isCollapsed && <span className="text">Productos</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
