# Audit Atelier 1

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
| feat(tracker): ajout calcul tendance 7j | Oui | - |
| ajout calcul tendance | Non | type must be one of [build, chore, ...] |
| feat(tracker) : ajout tendance | Non | scope must be lowercase |
| chore: config husky | Oui | - |
