import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({ user, onLogout, cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #0a0a0a;
          border-bottom: 1px solid #1a1a1a;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 900;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.5px;
        }
        .nav-brand span { color: #ff4d6d; }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #aaa;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          transition: all 0.2s;
          font-weight: 500;
        }
        .nav-links a:hover, .nav-links a.active { color: #fff; background: #1a1a1a; }
        .cart-btn {
          position: relative;
          color: #aaa;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          transition: all 0.2s;
          font-weight: 500;
        }
        .cart-btn:hover { color: #fff; background: #1a1a1a; }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ff4d6d;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-login {
          background: #ff4d6d;
          color: #fff !important;
          padding: 0.4rem 1.1rem !important;
          border-radius: 20px !important;
          font-weight: 600 !important;
        }
        .btn-login:hover { background: #e63e5c !important; color: #fff !important; }
        .btn-logout {
          background: transparent;
          border: 1px solid #333;
          color: #aaa;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-logout:hover { border-color: #ff4d6d; color: #ff4d6d; }
        .nav-user {
          color: #666;
          font-size: 0.82rem;
          padding: 0 0.5rem;
        }
        @media (max-width: 600px) {
          .nav-links { gap: 0.2rem; }
          .nav-user { display: none; }
          .navbar { padding: 0 1rem; }
        }
      `}</style>
      <nav className="navbar">
        <Link to="/" className="nav-brand">FIT<span>ZA</span></Link>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Shop</Link></li>
          {user && <li><Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Orders</Link></li>}
          {user && (
            <li>
              <Link to="/cart" className="cart-btn">
                🛒 Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
          )}
          {user ? (
            <>
              <li><span className="nav-user">Hi, {user.name?.split(' ')[0]}</span></li>
              <li><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="btn-login">Login</Link></li>
          )}
        </ul>
      </nav>
    </>
  );
}