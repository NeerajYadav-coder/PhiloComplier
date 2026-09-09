import { CANONICAL_PRESETS } from "../src/core/canonicalData.js";
import { CANONICAL_NAGARJUNA, CANONICAL_COMPARATIVE } from "../src/core/canonicalNagarjuna.js";
import {
  PhilosophicalAnalysisResultSchema,
  NagarjunaDiagnosticResultSchema,
  ComparativeDiagnosticResultSchema,
  ClaimCritiqueResultSchema
} from "../src/core/schema.js";
import { CANONICAL_CRITIQUES } from "../src/services/critiqueService.js";

console.log("=================================================");
console.log("VERIFYING PHILOCOMPILER CANONICAL PRESETS & SCHEMAS");
console.log("=================================================");

let passed = 0;
let failed = 0;

// 1. Test Wittgenstein Presets
console.log("\n--- 1. Wittgenstein Presets ---");
for (const [key, preset] of Object.entries(CANONICAL_PRESETS)) {
  process.stdout.write(`Testing [${key}] "${preset.input.slice(0, 35)}..." ... `);
  const result = PhilosophicalAnalysisResultSchema.safeParse(preset.analysis);
  if (result.success) {
    console.log("✅ PASSED");
    passed++;
  } else {
    console.log("❌ FAILED");
    console.error(result.error);
    failed++;
  }
}

// 2. Test Nāgārjuna Presets
console.log("\n--- 2. Nāgārjuna / Kārikā Presets ---");
for (const [key, preset] of Object.entries(CANONICAL_NAGARJUNA)) {
  process.stdout.write(`Testing [${key}] "${preset.input.slice(0, 35)}..." ... `);
  const result = NagarjunaDiagnosticResultSchema.safeParse(preset);
  if (result.success) {
    console.log("✅ PASSED");
    passed++;
  } else {
    console.log("❌ FAILED");
    console.error(result.error);
    failed++;
  }
}

// 3. Test Comparative Presets
console.log("\n--- 3. Comparative Presets ---");
for (const [key, preset] of Object.entries(CANONICAL_COMPARATIVE)) {
  process.stdout.write(`Testing [${key}] "${preset.input.slice(0, 35)}..." ... `);
  const result = ComparativeDiagnosticResultSchema.safeParse(preset);
  if (result.success) {
    console.log("✅ PASSED");
    passed++;
  } else {
    console.log("❌ FAILED");
    console.error(result.error);
    failed++;
  }
}

// 4. Test Thinker Claim Critiques ("You Should Correct")
console.log("\n--- 4. Thinker Claim Critiques ---");
for (const [key, critique] of Object.entries(CANONICAL_CRITIQUES)) {
  process.stdout.write(`Testing [${key}] "${critique.input.slice(0, 35)}..." ... `);
  const result = ClaimCritiqueResultSchema.safeParse(critique);
  if (result.success) {
    console.log("✅ PASSED");
    passed++;
  } else {
    console.log("❌ FAILED");
    console.error(result.error);
    failed++;
  }
}

const total =
  Object.keys(CANONICAL_PRESETS).length +
  Object.keys(CANONICAL_NAGARJUNA).length +
  Object.keys(CANONICAL_COMPARATIVE).length +
  Object.keys(CANONICAL_CRITIQUES).length;

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${total} tests.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("All canonical presets and thinker critiques conform strictly to their respective schemas!");
  process.exit(0);
}

