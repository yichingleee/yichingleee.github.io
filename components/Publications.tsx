import React from 'react';
import { Publication } from '../types';
import { FileText, Code2, Download } from 'lucide-react';

const publications: Publication[] = [
  {
    id: 'p1',
    title: 'Visually Explaining Transformer Attention',
    authors: ['Alex Chen', 'Sarah Jones', 'David Lee'],
    venue: 'CHI 2023',
    year: 2023,
    abstract: 'We present a novel visualization technique that aggregates attention heads to reveal semantic clusters in large language models.',
    pdfUrl: '#',
    codeUrl: '#'
  },
  {
    id: 'p2',
    title: 'Direct Manipulation in Latent Space',
    authors: ['Alex Chen', 'Michael Brown'],
    venue: 'UIST 2022',
    year: 2022,
    abstract: 'A system allowing artists to control generative image models by directly manipulating features in the output image.',
    pdfUrl: '#',
    codeUrl: '#'
  },
  {
    id: 'p3',
    title: 'Auditing Bias in Code Generation Models',
    authors: ['Emily White', 'Alex Chen'],
    venue: 'CSCW 2022',
    year: 2022,
    abstract: 'An empirical study on the propagation of gender stereotypes in automated code completion tools.',
    pdfUrl: '#'
  }
];

const Publications: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Publications</h2>
            <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50/80 border border-indigo-100 rounded-full backdrop-blur-sm">
              Selected Works
            </span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-indigo-200 via-purple-200 to-transparent"></div>
        </div>
        
        <a 
          href="/cv.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-6 py-3 bg-white/60 hover:bg-white/90 border border-white/60 hover:border-indigo-200 rounded-full shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300 backdrop-blur-xl cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          <span className="text-slate-700 group-hover:text-indigo-700 font-medium text-sm transition-colors">Download CV</span>
          <Download size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors group-hover:translate-y-0.5 duration-300" />
        </a>
      </div>

      <div className="space-y-6">
        {publications.map((pub) => (
          <div 
            key={pub.id} 
            className="group relative bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-[1.01]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-indigo-500/80">
                   <span>{pub.year}</span>
                   <span className="w-1 h-1 rounded-full bg-indigo-300"></span>
                   <span>{pub.venue}</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                  {pub.pdfUrl && (
                    <a href={pub.pdfUrl} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all" title="View PDF">
                      <FileText size={18} />
                    </a>
                  )}
                  {pub.codeUrl && (
                    <a href={pub.codeUrl} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all" title="View Code">
                      <Code2 size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-900 transition-colors">
                  {pub.title}
                </h3>
                
                <p className="text-sm text-slate-500 mb-3">
                  {pub.authors.map((author, i) => (
                    <span key={i} className={author === 'Alex Chen' ? 'font-semibold text-slate-800' : ''}>
                      {author}{i < pub.authors.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-indigo-100 pl-4 py-1">
                  {pub.abstract}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;