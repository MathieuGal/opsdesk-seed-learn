import { parseClassification } from "../src/classification/parse.js";

const raw = process.argv[2];
if (!raw) {
  console.error(
    "Usage : npx tsx scripts/valider-classification.ts '<JSON ou reponse brute>'"
  );
  process.exit(1);
}

try {
  const result = parseClassification(raw);
  console.log("Validation OK :", result);
} catch (err) {
  console.error("Rejete :", (err as Error).message);
  process.exit(2);
}
