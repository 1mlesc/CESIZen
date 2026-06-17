# Audit TP DevOps

## Audit Atelier 1

| Question | Réponse |
| :--- | :--- |
| Nombre de branches actuelles ? | 13 branches avec git branch |
| Convention de nommage utilisée ? | Conventional Commits feat/fix/chore(scope) |
| Dernier message de commit — est-il formaté ? | Oui "feat(prisma): add seed script..." |
| Fichier .env.local dans .gitignore ? | Oui |
| Projet déjà connecté à Vercel ? | Oui |
| Y a-t-il des secrets dans l'historique Git ? | Non |

## 1.3 :
Enforcement status : Active
Target branches : default & main
Require a pull request before merging : Cocher
Required approvals 1

J'ai cocher ce champs pour pouvoir protéger le branche main de tous les merges. Ces merges doit être approuvés par au moins 1 personnes avant de pouvoir merger nos modifications et de mettre en route la CI/CD

Voici l'erreur que j'ai eu lorsque j'ai voulu push directement dans la main : 
remote: error: GH013: Repository rule violations found for refs/heads/main. [...] Changes must be made through a pull request

## 1.4 Scopes Module

| Scope | Module CSiZen | Type de commit typique |
| :--- | :--- | :--- |
| auth | Comptes utilisateurs | feat(auth): ajout connexion OAuth |
| tracker | Tracker d'émotions | feat(tracker): ajout calcul tendance |
| diagnostic | Questionnaire Holmes & Rahe | feat(diagnostic): ajout score |
| respiration | Cohérence cardiaque | feat(respiration): ajout exos |
| activites | Activités détente | feat(activites): ajout liste |
| infos | Pages d'informations | feat(infos): maj texte |
| ci | Pipeline CI/CD | chore(ci): maj workflow |
| docker | Conteneurisation | chore(docker): maj dockerfile |
| iac | Infrastructure as Code | chore(iac): ajout pulumi |
| deps | Dépendances | chore(deps): maj npm |

## 1.4 Test commits Husky/Commitlint

| Message de commit testé | Valide ? | Message d'erreur (si rejeté) |
| :--- | :--- | :--- |
| feat(tracker): ajout calcul tendance 7j | Oui | N/A |
| ajout calcul tendance | Non | type must be one of [build, chore, ...] |
| feat(tracker) : ajout tendance | Non | scope must be lowercase |
| chore: config husky | Oui | N/A |

## 2.1 Exercice transformation

| Message original | Conventional Commit | Impact SemVer |
| :--- | :--- | :--- |
| Ajout page diagnostic stress | feat(diagnostic): add stress page | Mineur |
| Fix bug calcul score H&R | fix(diagnostic): fix H&R score calculation | Moyen |
| MAJ Next.js 14 vers 15 | chore(deps): upgrade Next.js 14 to 15 | Majeur |
| Suppression console.log | chore: remove prod logs | Moyen |
| BREAKING: refonte API emotions | feat(emotions)!: refactor API | Majeur |
| Ajout pipeline GHA | ci: add GHA pipeline | Aucun |
| Correction typo README | docs: fix README typo | Moyen |
| Nouveau composant BreathingTimer | feat(respiration): add BreathingTimer | Mineur |

## 2.2 Scénarios commits

| Situation | Type | Scope | Message complet | Version |
| :--- | :--- | :--- | :--- | :--- |
| Score Holmes retourne NaN | fix | diagnostic | fix(diagnostic): handle empty array | Moyen |
| Rename emotion en feeling | feat | emotions | feat(emotions)!: rename field | Majeur |
| Ajout test Vitest | test | tracker | test(tracker): add getMoodTrend test | Aucun |
| MAJ Supabase 2 vers 3 | chore | deps | chore(deps): upgrade Supabase 2 to 3 | Majeur |
| Faute dans CONTRIBUTING | docs | doc | docs: fix CONTRIBUTING typo | Moyen |

## 3.3 Secrets GitHub

| Variable | Sensible ? | Build-time ? | Runtime ? | Secret GitHub créé ? |
| :--- | :--- | :--- | :--- | :--- |
| NEXT_PUBLIC_SUPABASE_URL | Non | Oui | Oui | Oui |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Non | Oui | Oui | Oui |
| DATABASE_URL_PROD | Oui | Non | Oui | Oui |
| AUTH_SECRET | Oui | Non | Oui | Oui |

