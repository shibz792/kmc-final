# AI Catlyst Migration Notes

The temporary KMC-hosted page is implemented in:

- `src/AICatlystPage.jsx`
- `src/AICatlystPage.css`
- `public/ai-catlyst-logo.png`

## Moving to a standalone site

1. Move the page component, scoped stylesheet, and logo asset into the new React project.
2. Replace `assetPath()` with the standalone site's asset helper.
3. Replace the KMC shared header/footer with the approved standalone shell while retaining the line `A Knight's Move Consulting Group Company`.
4. Update metadata, canonical URL, email handling, privacy links, and final legal wording.
5. Confirm the status of all three solutions and whether the focused implementation sprint wording remains approved.

## Redirect after migration

Add a permanent `301` redirect from `/ai-catlyst/` and the legacy `#ai-catlyst` entry point to the final standalone URL. Update KMC navigation and sitemap references, then monitor the redirect and new page for crawl errors.
