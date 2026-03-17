import React from 'react';
import { publications } from '../data/publications';

const Publications: React.FC = () => {
  return (
    <>
      <div className="section-head">
        <div className="section-title-group">
          <span className="section-number">03</span>
          <div>
            <p className="section-kicker">Selected Works</p>
            <h2 className="section-title">Publications</h2>
          </div>
        </div>
        <a className="btn btn-ghost" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
          Download CV
        </a>
      </div>

      <div className="pub-list">
        {publications.map((pub, index) => (
          <article
            key={pub.id}
            className="pub-item reveal"
            style={{ '--delay': `${0.1 + index * 0.06}s` } as React.CSSProperties}
          >
            <div className="pub-year">{pub.year}</div>
            <div>
              <h3 className="pub-title">{pub.title}</h3>
              <div className="pub-authors">
                {pub.authors.map((author, index) => (
                  <span key={author}>
                    {author === 'Yi-Ching Lee' ? <strong>{author}</strong> : author}
                    {index < pub.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
              <div className="pub-venue">{pub.venue}</div>
            </div>
            <div className="pub-actions">
              {pub.pdfUrl && (
                <a className="pub-link" href={pub.pdfUrl}>
                  PDF
                </a>
              )}
              {pub.codeUrl && (
                <a className="pub-link" href={pub.codeUrl}>
                  Code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Publications;
