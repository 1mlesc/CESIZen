# POSTMORTEM

## En-tête
- **Date** : 17/06/2026
- **Sévérité** : P1
- **Durée** : 45 minutes
- **Auteur** : opencode

## Chronologie
| Heure | Événement |
| :--- | :--- |
| H+00 | Merge PR sur main contenant le bug |
| H+05 | Déploiement Vercel production terminé |
| H+07 | Smoke tests échouent en prod (alerte) |
| H+15 | Analyse logs, identification bug runtime |
| H+25 | Décision rollback |
| H+30 | Vercel Promote ancienne version |
| H+45 | Hotfix codé, testé, mergé |

## Cause racine
TypeScript compile car le typage est correct au build-time, mais les données dynamiques au runtime (ex: API externe, DB vide) cassent l'exécution non-gérée.

## 5 Pourquoi
1. Pourquoi erreur prod ? Variable indéfinie lue.
2. Pourquoi indéfinie ? API a retourné null.
3. Pourquoi pas géré ? Code suppose données toujours présentes.
4. Pourquoi TS n'a pas vu ? Typage `any` ou cast forcé.
5. Pourquoi CI n'a pas vu ? Pas de tests E2E/smoke tests sur données réelles ou mocked strictes.

## Impact
- **Durée indisponibilité** : 25 min (jusqu'au rollback).
- **MTTR** : 25 min.
- **Pilier CALMS** : Measurement (détection rapide grâce aux smoke tests) & Automation (rollback Vercel).

## Actions correctives
- **Fait** : Rollback Vercel immédiat.
- **À faire** : Ajouter tests d'intégration stricts sur les appels API.

## Leçon
Ne jamais `as Type` en TypeScript sans validation de schéma (Zod). CI doit inclure smoke test E2E.
