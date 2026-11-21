import { Link } from 'react-router-dom';
import { stories } from '../data/stories';

export default function Journal() {
  return (
    <div className="page stories-page">
      <section className="page-intro stories-intro">
        <p className="eyebrow">Notes from the Scent Stories journal</p>
        <h1>Little things, <em>lingering.</em></h1>
        <p>Thoughts on scent, memory, and making the everyday feel a little more like yours.</p>
      </section>
      <section className="stories-grid">
        {stories.map((story, index) => (
          <article className={`journal-card${index === 0 ? ' journal-card-featured' : ''}`} key={story.id}>
            <div className="journal-image"><img src={story.image} alt={story.imageAlt} loading="lazy" /></div>
            <div className="journal-copy">
              <div className="journal-meta"><span>{story.category}</span><span>{story.date}</span></div>
              <h2>{story.title}</h2>
              <p>{story.body}</p>
              <Link to="/collection" className="text-link">Find a scent to go with it <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </section>
      <section className="newsletter-note">
        <span aria-hidden="true">✳</span><p>A little reminder: you do not need a special occasion to feel special.</p>
      </section>
    </div>
  );
}
