import React from 'react';
import { SectionId } from '../types';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: SectionId.HOME, label: 'Home' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.PUBLICATIONS, label: 'Research' },
    { id: SectionId.PROJECTS, label: 'Projects' },
    { id: SectionId.CONTACT, label: 'Contact' }
  ];

  return (
    <nav className="nav-rail" aria-label="Section navigation">
      <div className="nav-track">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey ||
                  event.button !== 0
                ) {
                  return;
                }
                event.preventDefault();
                onNavigate(item.id);
              }}
              className={`nav-item ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
