import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/api';

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = tab === 'login'
        ? await loginApi({ email: form.email, password: form.password })
        : await registerApi(form);
      const { user, token } = res.data.data;
      onLogin(user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body { background: #0a0a0a; }
        .auth-page {
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          padding: 2rem;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-card {
          background: #111;
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 400px;
          animation: fadeUp 0.4s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .auth-logo {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          text-align: center;
          margin-bottom: 0.25rem;
        }
        .auth-logo span { color: #ff4d6d; }
        .auth-tagline { text-align: center; color: #444; font-size: 0.85rem; margin-bottom: 1.75rem; }
        .auth-tabs {
          display: flex;
          background: #0a0a0a;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 1.75rem;
          border: 1px solid #1a1a1a;
        }
        .auth-tab {
          flex: 1;
          padding: 0.55rem;
          text-align: center;
          cursor: pointer;
          border-radius: 7px;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.2s;
          color: #555;
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-tab.active { background: #ff4d6d; color: #fff; }
        .auth-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
          margin-top: 1rem;
        }
        .auth-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 10px;
          color: #fff;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-input:focus { border-color: #ff4d6d; }
        .auth-input::placeholder { color: #333; }
        .auth-error {
          background: rgba(255,77,109,0.1);
          border: 1px solid rgba(255,77,109,0.3);
          color: #ff4d6d;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-top: 1rem;
        }
        .auth-submit {
          width: 100%;
          padding: 0.85rem;
          background: #ff4d6d;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
        }
        .auth-submit:hover:not(:disabled) { background: #e63e5c; transform: translateY(-1px); }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .auth-footer { text-align: center; margin-top: 1.25rem; font-size: 0.82rem; color: #444; }
        .auth-footer span { color: #ff4d6d; cursor: pointer; font-weight: 600; }
        .auth-footer span:hover { text-decoration: underline; }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">FIT<span>ZA</span></div>
          <p className="auth-tagline">Fashion for the bold & beautiful</p>

          <div className="auth-tabs">
            <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError(''); }}>Sign In</button>
            <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError(''); }}>Register</button>
          </div>

          <form onSubmit={handleSubmit}>
            {tab === 'register' && (
              <>
                <label className="auth-label">Full Name</label>
                <input className="auth-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </>
            )}
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <label className="auth-label">Password</label>
            <input className="auth-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          <p className="auth-footer">
            {tab === 'login' ? <>New here? <span onClick={() => { setTab('register'); setError(''); }}>Create account</span></> : <>Already have an account? <span onClick={() => { setTab('login'); setError(''); }}>Sign in</span></>}
          </p>
        </div>
      </div>
    </>
  )
};