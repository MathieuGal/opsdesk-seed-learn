#!/usr/bin/env bash
# guard-commit.sh : detection deterministe de secrets et violations de convention
# Declenche par le hook PreToolUse sur Bash avant tout git commit via Claude Code.
# Code de sortie 2 = blocage (seul code qui bloque l'outil dans Claude Code).

INPUT="$(cat)"

# On ne controle que les commandes de commit.
if ! echo "$INPUT" | grep -q 'git commit'; then
  exit 0
fi

# Scan du contenu stage, en excluant ce script (qui contient les motifs de detection).
STAGED="$(git diff --cached -- . ':(exclude)scripts/guard-commit.sh')"

if echo "$STAGED" | grep -qE \
  'opsdesk_live_|AKIA[0-9A-Z]{16}|-----BEGIN( [A-Z]+)? PRIVATE KEY-----|password\s*='; then
  echo "BLOQUÉ : secret potentiel détecté dans le contenu stagé." >&2
  exit 2
fi

# Convention OpsDesk : pas de fichier .env non-example commite.
if git diff --cached --name-only | grep -E '(^|/)\.env' | grep -v '\.env\.example' | grep -q .; then
  echo "BLOQUÉ : fichier .env non-example détecté." >&2
  exit 2
fi

exit 0
