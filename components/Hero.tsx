import React from 'react';
import { ArrowDown, Github, Twitter, Linkedin } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-20 pb-20">
      <div className="max-w-4xl w-full mx-auto text-center space-y-8 z-10">
        
        <div className="inline-block animate-fade-in-up">
          <span className="px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50/50 text-indigo-600 text-xs font-medium tracking-wide uppercase backdrop-blur-sm">
            Ph.D. Candidate @ Stanford
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight">
          Designing the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Future of Interaction
          </span>
        </h1>

        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          I'm Alex Chen. I research <span className="font-semibold text-slate-800">Human-AI Collaboration</span> and build tools that make complex machine learning models interpretable and accessible.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <a href="#" className="p-3 text-slate-500 hover:text-indigo-600 hover:bg-white/80 rounded-full transition-all border border-transparent hover:border-indigo-100 hover:shadow-lg">
            <Github size={24} />
          </a>
          <a href="#" className="p-3 text-slate-500 hover:text-sky-500 hover:bg-white/80 rounded-full transition-all border border-transparent hover:border-sky-100 hover:shadow-lg">
            <Twitter size={24} />
          </a>
          <a href="#" className="p-3 text-slate-500 hover:text-blue-700 hover:bg-white/80 rounded-full transition-all border border-transparent hover:border-blue-100 hover:shadow-lg">
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow z-10">
        <button 
          onClick={onExplore}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest opacity-70">Explore Research</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;