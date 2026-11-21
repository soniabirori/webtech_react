import { Link } from 'react-router-dom';
import products from '../data/products.json';
import { useAuth } from '../context/authContext';
import FeaturedScentCard from '../components/FeaturedScentCard';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page scent-home-page">
      <section className="ss-hero">
        <div className="ss-hero-copy">
          <p className="ss-eyebrow"><span className="ss-eyebrow-line" /> Fragrance, with feeling</p>
          <h1>A scent can<br />say <em>everything.</em></h1>
          <p className="ss-hero-intro">Discover the notes, moods, and little moments that make a fragrance feel like yours.</p>
          <Link className="ss-button ss-button-dark" to="/collection">Find your fragrance <span aria-hidden="true">→</span></Link>
          <p className="ss-hero-note">Thoughtfully chosen. Made to be remembered.</p>
        </div>
        <div className="ss-hero-art">
          <img
            className="ss-hero-photo"
            src={products[0].image}
            alt="Glass perfume bottle photographed in warm light"
          />
          <span className="ss-hero-art-caption">No. 01&nbsp; / &nbsp;The quiet hour</span>
        </div>
      </section>

      <section className="ss-intro">
        <p className="ss-eyebrow">A little about us</p>
        <h2>Fragrance is more than a finishing touch.<br /><em>It's a feeling you carry.</em></h2>
        <p>{user ? `Welcome back, ${user.firstName}. ` : ''}At Scent Stories, every fragrance begins with a mood and ends with a memory. Explore a considered collection made for the many sides of you.</p>
        <Link className="ss-text-link" to="/journal">Get to know us <span aria-hidden="true">→</span></Link>
      </section>

      <section className="ss-collection" id="collection">
        <div className="ss-section-heading">
          <div>
            <p className="ss-eyebrow">The fragrance edit</p>
            <h2>Find your <em>next chapter.</em></h2>
          </div>
          <Link className="ss-text-link" to="/collection">Three moods. A thousand ways to make them yours <span aria-hidden="true">→</span></Link>
        </div>
        <div className="ss-product-grid">
          {products.map((product, index) => (
            <FeaturedScentCard key={product.id} product={product} number={index + 1} />
          ))}
        </div>
        <p className="ss-collection-note">Our collection is a starting point. Tell us what you love and we'll help you find your match.</p>
      </section>

      <section className="ss-quote-band" aria-label="Our approach to fragrance">
        <p className="ss-eyebrow">A note to remember</p>
        <blockquote>“The best fragrance doesn't enter the room before you. It stays in someone's memory after you leave.”</blockquote>
        <Link className="ss-button ss-button-outline" to="/scent-finder">Let's find your scent <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}
