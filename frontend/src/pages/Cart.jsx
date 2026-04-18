import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartApi, removeCartItemApi, updateCartItemApi, clearCartApi, placeOrderApi } from '../services/api';

export default function Cart({ setCartCount }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCartApi();
      const cartData = res.data.data.cart;
      // Handle both object and null responses
      if (cartData && cartData.items) {
        setCart(cartData);
        setCartCount(cartData.items.length);
      } else {
        setCart({ items: [], totalPrice: 0 });
        setCartCount(0);
      }
    } catch (err) {
      console.error('Cart fetch error:', err);
      setCart({ items: [], totalPrice: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeCartItemApi(productId);
      fetchCart();
    } catch (err) { console.error(err); }
  };

  const handleQty = async (productId, qty) => {
    if (qty < 1) { handleRemove(productId); return; }
    try {
      await updateCartItemApi(productId, qty);
      fetchCart();
    } catch (err) { console.error(err); }
  };

  const handleOrder = async () => {
    setPlacing(true);
    try {
      await placeOrderApi({ street: 'N/A', city: 'N/A', state: 'N/A', pincode: '000000' });
      setOrderDone(true);
      setCartCount(0);
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
    } finally { setPlacing(false); }
  };

  if (orderDone) return (
    <>
      <style>{`body{background:#0a0a0a;font-family:'DM Sans',sans-serif;}`}</style>
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff', textAlign: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '4rem' }}>🎉</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem' }}>Order Placed!</h2>
        <p style={{ color: '#666' }}>Your order has been confirmed successfully.</p>
        <button onClick={() => navigate('/orders')} style={{ padding: '0.75rem 2rem', background: '#ff4d6d', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', marginTop: '0.5rem' }}>View Orders</button>
        <button onClick={() => navigate('/')} style={{ padding: '0.75rem 2rem', background: 'transparent', border: '1px solid #333', borderRadius: 10, color: '#aaa', cursor: 'pointer', fontSize: '0.9rem' }}>Continue Shopping</button>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        body { background: #0a0a0a; font-family: 'DM Sans', sans-serif; }
        .cart-page { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .cart-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #fff; margin-bottom: 2rem; }
        .cart-item { display: flex; gap: 1rem; padding: 1rem; margin-bottom: 1rem; background: #111; border: 1px solid #1a1a1a; border-radius: 12px; align-items: center; }
        .cart-img { width: 80px; height: 100px; object-fit: cover; border-radius: 8px; background: #1a1a1a; flex-shrink: 0; }
        .cart-info { flex: 1; }
        .cart-brand { font-size: 0.7rem; color: #ff4d6d; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .cart-name { color: #ddd; font-size: 0.92rem; margin: 3px 0 6px; font-weight: 500; }
        .cart-price { color: #fff; font-weight: 700; font-size: 1rem; }
        .qty-controls { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
        .qty-btn { width: 28px; height: 28px; background: #1a1a1a; border: 1px solid #2a2a2a; color: #fff; border-radius: 6px; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .qty-btn:hover { background: #ff4d6d; border-color: #ff4d6d; }
        .qty-num { color: #fff; font-weight: 600; font-size: 0.9rem; min-width: 24px; text-align: center; }
        .remove-btn { padding: 0.4rem 0.8rem; background: transparent; border: 1px solid #2a2a2a; color: #555; border-radius: 8px; cursor: pointer; font-size: 0.78rem; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .remove-btn:hover { border-color: #ff4d6d; color: #ff4d6d; }
        .cart-summary { background: #111; border: 1px solid #1a1a1a; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; }
        .summary-row { display: flex; justify-content: space-between; color: #aaa; font-size: 0.9rem; margin-bottom: 0.6rem; }
        .summary-total { display: flex; justify-content: space-between; color: #fff; font-size: 1.1rem; font-weight: 700; padding-top: 0.75rem; border-top: 1px solid #1a1a1a; margin-top: 0.75rem; }
        .order-btn { width: 100%; padding: 0.9rem; background: #ff4d6d; border: none; color: #fff; font-size: 1rem; font-weight: 700; border-radius: 10px; cursor: pointer; margin-top: 1.25rem; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .order-btn:hover:not(:disabled) { background: #e63e5c; transform: translateY(-1px); }
        .order-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .empty-cart { text-align: center; padding: 4rem 2rem; color: #333; }
        .empty-cart h3 { font-size: 1.5rem; color: #555; margin: 1rem 0 0.5rem; }
        .shop-btn { display: inline-block; margin-top: 1rem; padding: 0.75rem 2rem; background: #ff4d6d; color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.95rem; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>

        {loading ? (
          <p style={{ color: '#555', textAlign: 'center', padding: '3rem' }}>Loading your cart...</p>
        ) : !cart?.items?.length ? (
          <div className="empty-cart">
            <div style={{ fontSize: '4rem' }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p style={{ color: '#444', fontSize: '0.9rem' }}>Add some products to get started</p>
            <button className="shop-btn" onClick={() => navigate('/')}>Start Shopping</button>
          </div>
        ) : (
          <>
            {cart.items.map(item => {
              const product = item.product || {};
              return (
                <div className="cart-item" key={item._id}>
                  <img
                    className="cart-img"
                    src={product.imageUrl || ''}
                    alt={product.name || 'Product'}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <div className="cart-info">
                    <p className="cart-brand">{product.brand || ''}</p>
                    <p className="cart-name">{product.name || 'Product'}</p>
                    <p className="cart-price">₹{item.price?.toLocaleString('en-IN')}</p>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => handleQty(product._id, item.quantity - 1)}>−</button>
                      <span className="qty-num">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleQty(product._id, item.quantity + 1)}>+</button>
                      <button className="remove-btn" onClick={() => handleRemove(product._id)}>Remove</button>
                    </div>
                  </div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}

            <div className="cart-summary">
              <div className="summary-row">
                <span>Items ({cart.items.reduce((sum, i) => sum + i.quantity, 0)})</span>
                <span>₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row"><span>Delivery</span><span style={{ color: '#22c55e' }}>FREE</span></div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
              </div>
              <button className="order-btn" onClick={handleOrder} disabled={placing}>
                {placing ? 'Placing Order...' : 'Place Order →'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}