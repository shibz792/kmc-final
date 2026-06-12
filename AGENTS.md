# KMC Project Notes

- Framework: React 19 with Vite 8 and hash-based client routing in `src/App.jsx`.
- Styling: Global site styles live in `src/App.css`; page-specific styles should remain scoped.
- Public assets: Place directly served assets in `public/` and reference them through `import.meta.env.BASE_URL`.
- Commands: `npm run dev`, `npm run lint`, `npm run build`, and `npm run preview`.
- Verification: Run lint and production build, then check changed routes at desktop and mobile widths. Confirm existing routes still render.
- Deployment: Apache fallback routing is configured in `.htaccess` and `public/.htaccess`.
