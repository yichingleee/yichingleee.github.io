import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import GenerativeBackdrop from './components/GenerativeBackdrop';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  const handleScroll = () => {
    const sections = Object.values(SectionId);

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= -280 && rect.top <= 320) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <GenerativeBackdrop />

      <main id="main" className="site-main">
        <section id={SectionId.HOME} className="section hero">
          <Hero onExplore={() => scrollToSection(SectionId.PUBLICATIONS)} />
        </section>

        <section id={SectionId.ABOUT} className="section">
          <About />
        </section>

        <section id={SectionId.PUBLICATIONS} className="section">
          <Publications />
        </section>

        <section id={SectionId.PROJECTS} className="section">
          <Projects />
        </section>

        <section id={SectionId.CONTACT} className="section">
          <Contact />
        </section>
      </main>

      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
    </div>
  );
};

export default App;
