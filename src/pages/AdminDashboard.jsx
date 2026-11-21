import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import products from '../data/products.json';
import { stories } from '../data/stories';

const families = [...new Set(products.map((product) => product.family))].map((family) => ({
  name: family,
  count: products.filter((product) => product.family === family).length,
}));

const averagePrice = products.reduce((total, product) => total + product.price, 0) / products.length;
const featuredCount = products.filter((product) => product.featured).length;
const maxFamilyCount = Math.max(...families.map((family) => family.count), 1);

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <section className="page admin-dashboard">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Scent Stories · Studio overview</p>
          <h1>Good day, <em>{user?.firstName}.</em></h1>
          <p>Here’s a snapshot of the fragrance catalog and journal content.</p>
        </div>
        <Link className="button button-outline" to="/collection">View storefront <span aria-hidden="true">↗</span></Link>
      </div>

      <p className="admin-demo-note">
        Demo analytics · Values are calculated from the local sample catalog. There are no live sales, visitor, or customer metrics.
      </p>

      <div className="admin-metrics">
        <article className="admin-metric">
          <span>Catalog fragrances</span>
          <strong>{products.length}</strong>
          <small>Available in the storefront</small>
        </article>
        <article className="admin-metric">
          <span>Scent families</span>
          <strong>{families.length}</strong>
          <small>Distinct catalog categories</small>
        </article>
        <article className="admin-metric">
          <span>Average price</span>
          <strong>${averagePrice.toFixed(2)}</strong>
          <small>Across all listed fragrances</small>
        </article>
        <article className="admin-metric">
          <span>Featured fragrances</span>
          <strong>{featuredCount}</strong>
          <small>Highlighted on the storefront</small>
        </article>
      </div>

      <div className="admin-panels">
        <article className="admin-panel">
          <div className="admin-panel-heading">
            <div><p className="eyebrow">Catalog mix</p><h2>Fragrances by family</h2></div>
            <span>{products.length} total</span>
          </div>
          <div className="family-chart">
            {families.map((family) => (
              <div className="family-chart-row" key={family.name}>
                <div className="family-chart-label"><span>{family.name}</span><strong>{family.count}</strong></div>
                <div className="family-chart-track" role="img" aria-label={`${family.name}: ${family.count} ${family.count === 1 ? 'fragrance' : 'fragrances'}`}>
                  <span style={{ width: `${(family.count / maxFamilyCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel-heading">
            <div><p className="eyebrow">Editorial · {stories.length} stories</p><h2>Journal at a glance</h2></div>
            <Link className="text-link" to="/journal">Read stories <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="admin-story-list">
            {stories.map((story) => (
              <li key={story.id}>
                <span>{story.category}</span>
                <strong>{story.title}</strong>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <section className="admin-panel admin-catalog">
        <div className="admin-panel-heading">
          <div><p className="eyebrow">Product overview</p><h2>Your fragrance lineup</h2></div>
          <Link className="text-link" to="/collection">Open collection <span aria-hidden="true">→</span></Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Fragrance</th><th>Family</th><th>Price</th><th>Notes</th><th>Placement</th></tr></thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.name}</th>
                  <td>{product.family}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.notes.length}</td>
                  <td>{product.featured ? 'Featured' : 'Standard'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
