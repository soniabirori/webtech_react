import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="page account-gate">
        <span className="account-flower" aria-hidden="true">✳</span>
        <p className="eyebrow">Your little corner</p>
        <h1>Keep your scent <em>stories close.</em></h1>
        <p>Sign in or make an account to see your Scent Stories profile.</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/login">Sign in</Link>
          <Link className="button button-outline" to="/register">Create an account</Link>
        </div>
      </section>
    );
  }

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

  return (
    <section className="page profile-page">
      <div className="page-intro profile-intro">
        <p className="eyebrow">Your Scent Stories account</p>
        <h1>Your own little <em>world.</em></h1>
        <p>A place for the fragrances and feelings you want to come back to.</p>
      </div>
      <article className="profile-card">
        <div className="profile-avatar" aria-hidden="true">{initials}</div>
        <div className="profile-details">
          <span className="product-family">SCENT LOVER SINCE {user.joined}</span>
          <h2>{user.firstName} {user.lastName || ''}</h2>
          <p>{user.email}</p>
          <Link className="text-link" to="/collection">Find a new favorite <span aria-hidden="true">→</span></Link>
        </div>
        <span className="profile-sparkle" aria-hidden="true">✳</span>
      </article>
      <div className="profile-note"><p className="eyebrow">A note to yourself</p><p>Wear the fragrance that feels like coming home to yourself.</p></div>
    </section>
  );
}
