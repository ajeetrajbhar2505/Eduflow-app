# Eduflow (Stitch-derived UI)

AI-powered online examination and competitive learning platform scaffolded from Stitch designs.

## Prerequisites
- Node 20+
- npm 10+

## Setup
1) Install deps (includes Tailwind + Ionic):
```bash
npm install
```
If your existing node_modules predates this change, also install dev deps explicitly:
```bash
npm install -D tailwindcss postcss autoprefixer
```
2) Run dev server:
```bash
npm start
```
App serves at http://localhost:4200.

## Structure
- `src/app/features/onboarding` – Splash, hero, login, OTP, social loading, biometric, reset flows.
- `src/app/features/shell` – Authenticated placeholder; future folders plug in here.
- `src/app/core` – Guards, auth + security interceptors, onboarding flow state, mock data.
- `tailwind.config.js` / `postcss.config.cjs` – Tailwind pipeline enabled via `src/global.scss`.

## Current coverage
- Onboarding folder (screens 69, 219, 218, 223, 216, 180, 212) implemented with responsive Tailwind + Ionic primitives.
- Auth guard + OTP mock (`246810`) routes to `/workspace` after verification.

## Next steps
- Flesh out Folder 2–7 screens as lazy-loaded feature routes under `workspace`.
- Wire real APIs for auth/OTP, biometric WebAuthn, and exam data feeds.
- Add NgRx or signals-based store for session + catalog; integrate PDF export and PWA/i18n configs.
