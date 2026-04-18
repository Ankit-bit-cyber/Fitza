app.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';

export default function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('fitza_user');
    return u ? JSON.parse(u) : null;
  });
  const [cartCount, setCartCount] = useState(0);

  const handleLogin = (userData, token) => {
    localStorage.setItem('fitza_token', token);
    localStorage.setItem('fitza_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('fitza_token');
    localStorage.removeItem('fitza_user');
    setUser(null);
    setCartCount(0);
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar user={user} onLogout={handleLogout} cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home user={user} setCartCount={setCartCount} />} />
        <Route path="/product/:id" element={<ProductDetail user={user} setCartCount={setCartCount} />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/cart" element={user ? <Cart user={user} setCartCount={setCartCount} /> : <Navigate to="/login" />} />
        <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}