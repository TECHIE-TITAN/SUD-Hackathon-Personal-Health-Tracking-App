# Wellness Pet Dashboard

A gamified health and financial wellness dashboard where users take care of a virtual pet by completing real-life goals, earning points, and getting AI-personalized challenges.

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **AI Integration:** Google Gemini API (`@google/genai`)

## High-Level Overview

- **Virtual Pet:** Users interact with a virtual pet whose mood and happiness reflect their wellness progress.
- **Gamified Goals:** Complete health, financial, and social tasks to earn points and wellness coins.
- **AI Personalization:** Get personalized goals and quizzes using Google Gemini AI.
- **Leaderboard & Rewards:** Compete with friends, earn streaks, and redeem real-world rewards.
- **Community & Social:** Join events, challenge friends, share achievements, and learn from curated articles.

## Folder Structure

- `components/` - UI components (Pet, Leaderboard, TaskList, Modals, etc.)
- `services/` - AI service integration (Gemini)
- `types.ts` - TypeScript types and enums
- `constants.ts` - App constants and mock data

## Running Locally

**Prerequisites:** Node.js (v18+ recommended)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your Gemini API key in `.env.local`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run at [http://localhost:3000](http://localhost:3000)

## Deployment

- Build for production:
  ```bash
  npm run build
  ```
- Preview production build locally:
  ```bash
  npm run preview
  ```
- Deploy the `dist/` folder to your preferred static hosting (Vercel, Netlify, GitHub Pages, etc.)

## License

MIT
