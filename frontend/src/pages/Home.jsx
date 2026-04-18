import { useState, useEffect, useCallback } from 'react';
import { getProductsApi, getFilterOptionsApi, getCartApi } from '../services/api';
import ProductCard, { ProductSkeleton } from '../components/ProductCard';

export default function Home({ user, setCartCount }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({ brands: [], categories: [] });
  const [filters, setFilters] = useState({ page: 1, limit: 20 });
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (search) params.search = search;
      const res = await getProductsApi(params);
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    getFilterOptionsApi().then(res => setFilterOptions(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      getCartApi().then(res => {
        setCartCount(res.data.data.cart?.items?.length || 0);
      }).catch(() => {});
    }
  }, [user]);

  const updateFilter = (key, val) => setFilters(f => ({ ...f, [key]: val || undefined, page: 1 }));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setFilters(f => ({ ...f, page: 1 }));
  };

  const handleCartUpdate = () => {
    if (user) {
      getCartApi().then(res => setCartCount(res.data.data.cart?.items?.length || 0)).catch(() => {});
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #fff; font-family: 'DM Sans', sans-serif; }
        .home { display: flex; min-height: calc(100vh - 64px); background: #0a0a0a; }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0a14 50%, #0a0a0a 100%);
          padding: 3rem 2rem 2rem;
          text-align: center;
          border-bottom: 1px solid #1a1a1a;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .hero h1 span { color: #ff4d6d; }
        .hero p { color: #666; font-size: 1rem; margin-bottom: 1.5rem; }
        .search-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          gap: 0;
          border: 1px solid #2a2a2a;
          border-radius: 50px;
          overflow: hidden;
          background: #111;
        }
        .search-input {
          flex: 1;
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.92rem;
          font-family: 'DM Sans', sans-serif;
        }
        .search-input::placeholder { color: #444; }
        .search-btn {
          padding: 0.75rem 1.5rem;
          background: #ff4d6d;
          border: none;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .search-btn:hover { background: #e63e5c; }

        /* Sidebar */
        .sidebar {
          width: 220px;
          flex-shrink: 0;
          padding: 1.5rem 1rem;
          border-right: 1px solid #1a1a1a;
          background: #0d0d0d;
        }
        .filter-section { margin-bottom: 1.5rem; }
        .filter-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.6rem;
        }
        .filter-select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: #111;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          color: #ccc;
          font-size: 0.85rem;
          outline: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .filter-select:focus { border-color: #ff4d6d; }
        .price-row { display: flex; gap: 6px; }
        .price-input {
          flex: 1;
          padding: 0.5rem 0.6rem;
          background: #111;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          color: #ccc;
          font-size: 0.82rem;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
        }
        .price-input:focus { border-color: #ff4d6d; }
        .clear-btn {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid #2a2a2a;
          color: #666;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.82rem;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          margin-top: 0.5rem;
        }
        .clear-btn:hover { border-color: #ff4d6d; color: #ff4d6d; }

        /* Main */
        .main { flex: 1; padding: 1.5rem 2rem; overflow-x: hidden; }
        .results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          color: #555;
          font-size: 0.85rem;
        }
        .results-bar span { color: #fff; }
        .sort-select {
          padding: 0.4rem 0.75rem;
          background: #111;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          color: #ccc;
          font-size: 0.82rem;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.25rem;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2.5rem;
          padding-bottom: 2rem;
        }
        .page-btn {
          padding: 0.5rem 1.1rem;
          background: #111;
          border: 1px solid #1a1a1a;
          color: #ccc;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .page-btn:hover:not(:disabled) { border-color: #ff4d6d; color: #ff4d6d; }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .page-info { color: #555; font-size: 0.85rem; }
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: #333;
        }
        .no-results h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .home { flex-direction: column; }
          .main { padding: 1rem; }
          .grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="hero">
        <h1>Fashion for the <span>Bold</span></h1>
        <p>Discover {pagination.total?.toLocaleString('en-IN') || '215K+'} styles from top brands</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            placeholder="Search brands, styles, colors..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button className="search-btn" type="submit">Search</button>
        </form>
      </div>

      <div className="home">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filter-section">
            <p className="filter-title">Brand</p>
            <select className="filter-select" value={filters.brand || ''} onChange={e => updateFilter('brand', e.target.value)}>
              <option value="">All Brands</option>
              {filterOptions.brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="filter-section">
            <p className="filter-title">Category</p>
            <select className="filter-select" value={filters.category || ''} onChange={e => updateFilter('category', e.target.value)}>
              <option value="">All Categories</option>
              {filterOptions.categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-section">
            <p className="filter-title">Price Range (₹)</p>
            <div className="price-row">
              <input className="price-input" type="number" placeholder="Min" value={filters.minPrice || ''} onChange={e => updateFilter('minPrice', e.target.value)} />
              <input className="price-input" type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={e => updateFilter('maxPrice', e.target.value)} />
            </div>
          </div>
          <button className="clear-btn" onClick={() => { setFilters({ page: 1, limit: 20 }); setSearch(''); setSearchInput(''); }}>
            Clear Filters
          </button>
        </aside>

        {/* Main */}
        <main className="main">
          <div className="results-bar">
            <p>{loading ? 'Loading...' : <><span>{pagination.total?.toLocaleString('en-IN')}</span> products found</>}</p>
            <select className="sort-select" onChange={e => updateFilter('sort', e.target.value)}>
              <option value="-createdAt">Newest First</option>
              <option value="discountPrice">Price: Low to High</option>
              <option value="-discountPrice">Price: High to Low</option>
              <option value="-discountPercent">Biggest Discount</option>
            </select>
          </div>

          <div className="grid">
            {loading
              ? Array(20).fill(0).map((_, i) => <ProductSkeleton key={i} />)
              : products.length === 0
              ? <div className="no-results" style={{ gridColumn: '1/-1' }}><h3>No products found</h3><p>Try different filters</p></div>
              : products.map(p => <ProductCard key={p._id} product={p} user={user} onCartUpdate={handleCartUpdate} />)
            }
          </div>

          {!loading && pagination.totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" disabled={pagination.page <= 1} onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}>← Prev</button>
              <span className="page-info">Page {pagination.page} of {pagination.totalPages}</span>
              <button className="page-btn" disabled={pagination.page >= pagination.totalPages} onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}>Next →</button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}