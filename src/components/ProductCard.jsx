import { useOutletContext } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToBag } = useOutletContext();

  return (
    <article className="product-card">
      <div className={`product-image-wrap scent-product-${product.colorway}`}>
        <img className="product-image" src={product.image} alt={product.imageAlt} loading="lazy" />
        {product.featured ? <span className="product-stamp">A little story</span> : null}
        <button className="quick-add" type="button" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>
          +
        </button>
      </div>
      <div className="product-copy">
        <div className="product-title-row">
          <div>
            <span className="product-family">{product.family} · {product.size}</span>
            <h3>{product.name}</h3>
          </div>
          <span className="product-price">${product.price}</span>
        </div>
        <p className="product-tagline">{product.tagline}</p>
        <p className="product-notes">{product.notes.join(' · ')}</p>
      </div>
    </article>
  );
}
