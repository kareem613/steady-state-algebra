# Equation Rules

## Overview

All equations involve a single variable `x` and are randomly generated with guaranteed integer solutions. The player isolates `x` by applying the same operation to both sides until the equation is solved.

---

## Equation Structure by Level

### Level 1 — One-step equations

Two forms are generated with equal probability.

**Add/subtract form:**
```
x + b = c
```
- `b` is a non-zero integer in `[-8, 8]`
- `c` is an integer (the integer solution `x` plus `b`)

**Multiply form:**
```
a * x = c
```
- `a` is a non-zero integer in `[2, 6]`
- `c` is an integer (the integer solution `x` multiplied by `a`)

One operation is required to solve.

---

### Level 2 — Two-step equations

```
a * x + b = c
```
- `a` is a non-zero integer in `[2, 5]`
- `b` is a non-zero integer in `[-10, 10]`
- `c` is an integer (`a * x + b` for the chosen solution)

Two operations are required to solve: remove the constant term, then remove the coefficient.

---

### Level 3 — Variables on both sides

```
a * x + b = c * x + d
```
- `a` is a non-zero integer in `[3, 7]`
- `c` is a positive integer in `[1, a-1]` (always less than `a`)
- `b` is a non-zero integer in `[-10, 10]`
- `d` is chosen so the equation has the selected integer solution

The player must collect all `x` terms to one side before isolating.

---

## Solution Guarantee

All equations are generated to have an integer solution `x ∈ [-10, 10]` (Level 3 excludes `x = 0`).

---

## Right-Hand Side Constraint

- **Levels 1 and 2:** The right-hand side is a single integer constant.
- **Level 3:** The right-hand side is a linear expression of the form `c * x + d`, which may include a variable term.

---

## Operations

The player can apply any of the following operations to both sides at each step:

| Key | Operation     | Example applied to `3x + 6 = 12` |
|-----|---------------|-----------------------------------|
| `+` | Add           | `3x + 6 + 6 = 12 + 6`            |
| `-` | Subtract      | `3x + 6 - 6 = 12 - 6`            |
| `*` | Multiply by   | `(3x + 6) * 2 = 12 * 2`          |
| `/` | Divide by     | `(3x + 6) / 3 = 12 / 3`          |

The operand may be an integer, a fraction (e.g. `1/2`), or the variable `x`.

---

## Solved State

An equation is considered solved when it matches either of these forms:

```
x = <number>
<number> = x
```

The right-hand side (or left-hand side when `x` appears on the right) must contain no variable terms.
