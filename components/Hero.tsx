import React from 'react';
import { Github, Linkedin, Instagram, Mail, GraduationCap } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const profileImageUrl = new URL('../assets/profile_pic.jpeg', import.meta.url).href;

  return (
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="hero-eyebrow reveal" style={{ '--delay': '0.05s' } as React.CSSProperties}>
          Interactive Intelligence for Healthcare
        </p>
        <h1 className="hero-title reveal" style={{ '--delay': '0.12s' } as React.CSSProperties}>
          Yi-Ching Lee
        </h1>
        <p className="hero-subtitle reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
          Physician-researcher crafting trustworthy multimodal systems and clinical interfaces
          that transform how care teams interpret data.
        </p>

        <div className="hero-actions reveal" style={{ '--delay': '0.28s' } as React.CSSProperties}>
          <button className="btn btn-primary" onClick={onExplore} type="button">
            Explore Research
          </button>
          <a className="btn btn-ghost" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </div>

        <div className="hero-meta">
          <div className="meta-block reveal" style={{ '--delay': '0.34s' } as React.CSSProperties}>
            <span className="meta-label">Research</span>
            <span className="meta-value">HCI + Clinical AI</span>
          </div>
          <div className="meta-block reveal" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            <span className="meta-label">Focus</span>
            <span className="meta-value">Multimodal ML, CV</span>
          </div>
          <div className="meta-block reveal" style={{ '--delay': '0.46s' } as React.CSSProperties}>
            <span className="meta-label">Now</span>
            <span className="meta-value">Clinical systems pilots</span>
          </div>
        </div>

        <div className="hero-links reveal" style={{ '--delay': '0.52s' } as React.CSSProperties}>
          <a className="hero-link" href="mailto:jimmy890302@gmail.com" aria-label="Email">
            <Mail size={18} aria-hidden="true" focusable="false" />
          </a>
          <a
            className="hero-link"
            href="https://www.linkedin.com/in/yi-ching-lee-9b219a284/"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} aria-hidden="true" focusable="false" />
          </a>
          <a className="hero-link" href="https://www.instagram.com/j0302lee/" aria-label="Instagram">
            <Instagram size={18} aria-hidden="true" focusable="false" />
          </a>
          <a className="hero-link" href="https://github.com/yichingleee" aria-label="GitHub">
            <Github size={18} aria-hidden="true" focusable="false" />
          </a>
          <a className="hero-link" href="#" aria-label="Google Scholar">
            <GraduationCap size={18} aria-hidden="true" focusable="false" />
          </a>
        </div>
      </div>

      <div className="hero-panel reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
        <div className="hero-photo-slot" aria-label="Portrait">
          <img src={profileImageUrl} alt="Yi-Ching Lee portrait" width={723} height={1086} />
        </div>
        <div className="panel-card">
          <span className="panel-kicker">01</span>
          <h3 className="panel-title">Clinical Interface Design</h3>
          <p className="panel-text">
            Designing workflows that connect model insight with real-time clinical decisions.
          </p>
        </div>
        <div className="panel-card">
          <span className="panel-kicker">02</span>
          <h3 className="panel-title">Multimodal Diagnostics</h3>
          <p className="panel-text">
            Fusing imaging, text, and signals to surface transparent medical predictions.
          </p>
        </div>
        <div className="panel-card">
          <span className="panel-kicker">03</span>
          <h3 className="panel-title">Trust + Evaluation</h3>
          <p className="panel-text">
            Auditing model reliability with clinician-in-the-loop studies and pilots.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
