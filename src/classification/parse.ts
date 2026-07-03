import { ClassificationSchema, type Classification } from "./schema.js";

export function parseClassification(raw: string): Classification {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Aucun JSON trouve dans la reponse");

  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    throw new Error("JSON invalide");
  }

  return ClassificationSchema.parse(parsed);
}