## 3.4 Analyse logs

| Job | Durée run 1 | Durée run 2 | Durée run 3 | Moyenne |
| :--- | :--- | :--- | :--- | :--- |
| quality | ~15s | ~15s | ~15s | 15s |
| tests (Node 18) | ~20s | ~20s | ~20s | 20s |
| tests (Node 20) | ~20s | ~20s | ~20s | 20s |
| tests (Node 22) | ~20s | ~20s | ~20s | 20s |
| build | ~40s | ~40s | ~40s | 40s |
| Total pipeline | ~1m30s | ~1m30s | ~1m30s | 1m30s |

Goulot d'étranglement: `build`. Compilation Next.js prend plus de temps.

## 3.5 Status checks

Message GitHub blocage: `Required status check "Tests unitaires (Node 20)" failed.`

## 4.1 Parallélisation

| Métrique | Pipeline séquentiel | Pipeline parallèle | Gain (%) |
| :--- | :--- | :--- | :--- |
| Durée totale | 1m30s | 55s | ~40% |
| Lead Time estimé | 1.5 min | 0.9 min | 0.6 min |

Phrase: `needs: [quality, tests, security]` force `build` attendre les 3. `needs: quality` lance `tests` dès `quality` fini.

## 4.2 Job security

Niveau: `--audit-level=high`. Justification: Ignorer alertes LOW/MODERATE non-bloquantes en CI.

| Niveau | Nombre de vulnérabilités | Action requise ? |
| :--- | :--- | :--- |
| CRITICAL | 0 | Non |
| HIGH | 1 | npm audit fix |
| MODERATE | 1 | Non |
| LOW | 0 | Non |

## 4.3 Cache npm

| | Avec cache | Sans cache | Différence |
| :--- | :--- | :--- | :--- |
| Durée étape npm ci | ~5s | ~25s | ~20s |
| Durée totale job quality | ~12s | ~35s | ~23s |
| Taille cache GHA | 150 Mo | N/A | N/A |

## 4.4 Badges README

| Badge | Snippet Markdown complet |
| :--- | :--- |
| CI | `[![CI](https://github.com/1mlesc/CESIZen/actions/workflows/ci.yml/badge.svg)](https://github.com/1mlesc/CESIZen/actions/workflows/ci.yml)` |
| Release | `[![Release](https://img.shields.io/github/v/release/1mlesc/CESIZen)](https://github.com/1mlesc/CESIZen/releases)` |
| Licence | `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)` |
| Dernier commit | `[![Last Commit](https://img.shields.io/github/last-commit/1mlesc/CESIZen)](https://github.com/1mlesc/CESIZen/commits/main)` |

## 5.2 Cartographie fonctions à tester

| Fichier | Fonction / Composant | Module | Priorité | Complexité |
| :--- | :--- | :--- | :--- | :--- |
| utils/stressScore.ts | calculateStressScore() | Diagnostic | Haute | Moyenne |
| utils/breathingTimer.ts | getBreathingPhase() | Respiration | Haute | Faible |
| actions/authActions.ts | loginUser() | Auth | Haute | Moyenne |
| actions/contenuActions.ts | getContenus() | Infos | Moyenne | Faible |
| controllers/userController.ts| getUserProfile() | Auth | Haute | Moyenne |
| components/NavBar.tsx | NavBar | UI | Basse | Faible |
| lib/db.ts | dbConnect() | Base | Haute | Faible |
| middleware.ts | middleware() | Auth | Haute | Haute |

## 5.4 TDD nouvelles fonctionnalités

Fonctionnalité 1 : /api/health
Fonctionnalité 2 : getStreakDays()

| Cycle TDD | Fonctionnalité 1 (/api/health) | Fonctionnalité 2 (streak) |
| :--- | :--- | :--- |
| Nb de tests écrits avant le code | 3 | 4 |
| Tests qui passaient au rouge (%) | 100% | 100% |
| Temps pour passer au vert | 15 min | 25 min |
| Refactoring effectué ? | Non | Oui (extraction logique date) |
| Couverture obtenue | 100% | 100% |


