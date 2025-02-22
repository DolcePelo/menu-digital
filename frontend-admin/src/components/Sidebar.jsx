import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/menus">Menús</Link>
                </li>
                <li>
                    <Link to="/categires">Categorias</Link>
                </li>
                <li>
                    <Link to="/products">Productos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;