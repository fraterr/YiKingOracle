import { hexagrams } from './data.js';

/**
 * Simulates a toss of 6 coins to generate a hexagram.
 * Following Aleister Crowley's Method:
 * 1. 6 coins (5 normal, 1 special).
 * 2. Positons are Line 1 (bottom) to Line 6 (top).
 * 3. Each coin is Yang (Solid, 1) or Yin (Broken, 0).
 * 4. Special coin position is the Moving Line.
 */
export function consultOracle() {
  // Determine which coin is the special one (1 to 6)
  const movingLine = Math.floor(Math.random() * 6) + 1;
  const lines = [];

  for (let i = 0; i < 6; i++) {
    // 50% chance for Yang (1) or Yin (0)
    lines.push(Math.random() < 0.5 ? 1 : 0);
  }

  // Find the hexagram matching these lines
  const hexagram = hexagrams.find(h => 
    h.lines.every((val, index) => val === lines[index])
  );

  return {
    hexagram,
    movingLine,
    lines
  };
}
