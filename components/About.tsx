import React, { CSSProperties } from 'react';

const reveal = (delay: number): CSSProperties => ({ '--delay': `${delay}s` } as CSSProperties);

const About: React.FC = () => {
  return (
    <>
      <div className="section-head">
        <span className="section-number">02</span>
        <div>
          <p className="section-kicker">Profile</p>
          <h2 className="section-title">About</h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-text reveal" style={reveal(0.1)}>
          <p>
            I am a physician-researcher and Ph.D. candidate in Computer Science at Stanford,
            building interactive intelligence for healthcare. My work blends human-centered
            design with multimodal machine learning to create tools that clinicians can trust,
            inspect, and adopt in practice.
          </p>
          <p>
            I focus on interactive clinical systems, medical computer vision, and model
            transparency. My projects span workflow studies, interface prototyping, and
            evaluation in real-world clinical settings.
          </p>
        </div>

        <div className="about-card reveal" style={reveal(0.2)}>
          <div className="about-row">
            <span className="about-label">Focus</span>
            <span>Interactive AI, Clinical Vision</span>
          </div>
          <div className="about-row">
            <span className="about-label">Methods</span>
            <span>HCI, Multimodal ML, Evaluation</span>
          </div>
          <div className="about-row">
            <span className="about-label">Collaborate</span>
            <span>Healthcare + ML Labs</span>
          </div>
          <div className="about-row">
            <span className="about-label">Based</span>
            <span>Stanford, CA</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
