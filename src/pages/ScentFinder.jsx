import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const moods = [
  { label: 'Fresh start', family: 'Fresh', symbol: '☼', description: 'Bright, green, and full of possibility.' },
  { label: 'After hours', family: 'Soft', symbol: '☁', description: 'Warm woods, quiet spice, and a close-to-you feeling.' },
  { label: 'Golden evening', family: 'Warm', symbol: '◒', description: 'Warm light, soft petals, and nowhere to rush.' },
];

export default function ScentFinder() {
  const [selectedMood, setSelectedMood] = useState(null);
  const matchingProduct = products.find((product) => product.family === selectedMood?.family);

  return (
    <div className="page finder-page">
      <section className="page-intro finder-intro">
        <p className="eyebrow">A tiny bit of scent intuition</p>
        <h1>How does today <em>feel?</em></h1>
        <p>There are no wrong answers. Pick a mood, and we’ll find the scent story that might fit.</p>
      </section>
      <section className="mood-grid" aria-label="Choose the mood that feels right">
        {moods.map((mood) => (
          <button
            key={mood.family}
            className={`mood-card${selectedMood?.family === mood.family ? ' selected' : ''}`}
            type="button"
            aria-pressed={selectedMood?.family === mood.family}
            onClick={() => setSelectedMood(mood)}
          >
            <span className="mood-symbol" aria-hidden="true">{mood.symbol}</span>
            <span className="mood-title">{mood.label}</span>
            <span className="mood-description">{mood.description}</span>
          </button>
        ))}
      </section>
      {matchingProduct ? (
        <section className="finder-result" aria-live="polite">
          <div className="finder-result-copy">
            <p className="eyebrow">Your story for today</p>
            <h2>{matchingProduct.name}</h2>
            <p>{matchingProduct.description}</p>
          </div>
          <div className="finder-result-product"><ProductCard product={matchingProduct} /></div>
        </section>
      ) : (
        <p className="finder-prompt">Choose a mood above and your scent story will appear right here.</p>
      )}
      <p className="finder-footnote">Think of it as a starting point, not a rule. The best scent is the one that feels like you.</p>
    </div>
  );
}
