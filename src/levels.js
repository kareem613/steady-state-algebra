/**
 * Level definitions for Steady State Algebra.
 *
 * Level 1 — One-step equations: a single add/subtract or multiply/divide to isolate x.
 * Level 2 — Two-step equations: two operations required (add/subtract then multiply/divide).
 * Level 3 — Variables on both sides: collect x terms first, then isolate.
 *
 * All equations are randomly generated with guaranteed integer solutions.
 */

export const LEVELS = [
  { number: 1, label: 'Level 1', description: 'One step' },
  { number: 2, label: 'Level 2', description: 'Two steps' },
  { number: 3, label: 'Level 3', description: 'x on both sides' },
]

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randNonZero(min, max) {
  let v
  do { v = rand(min, max) } while (v === 0)
  return v
}

function formatLhs(a, b) {
  const aStr = a === 1 ? 'x' : `${a} * x`
  if (b === 0) return aStr
  return b > 0 ? `${aStr} + ${b}` : `${aStr} - ${Math.abs(b)}`
}

function formatRhs(c, d) {
  const cStr = c === 1 ? 'x' : `${c} * x`
  if (d === 0) return cStr
  return d > 0 ? `${cStr} + ${d}` : `${cStr} - ${Math.abs(d)}`
}

/**
 * Generate a random equation for the given level index (0-based).
 * All solutions are guaranteed integers.
 */
export function pickEquation(level) {
  const idx = level.number - 1

  if (idx === 0) {
    // Level 1: one-step — x + b = c  OR  a*x = c
    const x = randNonZero(-10, 10)
    const useMultiply = Math.random() < 0.5
    if (useMultiply) {
      const a = randNonZero(2, 6)
      return { lhsStr: `${a} * x`, rhsStr: String(a * x) }
    } else {
      const b = randNonZero(-8, 8)
      const lhs = b > 0 ? `x + ${b}` : `x - ${Math.abs(b)}`
      return { lhsStr: lhs, rhsStr: String(x + b) }
    }
  }

  if (idx === 1) {
    // Level 2: two-step — a*x + b = c  where a ≥ 2
    const x = randNonZero(-8, 8)
    const a = randNonZero(2, 5)
    const b = randNonZero(-10, 10)
    const c = a * x + b
    return { lhsStr: formatLhs(a, b), rhsStr: String(c) }
  }

  // Level 3: x on both sides — a*x + b = c*x + d  where (a - c) ≠ 0
  const x = randNonZero(-8, 8)
  const a = randNonZero(3, 7)
  const c = rand(1, a - 1)  // c < a so LHS has larger coefficient
  const b = randNonZero(-10, 10)
  const d = (a - c) * x + b  // ensures equation has integer solution x
  return { lhsStr: formatLhs(a, b), rhsStr: formatRhs(c, d) }
}
