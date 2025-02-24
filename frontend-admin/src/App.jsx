import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Menus from './pages/menus/menus.jsx';
import Categories from './pages/categories/Categories.jsx';
import Products from './pages/products/Products.jsx';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menus" element={<Menus />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
