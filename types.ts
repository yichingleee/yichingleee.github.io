export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  pdfUrl?: string;
  codeUrl?: string;
  abstract: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  github?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  PUBLICATIONS = 'publications',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}