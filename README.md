# Padron.jayvie

My Portfolio

Next.js 15 / React 19 portfolio with the existing fixed sidebar, seven section views, Framer Motion, and MapLibre location map.

## Local preview

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview, run `npm run build` followed by `npm start`.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```

The ESLint command uses the installed Next.js and TypeScript rules without an interactive setup step. No runtime dependencies were added for the redesign.

## Design and interactions

- Shared dark/light colors, borders, shadows, sizing, and motion tokens live in `src/app/globals.css`; the Tailwind `accent` color uses those tokens.
- `PortfolioApp.tsx` retains the one-section navigation model and resets scroll/focus when moving between sections.
- `Hero.tsx` and `ProfileShowcase.tsx` use short staggered entrances and a gentle mouse-only portrait tilt. The original portrait remains intact and uncropped.
- `PageEntrance.tsx` and `SectionReveal.tsx` use opacity and transforms; scroll reveals run once per mounted section. Reduced-motion preferences disable decorative movement.
- `ImageViewer.tsx` opens the original images in a native modal dialog, with Escape, backdrop closing, focus containment, and focus restoration.
- Music starts only after the music control is pressed. The original code references `public/portfolioMusic.mp3`, but that file is absent from this checkout. The control remains available; playback needs the original audio file.
- The map follows the selected theme and retains the existing coordinates, controls, and Google Maps link. External map tiles require network access.
- The contact form and API retain the existing validation, honeypot, and email behavior. Sending requires the existing `GMAIL_USER` and `GMAIL_APP_PASSWORD` environment configuration.

## Review notes

The redesign preserves `src/lib/data.ts`, all public assets, section labels and copy, the CV URL and filename, contact details, social links, project URLs, and the contact API. No deployment or push was performed.

Validation in the editing environment: production build, TypeScript, ESLint, source content comparison, and static rendering of all seven sections. Static checks cover the CV download attributes, image-viewer triggers, required form fields, and contact/project link destinations. They do not establish browser interaction behavior.

Browser and viewport testing could not run: the environment blocks local server sockets (`EPERM`), and package-registry DNS access prevented downloading Playwright. Before deployment, preview at mobile, tablet, and desktop widths; check section navigation, both themes, keyboard focus, reduced motion, CV download, image-viewer opening/closing, music with the original file, map controls, and native form validation. Do not submit a real message during review.
