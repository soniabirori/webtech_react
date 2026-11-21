import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from '../data/demoAdmin';

export default function AdminLogin() {
  const { user, adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      adminLogin(email, password);
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-art">
        <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85" alt="A fragrance bottle in warm light" />
        <span>SCENT STORIES<br />ADMINISTRATION</span>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">The studio door</p>
        <h1>Admin <em>sign-in.</em></h1>
        <p className="auth-description">Sign in to explore the catalog and content overview.</p>
        <p className="form-note">
          Demo credentials: {DEMO_ADMIN_EMAIL} / {DEMO_ADMIN_PASSWORD}. This browser-only demo is not secure for production use.
        </p>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <label htmlFor="admin-email">Admin email</label>
        <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@scentstories.com" required />
        <label htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" required />
        <button className="button button-dark button-full" type="submit">Open dashboard <span aria-hidden="true">↗</span></button>
        <p className="auth-switch">Shopping with us? <Link to="/login">User sign-in</Link></p>
      </form>
    </section>
  );
}
