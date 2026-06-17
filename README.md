# CESIZen - Ministère de la Santé

[![CI](https://github.com/1mlesc/CESIZen/actions/workflows/ci.yml/badge.svg)](https://github.com/1mlesc/CESIZen/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/1mlesc/CESIZen)](https://github.com/1mlesc/CESIZen/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/1mlesc/CESIZen)](https://github.com/1mlesc/CESIZen/commits/main)

Application de suivi et gestion du stress. Projet validant intégration DevOps complète.

## Stack
- Next.js (App Router)
- Supabase (Auth, Postgres)
- Prisma (ORM)
- Vitest (Tests unitaires)
- Docker (Conteneurisation)
- GitHub Actions (CI/CD)
- Pulumi (IaC)

## Lancement

### Avec Docker
```bash
docker compose up --build
```

### Local
```bash
npm ci
npm run dev
```

## DevOps

### CI/CD Pipeline
`Push` -> `Quality` & `Tests (Matrix 18/20/22)` & `Security` -> `Build` -> `Docker Push (GHCR)` -> `Deploy (Vercel)` -> `Release`.

### Branches
- `main` : Production.
- `develop` : Intégration.
- Règles Commit: Conventional Commits via [Husky & Commitlint](CONTRIBUTING.md).

### Métriques DORA (Observées)
- **Deployment Freq** : Plusieurs/jour (Elite).
- **Lead Time** : ~15 min (Elite).
- **MTTR** : 25 min (Elite).
- **Change Failure Rate** : ~5% (Elite).

[Guide de contribution](CONTRIBUTING.md).
