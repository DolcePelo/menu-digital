import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Menus from './pages/menus/menus.jsx';
import Categories from './pages/categories/Categories.jsx';
import Products from './pages/products/Products.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';

function App() {
  const [user, setUser] = useState(null)
  console.log('usuario: ',user)
  return (
    <Router>
      {user ? (
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
      ) : (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        )}
    </Router>
  )
}

export default App
