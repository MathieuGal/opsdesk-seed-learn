# Bibliothèque de prompts OpsDesk

Les slash-commands de projet vivent dans `.claude/commands/`. Chaque fichier Markdown correspond
à une commande : `.claude/commands/classer-ticket.md` → `/classer-ticket`.

## Convention de nommage

- Nom en kebab-case, français, verbe + objet : `classer-ticket`, `rediger-reponse`, `resumer-tickets`.
- Un fichier = une responsabilité = une commande.

## Structure obligatoire de chaque fichier

```
# <nom-de-la-commande>

[1-Role]       Qui est l'agent.
[2-Contexte]   Ce qu'il faut savoir sur OpsDesk pour traiter la tâche.
[3-Tache]      Ce que l'agent doit faire. Contient $ARGUMENTS si la commande reçoit un argument.
[4-Contraintes] Limites, ton, langue, garde-fous.
[5-Exemple]    Un exemple entrée/sortie non trivial.
[6-Format]     Format de sortie exact.
```

Le mot-clé `$ARGUMENTS` est remplacé au moment de l'appel par le texte passé à la commande.
Sans ce mot-clé, l'argument utilisateur n'atteint pas le prompt.

## Commandes disponibles

| Commande | Fichier | Sortie attendue |
|---|---|---|
| `/classer-ticket <texte>` | `classer-ticket.md` | JSON conforme à `src/classification/schema.ts` |
| `/rediger-reponse <texte>` | `rediger-reponse.md` | Brouillon texte + mention relecture humaine |
| `/resumer-tickets <json>` | `resumer-tickets.md` | Markdown structuré ≤ 20 lignes |

## Règle de relecture

Toute commande qui produit un contenu destiné à un client **doit** inclure dans son corps :
> « Relecture humaine obligatoire avant tout envoi au client. »

## Ajouter une commande

1. Créer `.claude/commands/<nom>.md` en respectant la structure ci-dessus.
2. Ajouter une ligne dans le tableau ci-dessus avec la date de première relecture (`relu le AAAA-MM-JJ`).
3. Mentionner la commande dans la section « Bibliothèque de prompts » de `CLAUDE.md`.

## Suivi des relectures

| Fichier | Relu le | Par |
|---|---|---|
| `classer-ticket.md` | 2026-07-03 | Mathieu |
| `rediger-reponse.md` | 2026-07-03 | Mathieu |
| `resumer-tickets.md` | 2026-07-03 | Mathieu |
