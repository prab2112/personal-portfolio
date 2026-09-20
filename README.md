# Personal Portfolio — 3D Island

An interactive 3D portfolio site inspired by [bruno-simon.com](https://bruno-simon.com/) —
instead of scrolling through sections, visitors walk a small character around a
floating island to find **About**, **Projects**, **Contact**, and **Résumé**.

Built with React Three Fiber (Three.js) and Rapier physics, all client-side —
no backend required.

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) — React renderer for Three.js
- [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) — physics (movement, gravity, collisions)
- [@react-three/drei](https://github.com/pmndrs/drei) — R3F helpers (sky, text, keyboard controls)
- [zustand](https://github.com/pmndrs/zustand) — lightweight UI state (which modal is open, current zone, etc.)

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Controls

| Action   | Keyboard        | Touch (mobile)        |
| -------- | ---------------- | ---------------------- |
| Move     | `WASD` / arrows   | on-screen joystick      |
| Interact | `E` / `Space` / `Enter` | INTERACT button   |
| Close modal | `Esc`          | tap outside the card / ✕ |

Walking near a pedestal or zone shows a "Press E" prompt at the bottom of the
screen; pressing it opens a panel with that section's content.

## Editing your own content

Everything you'd want to personalize lives in two files — no need to touch
any of the 3D/game code:

- **`src/content/content.ts`** — your name, tagline, bio, project list,
  social links, and résumé path. Add/remove entries in the `projects` array
  freely; the world automatically generates one pedestal per project.
- **`src/content/layout.ts`** — where each zone sits on the island, its
  radius, and color, if you want to rearrange the world.
- **`public/`** — drop a `resume.pdf` here (referenced by `resumeUrl` in
  `content.ts`) and any other static assets (favicon, etc).

## Project structure

```
src/
  components/     3D scene: Player, World (terrain/decor), Zones, CameraRig, Experience
  content/        editable text content + world layout config
  input/          shared touch-joystick input state
  state/          shared player-position state (avoids re-renders)
  store/          zustand store (game phase, active zone/modal)
  ui/             HTML overlay: start/loading screens, HUD, modal, touch controls
```

## Deploying

This repo ships with a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the site and deploys it to
**GitHub Pages** automatically on every push to `main`.

One-time setup on GitHub (only needed once per repo):

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions** (skip this if it was already configured for you).
3. Push to `main` — the workflow builds and deploys automatically. Check
   progress under the **Actions** tab.
4. Your live site will be at:
   `https://<your-github-username>.github.io/<repo-name>/`

### Deploying elsewhere (Vercel / Netlify)

The site is a static build (`npm run build` → `dist/`), so it deploys to any
static host with zero config:

- **Vercel**: import the GitHub repo at [vercel.com/new](https://vercel.com/new) — it auto-detects Vite. Leave the base path as `/` (set `VITE_BASE_PATH=/` or just omit it, since Vercel serves from the domain root).
- **Netlify**: import the repo, build command `npm run build`, publish directory `dist`.

Note: the GitHub Pages workflow sets `VITE_BASE_PATH` to `/<repo-name>/`
because project Pages sites aren't served from the domain root. Vercel/Netlify
serve from the root, so leave `VITE_BASE_PATH` unset there.
