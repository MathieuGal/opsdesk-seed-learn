import { z } from "zod";

export const ClassificationSchema = z.object({
  categorie: z.enum(["acces", "facturation", "bug", "demande", "autre"]),
  priorite: z.int().min(1).max(3),
  besoin_humain: z.boolean(),
  confiance: z.number().min(0).max(1),
  justification: z.string().min(1).max(280),
});

export type Classification = z.infer<typeof ClassificationSchema>;
