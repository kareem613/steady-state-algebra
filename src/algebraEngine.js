import * as math from 'mathjs'

/**
 * Parse a simple linear equation string like "3x + 6 = 12"
 * Returns { lhsTerms, rhsConstant } where lhsTerms is an array of term objects
 * and rhsConstant is a number.
 *
 * Supported equation form: <lhs expression with variable x> = <integer or fraction>
 */
export function parseEquation(equationStr) {
  const [lhsStr, rhsStr] = equationStr.split('=').map(s => s.trim())
  if (!lhsStr || !rhsStr) throw new Error('Invalid equation: missing "="')

  const rhsConstant = math.evaluate(rhsStr)

  // Parse lhs into terms
  const lhsNode = math.parse(lhsStr)
  const terms = extractTerms(lhsNode)

  return { lhsStr, rhsStr, lhsTerms: terms, rhsConstant }
}

function extractTerms(node) {
  const terms = []
  collectTerms(node, 1, terms)
  return terms
}

function collectTerms(node, sign, terms) {
  if (node.type === 'OperatorNode' && node.op === '+') {
    collectTerms(node.args[0], sign, terms)
    collectTerms(node.args[1], sign, terms)
  } else if (node.type === 'OperatorNode' && node.op === '-' && node.args.length === 2) {
    collectTerms(node.args[0], sign, terms)
    collectTerms(node.args[1], -sign, terms)
  } else if (node.type === 'OperatorNode' && node.op === '-' && node.args.length === 1) {
    collectTerms(node.args[0], -sign, terms)
  } else {
    const str = node.toString()
    const hasVar = /[a-zA-Z]/.test(str)
    terms.push({ node, sign, hasVar, str: sign < 0 ? `-${str}` : str })
  }
}

/**
 * Apply an operation to both sides of an equation.
 * op: 'add' | 'subtract' | 'multiply' | 'divide'
 * value: string (e.g. "6", "1/2", "x")
 *
 * Returns { newLhs, newRhs, newLhsSimplified, newRhsSimplified, isValid, operationLabel }
 */
export function applyOperation(equationStr, op, value) {
  const [lhsStr, rhsStr] = equationStr.split('=').map(s => s.trim())

  let opSymbol
  let newLhs, newRhs

  switch (op) {
    case 'add':
      opSymbol = '+'
      newLhs = `(${lhsStr}) + (${value})`
      newRhs = `(${rhsStr}) + (${value})`
      break
    case 'subtract':
      opSymbol = '-'
      newLhs = `(${lhsStr}) - (${value})`
      newRhs = `(${rhsStr}) - (${value})`
      break
    case 'multiply':
      opSymbol = '*'
      newLhs = `(${lhsStr}) * (${value})`
      newRhs = `(${rhsStr}) * (${value})`
      break
    case 'divide':
      opSymbol = '/'
      newLhs = `(${lhsStr}) / (${value})`
      newRhs = `(${rhsStr}) / (${value})`
      break
    default:
      throw new Error(`Unknown op: ${op}`)
  }

  const operationLabel = opVerb(op) + ' ' + value

  try {
    const simplifiedLhs = simplifyExpr(newLhs)
    const simplifiedRhs = simplifyExpr(newRhs)
    return {
      newLhs,
      newRhs,
      newLhsSimplified: simplifiedLhs,
      newRhsSimplified: simplifiedRhs,
      isValid: true,
      operationLabel,
      opSymbol,
      value,
    }
  } catch {
    return { isValid: false, operationLabel, opSymbol, value }
  }
}

function simplifyExpr(expr) {
  try {
    return math.simplify(expr).toString()
  } catch {
    return math.evaluate(expr)?.toString() ?? expr
  }
}

function opVerb(op) {
  switch (op) {
    case 'add': return 'add'
    case 'subtract': return 'subtract'
    case 'multiply': return 'multiply by'
    case 'divide': return 'divide by'
    default: return op
  }
}

/**
 * Check whether the equation is solved (variable isolated: "x = <number>")
 */
export function isSolved(equationStr) {
  const parts = equationStr.split('=').map(s => s.trim())
  if (parts.length !== 2) return false
  return (parts[0] === 'x' && !/[a-zA-Z]/.test(parts[1])) ||
         (parts[1] === 'x' && !/[a-zA-Z]/.test(parts[0]))
}

/**
 * Build a human-readable string for an operation being applied to both sides.
 */
export function buildOperationDisplay(op, value) {
  switch (op) {
    case 'add': return `+ ${value}`
    case 'subtract': return `- ${value}`
    case 'multiply': return `× ${value}`
    case 'divide': return `÷ ${value}`
    default: return value
  }
}
