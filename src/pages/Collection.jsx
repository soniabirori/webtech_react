import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const families = ['All scents', ...new Set(products.map((product) => product.family))];

export default function Collection() {
  const [activeFamily, setActiveFamily] = useState('All scents');
  const visibleProducts = activeFamily === 'All scents'
    ? products
    : products.filter((product) => product.family === activeFamily);

  return (
    <div className="page collection-page">
      <section className="page-intro">
        <p className="eyebrow">Small-batch fragrances, big main-character energy</p>
        <h1>The <em>collection.</em></h1>
        <p>Three little worlds. Find the one that feels most like yours.</p>
      </section>
      <div className="collection-toolbar">
        <div className="filter-list" role="group" aria-label="Filter fragrances by scent family">
          {families.map((family) => (
            <button
              type="button"
              key={family}
              className={`filter-chip${activeFamily === family ? ' selected' : ''}`}
              aria-pressed={activeFamily === family}
              onClick={() => setActiveFamily(family)}
            >
              {family}
            </button>
          ))}
        </div>
        <span>{visibleProducts.length} {visibleProducts.length === 1 ? 'fragrance' : 'fragrances'}</span>
      </div>
      <div className="product-grid collection-grid">
        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <aside className="collection-note"><span aria-hidden="true">✳</span><p>Every scent starts with a feeling. Pick the notes you love, then see where they take you.</p></aside>
    </div>
  );
}
