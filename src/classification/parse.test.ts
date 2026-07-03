import { describe, it, expect } from "vitest";
import { parseClassification } from "./parse.js";

describe("parseClassification", () => {
  it("extrait et valide un JSON enrobe de prose", () => {
    const raw = `Voici le resultat : {"categorie":"acces","priorite":3,
      "besoin_humain":false,"confiance":0.85,"justification":"Connexion impossible"}
      Besoin d'autre chose ?`;
    const result = parseClassification(raw);
    expect(result.categorie).toBe("acces");
    expect(result.priorite).toBe(3);
  });

  it("rejette une categorie hors enumeration", () => {
    const raw = JSON.stringify({
      categorie: "spam",
      priorite: 1,
      besoin_humain: false,
      confiance: 0.5,
      justification: "Test",
    });
    expect(() => parseClassification(raw)).toThrow();
  });

  it("rejette une cle manquante (JSON enrobe mais incomplet)", () => {
    const raw = `Voici ma reponse : {"categorie":"bug"}`;
    expect(() => parseClassification(raw)).toThrow();
  });

  // Sorties observées au Lab 1 — stabilité des clés sur des sorties réelles
  it.each([
    `{"categorie":"acces","priorite":3,"besoin_humain":true,"confiance":0.88,"justification":"Erreur 403 post-mise a jour : acces refuse, probablement un probleme de permissions ou de session. Compte bloque, necessite verification humaine."}`,
    `{"categorie":"facturation","priorite":3,"besoin_humain":true,"confiance":0.95,"justification":"Double prelevement confirme sur releve bancaire. Litige financier necessitant verification et remboursement par un humain."}`,
  ])("valide la sortie observee %#", (raw) => {
    expect(() => parseClassification(raw)).not.toThrow();
  });
});
