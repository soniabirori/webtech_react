import { useOutletContext } from 'react-router-dom';

export default function FeaturedScentCard({ product, number }) {
  const { addToBag } = useOutletContext();

  return (
    <article className="ss-product-card">
      <div className={`ss-product-art-wrap ss-product-art-${product.colorway}`}>
        <img className="ss-product-photo" src={product.image} alt={product.imageAlt} loading="lazy" />
        <span className="ss-product-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
        <button
          className="ss-quick-add"
          type="button"
          onClick={() => addToBag(product)}
          aria-label={`Add ${product.name} to bag`}
        >
          +
        </button>
      </div>
      <div className="ss-product-info">
        <p className="ss-product-family">{product.mood}</p>
        <div className="ss-product-title-row">
          <h3>{product.name}</h3>
          <span>${product.price}</span>
        </div>
        <p className="ss-product-description">{product.description}</p>
      </div>
    </article>
  );
}
