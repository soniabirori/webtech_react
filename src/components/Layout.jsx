import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/collection', label: 'The collection' },
  { to: '/scent-finder', label: 'Find your scent' },
  { to: '/journal', label: 'Our stories' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);

  function addToBag(product) {
    setBag((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setBagOpen(true);
  }

  function changeQuantity(productId, amount) {
    setBag((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const bagCount = bag.reduce((count, item) => count + item.quantity, 0);
  const bagTotal = bag.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Scent Stories home">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>Scent <em>Stories</em></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              {user.role === 'admin' ? <Link className="account-link" to="/admin/dashboard">Analytics</Link> : null}
              <Link className="account-link" to={user.role === 'admin' ? '/admin/dashboard' : '/profile'}>Hi, {user.firstName}</Link>
              <button className="text-button logout-link" onClick={handleLogout} type="button">Log out</button>
            </>
          ) : (
            <Link className="account-link" to="/login">Sign in</Link>
          )}
          <button
            className="bag-button"
            type="button"
            onClick={() => setBagOpen(true)}
            aria-label={`Open shopping bag, ${bagCount} items`}
          >
            Bag <span>{bagCount}</span>
          </button>
        </div>
      </header>

      <main>
        <Outlet context={{ addToBag }} />
      </main>

      <footer className="site-footer">
        <Link className="wordmark footer-wordmark" to="/">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>Scent <em>Stories</em></span>
        </Link>
        <p>Small moments. Lasting notes.</p>
        <span>© 2026 Scent Stories</span>
      </footer>

      {bagOpen ? (
        <div className="modal-backdrop" onClick={() => setBagOpen(false)}>
          <section
            className="bag-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">Your little collection</p>
                <h2 id="bag-title">Shopping bag <span>({bagCount})</span></h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setBagOpen(false)} aria-label="Close bag">×</button>
            </div>
            {bag.length ? (
              <>
                <ul className="bag-items">
                  {bag.map((item) => (
                    <li className="bag-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="bag-item-copy">
                        <strong>{item.name}</strong>
                        <span>{item.size} · ${item.price}</span>
                        <div className="quantity-control" aria-label={`${item.name} quantity`}>
                          <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                        </div>
                      </div>
                      <strong>${item.price * item.quantity}</strong>
                    </li>
                  ))}
                </ul>
                <div className="bag-total"><span>Subtotal</span><strong>${bagTotal.toFixed(2)}</strong></div>
                <p className="bag-note">Shipping and taxes are calculated at checkout.</p>
                <button className="button button-dark button-full" type="button" onClick={() => setBagOpen(false)}>
                  Continue exploring
                </button>
              </>
            ) : (
              <div className="empty-bag">
                <span aria-hidden="true">✳</span>
                <h3>Your bag is taking a quiet moment.</h3>
                <p>Find a fragrance that feels like you and it will show up here.</p>
                <Link className="button button-dark" to="/collection" onClick={() => setBagOpen(false)}>Explore the collection</Link>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
