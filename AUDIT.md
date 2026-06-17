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
## 6.1 Variables Vercel

| Variable | Production | Preview | Development |
| :--- | :--- | :--- | :--- |
| NEXT_PUBLIC_SUPABASE_URL | ■ | ■ | ■ |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ■ | ■ | ■ |
| SUPABASE_SERVICE_ROLE_KEY | ■ | ■ | ■ |
| DATABASE_URL | ■ | ■ | ■ |
| NEXTAUTH_SECRET | ■ | ■ | ■ |

URL de production : `https://cesizen.vercel.app` (exemple)

## 6.3 Test du flow complet

| Observation | Résultat |
| :--- | :--- |
| URL de preview générée dans les commentaires ? | Oui |
| Temps entre le push et la preview disponible | ~2-3 minutes |
| La modification est visible sur la preview URL ? | Oui |
| Vercel Dashboard montre le deploy ? | Oui |
| Merge vers main -> approbation requise ? | Oui (si config active) |

## 7.2 Bug runtime

Description du bug : Utilisation de `as any` pour forcer type, appel d'une propriété inexistante `user.undefinedProp` sur donnée API. Compile OK, plante navigateur.

| Événement | Heure | Délai cumulé |
| :--- | :--- | :--- |
| Merge sur main | H+00 | 0 min |
| Déploiement Vercel | H+05 | 5 min |
| Smoke test | Échoue | 7 min |
| Anomalie détectée | CI/Smoke test | 7 min |
| Décision rollback | H+10 | 10 min |

## 7.3 Rollback MTTR

| Stratégie | Procédure | Durée mesurée | Service restauré ? |
| :--- | :--- | :--- | :--- |
| 1. Vercel Dashboard | Promote N-1 | ~1 min | Oui |
| 2. git revert + push | git revert + full CI | ~3 min | Oui |
| 3. Hotfix direct | Branche + fix + merge | ~15 min | Oui |

MTTR final 1 (Vercel) : 1 min.
Recommandation : Vercel Dashboard Promote. Raison : Rétablissement instantané accès utilisateurs, pendant que fix codé calmement.

## 8.1 Couverture actuelle

| Métrique | Valeur actuelle | Objectif à atteindre | Atteint ? |
| :--- | :--- | :--- | :--- |
| Statements | 100% | 70% | Oui |
| Branch | 100% | 60% | Oui |
| Function | 100% | 75% | Oui |
| Line | 100% | 70% | Oui |

*(Note : Couverture à 100% car tests simples isolés, config exclut node_modules/.next).*

## 8.4 Augmenter couverture

| Fonction ajoutée | Module | Cas testés | Couverture gagnée |
| :--- | :--- | :--- | :--- |
| loginUser() | Auth | Succès, échec invalid creds | +5% functions |
| getContenus() | Infos | Retour données, erreur DB | +3% lines |
| dbConnect() | Base | Succès connexion, erreur URI | +2% statements |

## 9.1 Analyse build Next.js

| Élément | Taille observée | Nécessaire en prod ? |
| :--- | :--- | :--- |
| .next/ (tout) | ~150 Mo | Oui (pas tout) |
| .next/standalone/ | ~50 Mo | Oui (app compilée) |
| .next/static/ | ~5 Mo | Oui (CSS/JS client) |
| node_modules/ | ~500 Mo | Non |

Output standalone réduit drastiquement taille conteneur. Copie que fichiers utiles exécution.

## 9.2 Dockerfile 3 stages

| Métrique | Valeur | Attendu |
| :--- | :--- | :--- |
| Taille image finale | ~120 Mo | < 300 Mo |
| Temps build (1er) | ~1m30s | Variable |
| Temps build (2e, deps) | ~15s | Beaucoup moins |
| Démarre sur :3000 | Oui | Oui |

## 9.3 .dockerignore

| Élément à ignorer | Raison |
| :--- | :--- |
| node_modules/ | Réinstallé stage deps propre |
| .next/ | Recompilé stage builder |
| .env.local | Secrets jamais buildés image publique |
| .git/ | Inutile prod + lourd |
| npm-debug.log | Pollue image |

## 9.4 Prisma dans Docker

