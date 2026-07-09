# ERRORS.md

| Étape | Erreur simulée ou réelle | Message exact (depuis les logs) | Résolution |
| :--- | :--- | :--- | :--- |
| Husky hook | Commit sans type | `type must be one of [build, chore, ...]` | Modifier message `feat(tracker): ...` |
| Job quality | Erreur ESLint | `Expected error message example` | Correction typo code ou ajout commentaire eslint-disable |
| Job tests | Test qui échoue | `Error: Cannot find module '/vitest.setup.ts'` | Modification chemin dans `vitest.config.ts` |
| Job build | Variable Supabase manquante | `Error: Supabase URL is required` | Ajout variables environnement GitHub Secrets dans `ci.yml` |
| Semantic release | fetch-depth: 0 manquant | `Error: Cannot find git history` | Ajout `fetch-depth: 0` étape checkout |
| Docker build | COPY depuis stage inexistant | `COPY failed: stat /app/node_modules: file does not exist` | Corriger nom stage dans `COPY --from=deps` |
| Pulumi | Token GitHub invalide | `Error: Unauthorized` | Configurer `PULUMI_ACCESS_TOKEN` et `GITHUB_TOKEN` |
