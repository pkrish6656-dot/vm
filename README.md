# CinemaBox UI (Vite + React + TypeScript)

An original streaming-style UI scaffold built with Vite. It intentionally uses a general dark media-dashboard aesthetic and does **not** copy proprietary branding/assets.

## Features
- Hero banner with provider compliance panel
- Top navigation tabs
- Search filter
- Quality filter (SD/HD/Full HD/4K)
- Responsive media card grid with source labels
- Watchlist tab placeholder for future expansion

## Legal content model
The project now uses a `ContentProvider` abstraction (`src/content.ts`) so you can connect licensed or public-domain catalogs safely.

Current built-in provider:
- `legalDemoProvider`: demo-only provider with licensed and public-domain placeholder metadata.

- Hero banner
- Top navigation tabs
- Search filter
- Responsive media card grid
- Watchlist tab placeholder for future expansion

## Run
```bash
npm install
npm run dev
```

## Notes
This project ships mock catalog data only. Integrate licensed/authorized APIs before production use.
