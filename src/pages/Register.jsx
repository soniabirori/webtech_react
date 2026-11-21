import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/formValidation';

export default function Register() {
  const { user, isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/profile'} replace />;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Enter your first and last name.');
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      setError('Enter a complete email address, like name@example.com.');
      return;
    }
    if (!form.password.trim()) {
      setError('Enter a password to create your account.');
      return;
    }
    if (form.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    try {
      register(form);
      navigate('/profile', { replace: true });
    } catch (registrationError) {
      setError(registrationError.message);
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-art">
        <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85" alt="A fragrance bottle in a wash of golden light" />
        <span>A NEW CHAPTER<br />A NEW LITTLE RITUAL</span>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">A little space, just for you</p>
        <h1>Make it <em>yours.</em></h1>
        <p className="auth-description">Create an account and start collecting the scents that feel like you.</p>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="form-row">
          <div><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" value={form.firstName} onChange={handleChange} required /></div>
          <div><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" value={form.lastName} onChange={handleChange} required /></div>
        </div>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" minLength={MIN_PASSWORD_LENGTH} required />
        <button className="button button-dark button-full" type="submit">Create account <span aria-hidden="true">↗</span></button>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </section>
  );
}
