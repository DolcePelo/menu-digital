import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import MenuPage from './pages/menuPage/MenuPage.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/menu/:id" element={<MenuPage />} />
      </Routes>
    </Router>
  )
}

export default App
