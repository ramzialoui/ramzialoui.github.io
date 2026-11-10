# Ramzi Aloui — Portfolio

Personal portfolio of **Ramzi Aloui**, Web & Mobile Developer. Built with React 19, TypeScript, Vite 8, and Tailwind CSS v4.

Live site: **https://ramzialoui.github.io**

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion, Lucide icons

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

If Pages is not enabled yet: **Settings → Pages → Source → GitHub Actions**.

## Structure

```
src/
  components/   UI sections (Hero, About, Projects, Contact, ...)
  data/         Portfolio content (projects, skills, process)
  utils/        Helpers (sound, project filtering)
  assets/       Images bundled by Vite
```
