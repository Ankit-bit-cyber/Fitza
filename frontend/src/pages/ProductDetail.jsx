import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByIdApi, addToCartApi } from '../services/api';

export default function ProductDetail({ user, setCartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductByIdApi(id)
      .then(res => setProduct(res.data.data.product))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    setAdding(true);
    try {
      await addToCartApi(product._id, 1);
      setAdded(true);
      setCartCount(c => c + 1);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) { console.error(err); }
    finally { setAdding(false); }
  };

  if (loading) return (
    <div style={{ minHeight: 'calc(100vh - 64px)', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'DM Sans, sans-serif' }}>Loading...</div>
  );

  if (!product) return null;

  const discount = product.discountPercent || (product.originalPrice > 0 ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100) : 0);
  const savings = product.originalPrice - product.discountPrice;

  return (
    <>
      <style>{`
        body { background: #0a0a0a; font-family: 'DM Sans', sans-serif; }
        .detail-page { max-width: 1000px; margin: 0 auto; padding: 2rem; display: flex; gap: 3rem; align-items: flex-start; }
        .detail-img-wrap { flex-shrink: 0; width: 380px; border-radius: 16px; overflow: hidden; background: #111; border: 1px solid #1a1a1a; }
        .detail-img { width: 100%; display: block; }
        .detail-info { flex: 1; }
        .back-btn { background: transparent; border: 1px solid #1a1a1a; color: #666; padding: 0.4rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.82rem; margin-bottom: 1.5rem; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .back-btn:hover { color: #fff; border-color: #333; }
        .detail-brand { font-size: 0.75rem; font-weight: 700; color: #ff4d6d; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
        .detail-name { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 700; color: #fff; line-height: 1.3; margin-bottom: 1rem; }
        .detail-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.25rem; }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .badge-cat { background: #1a1a1a; color: #aaa; border: 1px solid #2a2a2a; }
        .badge-color { background: #1a1a1a; color: #aaa; border: 1px solid #2a2a2a; }
        .badge-discount { background: rgba(255,77,109,0.15); color: #ff4d6d; border: 1px solid rgba(255,77,109,0.3); }
        .detail-prices { margin-bottom: 1.5rem; }
        .detail-price { font-size: 2rem; font-weight: 800; color: #fff; }
        .detail-original { font-size: 1rem; color: #444; text-decoration: line-through; margin-left: 0.75rem; }
        .detail-savings { display: block; color: #22c55e; font-size: 0.85rem; margin-top: 4px; font-weight: 500; }
        .detail-add-btn { width: 100%; padding: 1rem; border: none; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; margin-bottom: 0.75rem; }
        .detail-add-btn.default { background: #ff4d6d; color: #fff; }
        .detail-add-btn.default:hover { background: #e63e5c; transform: translateY(-1px); }
        .detail-add-btn.added { background: #22c55e; color: #fff; }
        .detail-add-btn.loading { background: #333; color: #666; cursor: not-allowed; }
        .detail-cart-btn { width: 100%; padding: 0.9rem; border: 1px solid #2a2a2a; border-radius: 12px; background: transparent; color: #ccc; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .detail-cart-btn:hover { border-color: #ff4d6d; color: #ff4d6d; }
        .detail-meta { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #1a1a1a; }
        .detail-meta-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #111; }
        .detail-meta-label { color: #555; font-size: 0.85rem; }
        .detail-meta-val { color: #aaa; font-size: 0.85rem; font-weight: 500; }
        @media (max-width: 768px) {
          .detail-page { flex-direction: column; padding: 1rem; }
          .detail-img-wrap { width: 100%; }
        }
      `}</style>

      <div className="detail-page">
        <div className="detail-img-wrap">
          <img className="detail-img" src={product.imageUrl} alt={product.name} onError={e => { e.target.src = ''; e.target.style.display = 'none'; }} />
        </div>

        <div className="detail-info">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <p className="detail-brand">{product.brand}</p>
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-badges">
            {product.category && <span className="badge badge-cat">{product.category}</span>}
            {product.color && <span className="badge badge-color">{product.color}</span>}
            {discount > 0 && <span className="badge badge-discount">{discount}% OFF</span>}
          </div>

          <div className="detail-prices">
            <span className="detail-price">₹{product.discountPrice?.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.discountPrice && (
              <span className="detail-original">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
            )}
            {savings > 0 && <span className="detail-savings">You save ₹{savings.toLocaleString('en-IN')}</span>}
          </div>

          <button
            className={`detail-add-btn ${added ? 'added' : adding ? 'loading' : 'default'}`}
            onClick={handleAddToCart}
            disabled={adding}
          >
            {added ? '✓ Added to Cart!' : adding ? 'Adding...' : '+ Add to Cart'}
          </button>

          <button className="detail-cart-btn" onClick={() => navigate('/cart')}>View Cart →</button>

          <div className="detail-meta">
            <div className="detail-meta-row"><span className="detail-meta-label">Brand</span><span className="detail-meta-val">{product.brand}</span></div>
            <div className="detail-meta-row"><span className="detail-meta-label">Category</span><span className="detail-meta-val">{product.category}</span></div>
            <div className="detail-meta-row"><span className="detail-meta-label">Color</span><span className="detail-meta-val">{product.color}</span></div>
            <div className="detail-meta-row"><span className="detail-meta-label">Product ID</span><span className="detail-meta-val">{product.productId}</span></div>
          </div>
        </div>
      </div>
    </>
  );
}