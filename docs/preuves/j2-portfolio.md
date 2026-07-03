# Portfolio J2 — Prompts & sorties structurées

## Question rituelle

**Qu'ai-je délégué / enseigné à mes agents aujourd'hui, et comment l'ai-je vérifié ?**

J'ai délégué la classification de tickets à un agent via une slash-command versionnée, en lui
imposant un contrat de sortie (schéma Zod) qu'il ne peut pas contourner : toute sortie
non conforme est rejetée mécaniquement par `parseClassification()`, pas jugée à l'œil.
J'ai enseigné au pipeline qu'un commit contenant un motif de secret est bloqué avant même
d'être lancé, via un hook `PreToolUse` déterministe. La vérification n'est pas une relecture
manuelle mais une suite de tests verts (`npm test src/classification : 5 passed`) et une trace
horodatée du blocage (`docs/preuves/j2-hook-blocage.txt`).

---

## Lab 5 — Chaîne complète sur ticket inédit

**Ticket inédit :** "On m'a facturé deux fois l'abonnement de mai, merci de corriger."

### Étape 1 — Classification (`/classer-ticket`)

Sortie brute :
```json
{"categorie":"facturation","priorite":3,"besoin_humain":true,"confiance":0.93,"justification":"Double facturation signalee sur abonnement de mai. Litige financier necessitant verification et correction par un humain."}
```

### Étape 2 — Validation programmatique

```
npx tsx scripts/valider-classification.ts '<JSON ci-dessus>'
→ Validation OK : { categorie: 'facturation', priorite: 3, besoin_humain: true, confiance: 0.93, ... }
```

### Étape 3 — Brouillon de réponse (`/rediger-reponse`)

> Bonjour,
>
> Merci de nous avoir contactés et nous vous présentons nos excuses pour ce désagrément.
> Nous avons bien pris en compte votre signalement concernant le double prélèvement sur votre
> abonnement de mai. Notre équipe facturation va examiner votre dossier et prendre les mesures
> nécessaires pour régulariser la situation. Nous vous tiendrons informé dès que nous aurons
> des éléments à vous communiquer.
>
> Cordialement,
> L'équipe OpsDesk
>
> [RELECTURE HUMAINE OBLIGATOIRE AVANT TOUT ENVOI AU CLIENT]

### Étape 4 — Relecture et validation humaine

Brouillon relu et validé le 2026-07-03.

Corrections apportées : aucune (ton et contenu conformes aux contraintes).

- [x] Ton professionnel et empathique
- [x] Aucun délai promis
- [x] Aucune information technique interne révélée
- [x] Mention de relecture humaine présente
- [x] JSON validé par `parseClassification()`

**relu / validé le 2026-07-03 — Mathieu**