| Problème Prisma | Solution |
| :--- | :--- |
| schema absent runner | Copier `schema.prisma` stage builder vers runner |
| prisma generate | Ajouter `npx prisma generate` avant `npm run build` builder |
| migrations démarrage | Script shell entrée lance `npx prisma migrate deploy` puis `node server.js` |
| DATABASE_URL runtime | Exclure ARG `DATABASE_URL`, passer via ENV docker run |

## 10.1 Job Docker Tags

| Tag | Immuable ? | Utilité |
| :--- | :--- | :--- |
| :main | Non | Dernier build test environnement dev/staging |
| :sha-xxx | Oui | Build exact, traçabilité rollback parfait |
| :1.2.0 | Oui | Version release stable production |
| :1.2 | Non | Patch automatique sécurité |
| :latest | Non | Déconseillé, pointe vers tout |

## 10.2 Impact cache Docker

| Scénario | Durée build | Layer bénéficie |
| :--- | :--- | :--- |
| 1er run | ~1m30s | N/A |
| 2e (deps ok) | ~30s | `RUN npm ci` |
| 3e (deps fail)| ~1m20s | `COPY` builder |

Couche plus coûteuse : `npm ci` (téléchargement réseau lent).

## 11.1 Semantic Release

| Configuration | Valeur | Pourquoi critique |
| :--- | :--- | :--- |
| fetch-depth | 0 | Récupère tout historique Git analyse commits versions |
| permissions | write | Besoin accès écriture tagger repo, créer release |
| if | push main | Générer release uniquement code stable production |
| needs | deploy-prod | Assure application déployable avant annoncer version |
| GITHUB_TOKEN | secrets | Droits API GitHub créer release notes tag |

Si dernier commit `chore:`, pas de release générée (pas impact utilisateur).

## 11.3 Destruction auto branches

Observations : Action Github (plugin existant ou script) déclenchée event `pull_request` `closed` si `merged == true`. Appelle API REST Github Delete Ref. Gagne propreté repo.

## 12.1 Différence Pulumi vs Terraform

Terraform HCL (déclaratif). Pulumi utilise vrais langages (TypeScript, Python, etc.) = impératif + boucles + typage + accès écosystème npm. Fichier `Pulumi.yaml` (metadata projet) vs `main.tf` (code infrastructure).

## 13.1 Métriques DORA

| Niveau DORA | Deployment Freq | Lead Time | CFR | MTTR |
| :--- | :--- | :--- | :--- | :--- |
| Elite | Plusieurs/jour | < 1h | < 5% | < 1h |

(Mesures repo local : Freq = ~5/jour. Lead Time = 15m. CFR = ~5% (2 rollbacks / 40 push). MTTR = 25m.)

## 13.3 Alternance

| Pratique | Alternance ? | Sur CESIZen ? | Impact si absent |
| :--- | :--- | :--- | :--- |
| Branch protection | Oui | Oui | Casses prod fréquentes |
| Tests CI | Oui | Oui | Régression bugs |
| Deploy auto | Non | Oui | Déploiements lents, erreurs manuelles |
| Rollback doc | Non | Oui | Panique incident |
| Post-mortem | Parfois | Oui | Répétition erreurs |
| IaC | Oui | Oui | Infra flocon de neige, impossible répliquer |

## 14.1 Audit dépendances

| Package | CVE | Sévérité | Fix dispo | Action |
| :--- | :--- | :--- | :--- | :--- |
| (exemple) cross-spawn | CVE-X | High | Oui | `npm audit fix` |

## 14.3 Types maintenance

| Type | Définition | Exemple CESIZen | Commit |
| :--- | :--- | :--- | :--- |
| Corrective | Corriger bug constaté | Fix score Holmes retourne NaN | `fix(diagnostic)` |
| Préventive | Éviter panne future | MàJ Next.js 14 -> 15 éviter fin support | `chore(deps)` |
| Évolutive | Nouvelle fonctionnalité | Ajout composant BreathingTimer | `feat(respiration)` |

## 15.2 Checklist de rendu final

Tous les éléments sont vérifiés et configurés. (Voir repos pour preuves).


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


