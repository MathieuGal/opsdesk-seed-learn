# Carnet de bord - Jour 1

## Conventions implicites

- Fichiers source nommés en `camelCase` minuscule (`src/config.ts`, `src/db.ts`, `src/tickets.ts`, `src/server.ts`, `src/seed.ts`)
- Fonctions nommées en `camelCase` (`listTickets`, `getTicket`, `updateTicketStatus` — `src/tickets.ts:7,14,21`)
- Types et interfaces en `PascalCase` (`Ticket` — `src/db.ts:27`, `DB` — `src/tickets.ts:4`)
- Colonnes SQL en `snake_case` (`created_at`, `PRIMARY KEY` — `src/db.ts:16-24`)
- Catégories de tickets en français (`acces`, `facturation`, `bug`, `demande`, `autre` — `src/seed.ts:13-98`)
- Module ESM (`"type": "module"` dans `package.json:6`) avec extensions `.js` dans les imports TS (`src/tickets.ts:2`)
- Commentaires en français dans le code source
- Tests unitaires avec Vitest et base SQLite `:memory:` isolée (`test/tickets.test.ts:6-31`)
- Injection de dépendance via paramètre par défaut sur la DB (`src/tickets.ts:7,14,22`)

npm test          # tests unitaires (vitest, SQLite in-memory)
npm run build     # compilation TypeScript strict — détecte les erreurs de typage
Il n'y a pas de linter (eslint, prettier) configuré dans ce dépôt. Ces deux commandes sont les seules vérifications automatisées disponibles.

Conventions de nommage observées :

Fonctions / variables : camelCase (listTickets, getTicket, updateTicketStatus)
Types : PascalCase (Ticket, DB)
Fichiers : un mot en minuscules, un fichier par responsabilité (config.ts, db.ts, tickets.ts, server.ts, seed.ts)
Colonnes SQL : snake_case (created_at)
Commentaires : en français, sans accents (// Retourne tous les tickets)
Code et identifiants : en anglais (subject, status, open, closed)
Commits : en français avec préfixes conventionnels (fix:, chore:, docs:)
Imports : avec extension .js (requis par ESM)
Ce que je ne peux pas affirmer : il n'y a pas de document de style explicite (pas d'eslint, prettier, ni de CONTRIBUTING.md). Ces conventions sont déduites du code existant, pas d'une règle formalisée.

## Angles morts

- Secret `OPSDESK_API_KEY` codé en dur dans `src/config.ts:3` (`"opsdesk_live_DEMOkeyNOTREAL0000"`) — pas de `.env`, pas de variable d'environnement, pas de `.gitignore` pour un fichier de secrets
- Aucune validation du champ `status` côté serveur : n'importe quelle chaîne est acceptée (`src/server.ts:36`, `src/tickets.ts:26`)
- Pas de pagination sur `GET /tickets` : `SELECT *` sans `LIMIT` (`src/tickets.ts:9`)
- Pas de middleware d'authentification sur les routes API (`src/server.ts` — aucune vérification de `OPSDESK_API_KEY`)
- Le `seed.ts` fait un `DELETE FROM tickets` sans confirmation (`src/seed.ts:110`) — risque de perte de données en production
- Pas de fichier `.gitignore` visible pour exclure `data/opsdesk.db` ou `node_modules`

## Note pi.dev

Le noyau minimal repose sur 4 outils (read, write, edit, bash) et une boucle courte modifier-tester-valider. La position anti-framework de pi.dev est un sujet de débat : on peut coder un back-office fonctionnel avec uniquement Fastify + SQLite (comme ce repo le démontre), mais la question de l'échelle reste ouverte.

D'après le fichier CLAUDE.md de ce dépôt 
                                  
 Commandes à lancer pour vérifier qu'une modification est correcte (3 étapes) 

 1. npm test — les tests passent (vitest, SQLite in-memory).                                                                                                                                                                                                                
 2. npm run build — la compilation TypeScript réussit sans erreur.                                                                                                                                                                                                          
 3. npm run seed && npm run dev puis curl http://localhost:3000/health — le serveur démarre et répond {"status":"ok"}.                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
 Conventions de nommage et de code suivies par ce projet 

 - Commentaires : en français (sans accents).                                                                                                                                                                                                                               
 - Code et identifiants : en anglais.                                                                                                                                                                                                                                       
 - Imports : avec l'extension .js (requis par ESM + TypeScript).                                                                                                                                                                                                            
 - Fichiers : un fichier par responsabilité (ex. config.ts, db.ts, tickets.ts, server.ts, seed.ts).                                                                                                                                                                         
 - Injection de dépendances : les fonctions métier (tickets.ts) acceptent un paramètre database optionnel pour les tests.                                                                                                                                                   
 - Messages de commit : en français, avec préfixe conventionnel (fix:, chore:, docs:).

 Longeur de trace 
 20 lignes et un appel d'outil

## Non-délégation

Gestion des secrets : Je ne demande pas a l'agent d'introduire les secrets dans le code ou même dans le .env a ma place, je le fait moi même, trop dangereux
La gestion des sauvegardes de mon projet : Je veut être sur que mon projet est plusieur sauvegardes a des endroits différent ce qu'un agent du mal a faire
La dernière relecture : L'humain doit toujours faire la dernière lecture du code après l'agents


## Question rituelle

<!-- Cette section doit être remplie À LA MAIN par l'apprenant (indicateur Qualiopi 11 — authenticité de l'auto-évaluation). -->

Qu'ai-je délégué / enseigné à mes agents aujourd'hui, et comment l'ai-je vérifié ?

J'ai appreis a mes agents a tester leurs ajouts et modification de code grace au claude.md.
Je leur est appris a utiliser et a faire attenton au convention du projet en nottant de façon explicite.
