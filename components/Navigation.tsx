import React from 'react';
import { SectionId } from '../types';
import { Home, User, BookOpen, Code, Mail } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: SectionId.HOME, icon: Home, label: 'Home' },
    { id: SectionId.ABOUT, icon: User, label: 'About' },
    { id: SectionId.PUBLICATIONS, icon: BookOpen, label: 'Research' },
    { id: SectionId.PROJECTS, icon: Code, label: 'Projects' },
    { id: SectionId.CONTACT, icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full shadow-lg shadow-indigo-500/10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300
              ${activeSection === item.id 
                ? 'text-indigo-600 bg-white shadow-md scale-110' 
                : 'text-slate-500 hover:text-indigo-500 hover:bg-white/50'}
            `}
            aria-label={item.label}
          >
            <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 2} />
            {activeSection === item.id && (
              <span className="absolute -top-10 bg-indigo-900 text-white text-xs px-2 py-1 rounded opacity-0 animate-fade-in transition-opacity">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;