import React, { CSSProperties } from 'react';

const reveal = (delay: number): CSSProperties => ({ '--delay': `${delay}s` } as CSSProperties);

const Contact: React.FC = () => {
  return (
    <>
      <div className="section-head">
        <span className="section-number">05</span>
        <div>
          <p className="section-kicker">Connect</p>
          <h2 className="section-title">Work Together</h2>
        </div>
      </div>

      <div className="contact-block reveal" style={reveal(0.1)}>
        <h3 className="contact-title">Open to research collaborations and clinical pilots.</h3>
        <p className="contact-text">
          If you are building healthcare tools, exploring multimodal models, or evaluating
          interactive clinical systems, I would love to compare notes and collaborate.
        </p>
        <a className="contact-email" href="mailto:jimmy890302@gmail.com">
          jimmy890302@gmail.com
        </a>
      </div>
    </>
  );
};

export default Contact;
