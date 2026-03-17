<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Alex Chen — Research Portfolio

Single-page research portfolio built with React + Vite. It features a fluid 3D background, scroll-aware navigation, publication and project highlights, and an optional Gemini-powered chat assistant.

## Features
- Hero, About, Publications, Projects, and Contact sections with smooth scroll navigation
- Animated fluid shader background via `@react-three/fiber` and `three`
- Publication and project data stored in `components/Publications.tsx` and `components/Projects.tsx` for easy editing
- Optional Gemini chat widget (`components/ChatWidget.tsx`), toggle by uncommenting `<ChatWidget />` in `App.tsx`
- Tailwind via CDN, Lucide icons, and Vite configured for GitHub Pages (`base: /yichinglee.github.io/`)

## Tech Stack
- React 19 with TypeScript and Vite
- Tailwind CSS (CDN), Lucide icons
- `@react-three/fiber` + `three` for the background
- `@google/genai` for the chat assistant (requires API key)

## Getting Started
**Prerequisites:** Node.js 18+ recommended

1) Install dependencies:  
   `npm install`
2) Configure environment (required for chat widget): create `.env.local` with  
   `GEMINI_API_KEY=your_gemini_api_key`
3) Start dev server (defaults to port 3000):  
   `npm run dev`
4) Build for production:  
   `npm run build`
5) Preview the production build locally:  
   `npm run preview`

## Customization
- Update hero/about content in `App.tsx` and `components/Hero.tsx`
- Edit publications and projects in `components/Publications.tsx` and `components/Projects.tsx`
- Adjust contact email in `App.tsx` and social links in `components/Hero.tsx`
- Change deploy base path in `vite.config.ts` if serving from a different URL
