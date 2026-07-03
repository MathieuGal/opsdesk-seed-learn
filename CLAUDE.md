# OpsDesk

Mini back-office de gestion de tickets de support. API REST (JSON) sans frontend.

## Stack

- **Runtime** : Node.js ≥20 <24, TypeScript (strict), ESM (`"type": "module"`)
- **Serveur** : Fastify 4
- **Base de données** : SQLite via better-sqlite3, fichier `data/opsdesk.db`
- **Tests** : Test unitère partiels
## Commandes

```bash
npm install          # installer les dépendances
npm run seed         # (re)créer les données d'exemple (IDs 1001-1012)
npm run dev          # lancer le serveur (tsx, port 3000 par défaut)
npm run build        # compiler TypeScript → dist/
npm test             # lancer les tests (vitest run)
```

Variables d'environnement : `PORT` (défaut 3000), `OPSDESK_DB` (défaut `data/opsdesk.db`).

## Endpoints

| Méthode | Route                  | Description                  |
|---------|------------------------|------------------------------|
| GET     | `/health`              | Sonde de santé               |
| GET     | `/tickets`             | Liste tous les tickets       |
| GET     | `/tickets/:id`         | Détail d'un ticket           |
| POST    | `/tickets/:id/status`  | Modifier le statut (body: `{ "status": "..." }`) |

## Conventions de code

- Commentaires en français (sans accents), code et identifiants en anglais.
- Imports avec extension `.js` (requis par ESM + TypeScript).
- Les fonctions métier (`tickets.ts`) acceptent un paramètre `database` optionnel (injection de dépendance pour les tests).
- Un fichier par responsabilité : `config.ts`, `db.ts`, `tickets.ts`, `server.ts`, `seed.ts`.
- Messages de commit en français, préfixés conventionnellement (`fix:`, `chore:`, `docs:`).

## Vérifier qu'une modification est correcte

1. **`npm test`** — les tests passent (vitest, SQLite in-memory).
2. **`npm run build`** — la compilation TypeScript réussit sans erreur.
3. **`npm run seed && npm run dev`** puis `curl http://localhost:3000/health` — le serveur démarre et répond `{"status":"ok"}`.

## Bibliothèque de prompts

Slash-commands disponibles dans `.claude/commands/` :

- `/classer-ticket <texte>` : classification JSON ; doit valider `src/classification/schema.ts`.
- `/rediger-reponse <id_ou_texte>` : brouillon réponse client ; **relecture humaine avant envoi**.
- `/resumer-tickets <json_tickets>` : synthèse des tickets ouverts.

Règle : toute classification produite par un agent doit passer dans `parseClassification()`
avant d'être utilisée. Toute sortie non conforme est rejetée.

## Garde-fous mécaniques

Un hook `PreToolUse` sur l'outil `Bash` déclenche `scripts/guard-commit.sh` avant tout
`git commit` lancé par Claude Code. Le script scanne le contenu stagé de façon **déterministe**
(regex, pas jugement du modèle) et sort en code 2 si un secret est détecté.

Motifs bloquants :
- `opsdesk_live_` (clé API factice du seed, motif réel à remplacer en prod)
- `AKIA[0-9A-Z]{16}` (clé AWS)
- `-----BEGIN ... PRIVATE KEY-----`
- `password\s*=`
- Fichier `.env` non-example stagé

Limite connue : le hook ne couvre que les actions passant par Claude Code.
Un commit lancé depuis le terminal ne le déclenche pas.
La détection déterministe est la barrière. Le modèle n'est qu'assistant à l'écriture des règles.
