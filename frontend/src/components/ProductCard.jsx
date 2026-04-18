import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCartApi } from '../services/api';

export function ProductSkeleton() {
  return (
    <div style={skeletonStyles.card}>
      <div style={skeletonStyles.img} className="skeleton-pulse" />
      <div style={skeletonStyles.body}>
        <div style={{ ...skeletonStyles.line, width: '60%' }} className="skeleton-pulse" />
        <div style={{ ...skeletonStyles.line, width: '90%', height: 14 }} className="skeleton-pulse" />
        <div style={{ ...skeletonStyles.line, width: '40%' }} className="skeleton-pulse" />
        <div style={{ ...skeletonStyles.btn }} className="skeleton-pulse" />
      </div>
    </div>
  );
}

const skeletonStyles = {
  card: { background: '#111', borderRadius: 12, overflow: 'hidden', border: '1px solid #1a1a1a' },
  img: { width: '100%', height: 280, background: '#1a1a1a' },
  body: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 },
  line: { height: 12, background: '#1a1a1a', borderRadius: 4 },
  btn: { height: 38, background: '#1a1a1a', borderRadius: 8, marginTop: 4 },
};

export default function ProductCard({ product, user, onCartUpdate }) {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.discountPercent ||
    (product.originalPrice > 0
      ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)
      : 0);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    setAdding(true);
    try {
      await addToCartApi(product._id, 1);
      setAdded(true);
      if (onCartUpdate) onCartUpdate();
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <style>{`
        .product-card {
          background: #111;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          border-color: #2a2a2a;
        }
        .product-card:hover .card-img {
          transform: scale(1.05);
        }
        .card-img-wrap {
          overflow: hidden;
          position: relative;
          height: 280px;
          background: #1a1a1a;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          display: block;
        }
        .card-discount-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff4d6d;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }
        .card-body { padding: 1rem; }
        .card-brand {
          font-size: 0.7rem;
          font-weight: 600;
          color: #ff4d6d;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 0 4px;
        }
        .card-name {
          font-size: 0.92rem;
          color: #ddd;
          margin: 0 0 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
        }
        .card-color {
          font-size: 0.75rem;
          color: #555;
          margin: 0 0 10px;
        }
        .card-prices {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .card-price {
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
        }
        .card-original {
          font-size: 0.8rem;
          color: #444;
          text-decoration: line-through;
        }
        .card-add-btn {
          width: 100%;
          padding: 0.55rem;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
        }
        .card-add-btn.default { background: #1a1a1a; color: #ccc; border: 1px solid #2a2a2a; }
        .card-add-btn.default:hover { background: #ff4d6d; color: #fff; border-color: #ff4d6d; }
        .card-add-btn.added { background: #22c55e; color: #fff; }
        .card-add-btn.loading { background: #1a1a1a; color: #555; cursor: not-allowed; }
        .skeleton-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
        <div className="card-img-wrap">
          {!imgError ? (
            <img
              className="card-img"
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '2rem' }}>👕</div>
          )}
          {discount > 0 && <span className="card-discount-badge">{discount}% OFF</span>}
        </div>
        <div className="card-body">
          <p className="card-brand">{product.brand}</p>
          <p className="card-name">{product.name}</p>
          <p className="card-color">{product.color} · {product.category}</p>
          <div className="card-prices">
            <span className="card-price">₹{product.discountPrice?.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.discountPrice && (
              <span className="card-original">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            className={`card-add-btn ${added ? 'added' : adding ? 'loading' : 'default'}`}
            onClick={handleAddToCart}
            disabled={adding}
          >
            {added ? '✓ Added to Cart' : adding ? 'Adding...' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </>
  );
}