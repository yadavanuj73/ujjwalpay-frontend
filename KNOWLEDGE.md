# Project Knowledge (UjjwalPay)

## Purpose
This repository contains the UjjwalPay web application.

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js (Express) used for API endpoints (proxied from Vite during development)

## How the app runs
### Frontend
- Dev server: `npm run dev` (Vite)
- Build: `npm run build`
- Preview: `npm run preview` / `npm start`

### Backend
- Runs separately (Express)
- Frontend dev server proxies `/api/*` to `http://localhost:5000` (see `vite.config.js`)

## Key entry points
- `index.html`
  - Vite HTML entry that mounts the React app.
- `src/main.jsx`
  - React entry.
  - Renders `<App />`.
  - Contains an `ErrorBoundary` and a global handler for dynamic import failures.
- `src/App.jsx`
  - Main router + lazy loaded modules.
  - Wraps providers: language/auth/theme.

## Routing / Pages
Routing is defined in `src/App.jsx` using `react-router-dom`.

There are multiple “areas” of the app:
- Landing (public marketing pages)
  - `src/landing/*` (ex: `LandingPageFull.jsx`, `About.jsx`, `Contact.jsx`)
  - Also mirrored/expanded in `src/pages/*` (ex: `LandingPage.jsx`, `AboutPage.jsx`, etc.)
- Auth
  - `src/auth/*` (ex: `Login`, `AdminLogin`)
- Portal apps (role-based)
  - Retailer: `src/retailer/*`
  - Distributor: `src/distributor/*`
  - Super Distributor / Super Admin: `src/superadmin/*` and related route modules
  - Admin: `src/admin/*`

## State / Context
- `src/context/*`
  - `AuthContext`: authentication/session data
  - `LanguageContext`: UI language selection
  - `ThemeContext`: theme preferences

## UI Components
- Shared UI components live in `src/components/*`.
- Layout components for portal areas exist both in `src/components/*` (some) and in role folders.

Notable components:
- `src/components/Navbar.jsx`: top navigation
- `src/components/Footer.jsx`: site footer
- `src/components/Hero.jsx`: landing hero section
- `src/components/ElectricCards.jsx` + `src/components/ElectricCards.css`: landing feature cards section
- `src/components/VerticalCardSlider.jsx` + `.css`: vertical slider component

## Styling
- Global styles
  - `src/index.css`
  - `src/App.css`
- Component styles
  - Some components have dedicated CSS files (ex: `ElectricCards.css`, `VerticalCardSlider.css`).
- Tailwind
  - Tailwind is enabled via `@tailwindcss/vite` in `vite.config.js`.

## Assets
- `src/assets/*` and `public/*`
  - Images, icons, and any static files.

## Backend API (high-level)
- Backend lives in `backend/`.
- `backend/server.js`
  - Express server
  - Provides `/api/*` endpoints for login and other flows.
  - Uses JWT (`jsonwebtoken`) and email (`nodemailer`) helper from `backend/email.js`.

## Conventions (important for future edits)
- Prefer editing the authoritative source in `src/` (not `dist/`).
- Frontend API calls should target `/api/...` so the proxy works in dev.
- Many routes/pages are lazy-loaded; ensure new modules have correct default exports if added to `lazy()`.

## Where to change what (quick guide)
- Landing page layout/content
  - Start at `src/pages/LandingPage.jsx` or `src/landing/LandingPageFull.jsx` (depending on which is mounted by routes).
- Navigation
  - `src/components/Navbar.jsx`
- Electric feature cards
  - `src/components/ElectricCards.jsx`
  - `src/components/ElectricCards.css`
- Authentication
  - `src/auth/*` + `src/context/AuthContext`
- API logic
  - Frontend: `src/services/*`
  - Backend: `backend/server.js`
