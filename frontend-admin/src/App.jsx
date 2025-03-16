import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Menus from './pages/menus/Menus.jsx';
import Categories from './pages/categories/Categories.jsx';
import Products from './pages/products/Products.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [commercialPremises, setCommercialPremises] = useState("Nombre del comercio");

  const logout = () => {
    setUser(null);
};


  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Rutas protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user}>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Navbar user={user} logout={logout} commercialPremises={commercialPremises} />
                  <main className="p-4">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard setCommercialPremises={setCommercialPremises} /> }/>
                      <Route path="/menus" element={<Menus />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
