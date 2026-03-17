import { Publication } from '../types';

export const publications: Publication[] = [
  {
    id: 'p1',
    title: 'Visually Explaining Transformer Attention',
    authors: ['Yi-Ching Lee', 'Sarah Jones', 'David Lee'],
    venue: 'CHI 2023',
    year: 2023,
    abstract: 'We present a novel visualization technique that aggregates attention heads to reveal semantic clusters in large language models.',
    pdfUrl: '#',
    codeUrl: '#'
  },
  {
    id: 'p2',
    title: 'Direct Manipulation in Latent Space',
    authors: ['Yi-Ching Lee', 'Michael Brown'],
    venue: 'UIST 2022',
    year: 2022,
    abstract: 'A system allowing artists to control generative image models by directly manipulating features in the output image.',
    pdfUrl: '#',
    codeUrl: '#'
  },
  {
    id: 'p3',
    title: 'Auditing Bias in Code Generation Models',
    authors: ['Emily White', 'Yi-Ching Lee'],
    venue: 'CSCW 2022',
    year: 2022,
    abstract: 'An empirical study on the propagation of gender stereotypes in automated code completion tools.',
    pdfUrl: '#'
  }
];
