# Q-Data: Quantum-Ready Cybersecurity Datasets

[View the Q-Data project website](https://jobair-hossain.github.io/Q-Data/)

Q-Data is the public website and planned open-resource repository for the proposed NSF project:

**AIDatasets:Planning: Architecting a Reusable Q-Data Pipeline for Quantum-Ready AI-Enabled Cybersecurity Datasets**

The project will investigate how established cybersecurity datasets can be transformed into documented, reproducible, and independently reusable data products for quantum and hybrid quantum-classical machine learning.

## Purpose

This website was created to explain the project’s scientific motivation, proposed Q-Data architecture, pilot datasets, planning activities, evaluation criteria, governance approach, community process, and institutional roles.

If funded, the website and repository will document the project’s progress and provide a central location for its public resources. These resources are expected to include:

* the Q-Data specification and dataset-readiness rubric;
* source-audit reports and security-semantic schemas;
* reference curation, feature-reduction, and quantum-encoding workflows;
* benchmark definitions and matched classical and QML evaluation code;
* metadata templates, conformance tests, and reproducibility guidance;
* bounded alpha products developed from NIST TrojAI and EMBER2024;
* governance, contribution, correction, and versioning procedures; and
* workshop materials, planning findings, and the Impact Readiness Package.

All releases will include appropriate documentation, provenance, limitations, and licensing information. Existing datasets and model artifacts will be redistributed only when permitted by their licenses, access conditions, and security requirements.

> **Funding status.** The Q-Data project is pending funding through NSF Program Solicitation NSF 26-512. Content on this site reflects the proposed program as described in the submitted proposal.

## Run Locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build:github
```

The static deployment files are generated in `github-pages/`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and publishes the website whenever changes are pushed to the `main` branch.

## Project Structure

* `app/q-data-site.tsx` — website content and interactive components
* `app/globals.css` — layout and responsive visual design
* `app/layout.tsx` — metadata and document structure
* `github/` — static-site entry point
* `public/` — images and public assets
* `.github/workflows/deploy-pages.yml` — deployment workflow
