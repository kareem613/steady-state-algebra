/**
 * Level definitions for Steady State Algebra.
 *
 * Level 1 — One-step equations: a single add/subtract or multiply/divide to isolate x.
 * Level 2 — Two-step equations: two operations required (add/subtract then multiply/divide).
 * Level 3 — Variables on both sides: collect x terms first, then isolate.
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
    description: 'x on both sides',
    equations: [
      { lhsStr: '5 * x + 3',  rhsStr: '2 * x + 12' },
      { lhsStr: '4 * x - 5',  rhsStr: 'x + 10'     },
      { lhsStr: '6 * x + 2',  rhsStr: '2 * x + 18' },
      { lhsStr: '3 * x + 8',  rhsStr: 'x + 16'     },
      { lhsStr: '7 * x - 3',  rhsStr: '4 * x + 9'  },
      { lhsStr: '5 * x - 4',  rhsStr: '2 * x + 11' },
    ],
  },
]

/** Return a random equation from a level's pool. */
export function pickEquation(level) {
  const pool = level.equations
  return pool[Math.floor(Math.random() * pool.length)]
}
