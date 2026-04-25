# Project Table of Contents

## Root
- `index.html` - Vite HTML entry point
- `package.json` - frontend scripts/dependencies
- `vite.config.js` - Vite config + `/api` proxy to backend
- `dist/` - production build output (generated)
- `public/` - static files

## Frontend (`src/`)
- `main.jsx` - React entry + ErrorBoundary
- `App.jsx` - router + provider wiring + lazy loaded modules
- `App.css` - app-level CSS
- `index.css` - global CSS / Tailwind base

### Landing / Marketing
- `landing/`
  - `LandingPageFull.jsx`
  - `About.jsx`
  - `Contact.jsx`
  - `Leadership.jsx`
  - `ServicesPageFull.jsx`
- `pages/`
  - `LandingPage.jsx`
  - `AboutPage.jsx`
  - `ContactPage.jsx`
  - `ServicesPage.jsx`
  - `PortalPage.jsx`
  - `APIDocsPage.jsx`

### Shared components (`src/components/`)
- `Navbar.jsx`
- `Footer.jsx`
- `Hero.jsx`
- `ElectricCards.jsx` + `ElectricCards.css`
- `VerticalCardSlider.jsx` + `VerticalCardSlider.css`

### Role-based portals
- `retailer/` - Retailer UI, pages, and components
- `distributor/` - Distributor UI, pages, and components
- `superadmin/` - SuperAdmin/SuperDistributor UI, pages, and components
- `admin/` - Admin UI, pages, and components

### Context
- `context/` - Auth/Language/Theme providers

### Services
- `services/` - frontend API/service helpers

### Assets
- `assets/` - bundled assets

## Backend (`backend/`)
- `server.js` - Express API server
- `email.js` - email helper (nodemailer)
- `package.json` - backend dependencies/scripts

## Notes
- Edit source under `src/`. Do not manually edit `dist/`.
- In dev, call APIs via `/api/...` to use Vite proxy.
