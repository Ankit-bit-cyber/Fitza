import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrdersApi } from '../services/api';

const STATUS_COLORS = {
  pending:   { bg: 'rgba(251,191,36,0.1)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)'  },
  confirmed: { bg: 'rgba(34,197,94,0.1)',   color: '#22c55e', border: 'rgba(34,197,94,0.3)'   },
  shipped:   { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6', border: 'rgba(59,130,246,0.3)'  },
  delivered: { bg: 'rgba(168,85,247,0.1)',  color: '#a855f7', border: 'rgba(168,85,247,0.3)'  },
  cancelled: { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', border: 'rgba(239,68,68,0.3)'   },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrdersApi()
      .then(res => setOrders(res.data.data.orders))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        body { background: #0a0a0a; font-family: 'DM Sans', sans-serif; }
        .orders-page { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .orders-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #fff; margin-bottom: 2rem; }
        .order-card { background: #111; border: 1px solid #1a1a1a; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
        .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
        .order-id { font-size: 0.78rem; color: #555; font-family: monospace; }
        .order-date { font-size: 0.8rem; color: #444; }
        .order-status { padding: 3px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: capitalize; border: 1px solid; }
        .order-items { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem; }
        .order-item-img { width: 52px; height: 64px; object-fit: cover; border-radius: 6px; background: #1a1a1a; }
        .order-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #1a1a1a; }
        .order-total { color: #fff; font-weight: 700; font-size: 1rem; }
        .order-count { color: #555; font-size: 0.82rem; }
        .empty { text-align: center; padding: 4rem; color: #333; }
        .empty h3 { font-size: 1.5rem; color: #555; margin: 1rem 0 0.5rem; }
        .shop-btn { display: inline-block; margin-top: 1rem; padding: 0.75rem 2rem; background: #ff4d6d; color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.95rem; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="orders-page">
        <h1 className="orders-title">My Orders</h1>

        {loading ? (
          <p style={{ color: '#555' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: '4rem' }}>📦</div>
            <h3>No orders yet</h3>
            <p style={{ color: '#444', fontSize: '0.9rem' }}>Place your first order to see it here</p>
            <button className="shop-btn" onClick={() => navigate('/')}>Shop Now</button>
          </div>
        ) : (
          orders.map(order => {
            const s = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
            return (
              <div className="order-card" key={order._id}>
                <div className="order-header">
                  <div>
                    <p className="order-id">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <span className="order-status" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.slice(0, 5).map((item, i) => (
                    <img key={i} className="order-item-img" src={item.product?.imageUrl || ''} alt={item.name} onError={e => { e.target.style.display = 'none'; }} />
                  ))}
                  {order.items.length > 5 && (
                    <div style={{ width: 52, height: 64, background: '#1a1a1a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.78rem' }}>+{order.items.length - 5}</div>
                  )}
                </div>

                <div className="order-footer">
                  <span className="order-count">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                  <span className="order-total">₹{order.totalPrice?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
;