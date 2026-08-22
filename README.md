# Q-Data: Quantum-Ready Cybersecurity Datasets

An interactive, reviewer-facing website for the proposed NSF AI Datasets planning project:

**AIDatasets:Planning: Architecting a Reusable Q-Data Pipeline for Quantum-Ready AI-Enabled Cybersecurity Datasets**

The site explains the scientific gap, Q-Data architecture, NIST TrojAI and EMBER2024 pilots, five readiness gates, four work packages, 24-month timeline, evaluation criteria, community process, governance, collaborative structure, and Impact Readiness Package.

> **Funding status.** The Q-Data project is pending funding through NSF Program Solicitation NSF 26-512. Content on this site reflects the proposed program as described in the submitted proposal.

## Publish with GitHub Pages

1. Create a GitHub repository and copy this project into it.
2. Commit and push the files to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. The included workflow builds and publishes the site after each push to `main`.

The live URL will normally be:

`https://<github-username>.github.io/<repository-name>/`

## Run locally

```bash
npm install
npm run dev
```

## Build the static GitHub Pages version

```bash
npm run build:github
```

The deployable static files are written to `github-pages/`.

## Project structure

- `app/q-data-site.tsx` — site content and interactivity
- `app/globals.css` — responsive visual system
- `github/` — static Vite entry point
- `public/og.png` — social-sharing image
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment
- `github-pages/` — generated static output after building

## Before publication

If the final repository name differs from `q-data-planning`, update the `metadataBase` value in `app/layout.tsx`. You may also replace the contact or resource links as the proposal develops.
