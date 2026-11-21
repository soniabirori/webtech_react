import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/formValidation';

export default function Login() {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/profile'} replace />;

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setError('Enter your email address.');
      return;
    }
    if (!isValidEmail(normalizedEmail)) {
      setError('Enter a complete email address, like name@example.com.');
      return;
    }
    if (!password.trim()) {
      setError('Enter your password to continue.');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    try {
      login(normalizedEmail, password);
      navigate(location.state?.from || '/profile', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-art">
        <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85" alt="A perfume bottle waiting in warm light" />
        <span>SCENT STORIES<br />A LITTLE SOMETHING FOR YOU</span>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">Lovely to see you again</p>
        <h1>Come on <em>in.</em></h1>
        <p className="auth-description">Sign in to keep your favorite scent stories close.</p>
        <p className="form-note">Demo sign-in: use a complete email and a password with at least 6 characters.</p>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength={MIN_PASSWORD_LENGTH} required />
        <button className="button button-dark button-full" type="submit">Sign in <span aria-hidden="true">↗</span></button>
        <p className="auth-switch">New around here? <Link to="/register">Create an account</Link></p>
        <p className="auth-switch">Admin? <Link to="/admin/login">Admin sign-in</Link></p>
      </form>
    </section>
  );
}
