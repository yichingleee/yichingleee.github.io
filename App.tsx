import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import { FluidBackground } from './components/FluidBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Publications from './components/Publications';
import Projects from './components/Projects';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  const handleScroll = () => {
    // Simple scroll spy logic
    const sections = Object.values(SectionId);
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= -300 && rect.top <= 400) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-800">
      {/* 3D Background */}
      <FluidBackground />
      
      {/* Main Content */}
      <main className="relative z-10 pb-32">
        <section id={SectionId.HOME}>
          <Hero onExplore={() => scrollToSection(SectionId.PUBLICATIONS)} />
        </section>

        <section id={SectionId.ABOUT} className="py-20 px-6">
          <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md border border-white/60 p-8 md:p-12 rounded-3xl shadow-sm">
             <h2 className="text-3xl font-bold mb-6">About Me</h2>
             <p className="text-lg leading-relaxed text-slate-700 mb-6">
               I am currently pursuing my Ph.D. in Computer Science at Stanford University, advised by Prof. Jane Doe. 
               My work lies at the intersection of <strong className="text-indigo-600 font-medium">Human-Computer Interaction</strong> and <strong className="text-indigo-600 font-medium">Artificial Intelligence</strong>.
             </p>
             <p className="text-lg leading-relaxed text-slate-700">
               Previously, I completed my undergrad at MIT. When I'm not training models or running user studies, you can find me hiking the trails of the Bay Area or experimenting with pour-over coffee recipes.
             </p>
          </div>
        </section>

        <section id={SectionId.PUBLICATIONS}>
          <Publications />
        </section>

        <section id={SectionId.PROJECTS}>
          <Projects />
        </section>

        <section id={SectionId.CONTACT} className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
             <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
             <p className="text-xl text-slate-600 mb-10">
               I'm always open to discussing new research collaborations or interesting ideas.
             </p>
             <a 
               href="mailto:alex.chen@example.com" 
               className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-500/30"
             >
               <span>alex.chen@example.com</span>
             </a>
          </div>
        </section>
      </main>

      {/* Floating Elements */}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      {/*<ChatWidget />*/}
      
    </div>
  );
};

export default App;