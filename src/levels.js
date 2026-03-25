/**
 * Level definitions for Steady State Algebra.
 *
 * Level 1 — One-step equations: a single add/subtract or multiply/divide to isolate x.
 * Level 2 — Two-step equations: two operations required (add/subtract then multiply/divide).
 * Level 3 — Two-step equations with larger coefficients and constants.
 */

export const LEVELS = [
  {
    number: 1,
    label: 'Level 1',
    description: 'One step',
    equations: [
      { lhsStr: 'x + 5',   rhsStr: '9'  },
      { lhsStr: 'x + 8',   rhsStr: '12' },
      { lhsStr: 'x - 3',   rhsStr: '7'  },
      { lhsStr: 'x - 6',   rhsStr: '2'  },
      { lhsStr: '2 * x',   rhsStr: '10' },
      { lhsStr: '3 * x',   rhsStr: '12' },
      { lhsStr: '4 * x',   rhsStr: '20' },
    ],
  },
  {
    number: 2,
    label: 'Level 2',
    description: 'Two steps',
    equations: [
      { lhsStr: '2 * x + 4',  rhsStr: '12' },
      { lhsStr: '3 * x + 6',  rhsStr: '12' },
      { lhsStr: '2 * x - 4',  rhsStr: '8'  },
      { lhsStr: '3 * x - 3',  rhsStr: '9'  },
      { lhsStr: '4 * x + 8',  rhsStr: '16' },
      { lhsStr: '5 * x - 10', rhsStr: '15' },
    ],
  },
  {
    number: 3,
    label: 'Level 3',
    description: 'Harder',
    equations: [
      { lhsStr: '6 * x + 12', rhsStr: '30' },
      { lhsStr: '7 * x - 14', rhsStr: '21' },
      { lhsStr: '4 * x + 16', rhsStr: '40' },
      { lhsStr: '9 * x - 18', rhsStr: '27' },
      { lhsStr: '5 * x + 25', rhsStr: '50' },
      { lhsStr: '8 * x - 24', rhsStr: '32' },
    ],
  },
]

/** Return a random equation from a level's pool. */
export function pickEquation(level) {
  const pool = level.equations
  return pool[Math.floor(Math.random() * pool.length)]
}
