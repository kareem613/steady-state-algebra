import { useState } from 'react'
import { applyOperation, buildOperationDisplay } from './algebraEngine'

const KEYPAD_ROWS = [
  ['+', '7', '8', '9'],
  ['-', '4', '5', '6'],
  ['*', '1', '2', '3'],
  ['/', '0', 'x', '⌫'],
]

const OP_KEYS = ['/', '*', '-', '+']

const KEY_TO_OP = {
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add',
}

/**
 * Gameplay / Input Screen
 * Lets the user type an operation to apply to both sides of the equation.
 * On submit, shows a preview via the Ghost Preview state.
 */
export default function GameplayScreen({ equation, onApply, onUndo, canUndo, solved, onNextPuzzle, levelIndex, levelCount, levelLabel, onLevelChange }) {
  const [input, setInput] = useState('')
  const [selectedOp, setSelectedOp] = useState(null)

  const lhsParts = parseDisplayTerms(equation.lhsStr)

  function handleKey(key) {
    if (key === '⌫') {
      setInput(prev => prev.slice(0, -1))
      return
    }
    if (key === 'x') {
      setInput(prev => prev + 'x')
      return
    }
    if (KEY_TO_OP[key]) {
      setSelectedOp(KEY_TO_OP[key])
      return
    }
    setInput(prev => prev + key)
  }

  function handleSubmit() {
    if (!input.trim() || !selectedOp) return
    const result = applyOperation(`${equation.lhsStr} = ${equation.rhsStr}`, selectedOp, input.trim())
    if (result.isValid) {
      setInput('')
      setSelectedOp(null)
      onApply(result)
    }
  }

  const operationLabel = buildOperationDisplay(selectedOp || 'subtract', input || '?')
  const hasPreview = !!(input || selectedOp)

  return (
    <div className="bg-background text-on-background font-body h-[100dvh] flex flex-col overflow-hidden dark">
      {/* TopAppBar — in-flow so it participates in flex height calculation */}
      <header className="flex-shrink-0 bg-slate-950/80 backdrop-blur-xl z-50 shadow-[0_4px_24px_rgba(219,230,254,0.06)]">
        <div className="flex items-center justify-between px-6 h-14 w-full">
          <h1 className="text-lg font-bold text-sky-400 tracking-widest uppercase font-headline tracking-tight">
            STEADY STATE
          </h1>
        </div>
      </header>

      {/* Content area — equation only, fills remaining space */}
      <main className="flex-1 flex items-center justify-center px-4 relative overflow-hidden min-h-0">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        </div>

        {/* Equation Display */}
        <section className="w-full max-w-2xl text-center z-10">
          <div className={`p-5 md:p-10 rounded-2xl relative transition-colors ${solved ? 'bg-secondary/10' : 'bg-surface-container-low'}`}>
            {solved && (
              <div className="text-secondary font-headline font-bold text-3xl mb-2">✓ Solved!</div>
            )}
            <div className={`font-headline font-bold tracking-tighter text-on-background flex flex-wrap items-center justify-center text-3xl md:text-5xl gap-2 ${solved ? 'opacity-50' : ''}`}>
              {lhsParts.map((part, i) => (
                <span key={i} className={part.isOp ? 'text-primary' : part.isVar ? 'font-mono italic' : ''}>
                  {part.text}
                </span>
              ))}
              <span className="text-outline-variant mx-4">=</span>
              <span>{equation.rhsStr}</span>
            </div>
            <div className="mt-3 text-on-surface-variant font-medium tracking-widest uppercase text-xs">
              {solved ? 'Well done!' : 'Current Equilibrium'}
            </div>
          </div>
        </section>
      </main>

      {/* Ghost Preview — outside main so overflow-hidden never clips it */}
      <section
        className="flex-shrink-0 w-full px-4 pb-2 transition-opacity duration-300"
        style={{ opacity: hasPreview ? 1 : 0, pointerEvents: hasPreview ? 'auto' : 'none' }}
      >
        <div
          className="border-2 border-dashed border-primary/20 p-4 rounded-[2rem] w-full max-w-3xl mx-auto flex flex-col items-center"
          style={{ backdropFilter: 'blur(16px)', background: 'rgba(21,38,63,0.4)' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-3">
            <div className="flex items-center text-xl md:text-3xl font-headline font-medium text-on-surface/50 line-through decoration-primary-container/40">
              {lhsParts.map((p, i) => <span key={i}>{p.text}</span>)}
            </div>
            <div className="flex items-center text-2xl md:text-4xl font-headline font-bold text-primary animate-pulse">
              <span className="mx-2 text-primary-fixed">{operationLabel.charAt(0)}</span>
              <span>{operationLabel.slice(1).trim()}</span>
            </div>
            <div className="text-xl text-outline-variant mx-2">=</div>
            <div className="flex items-center text-xl md:text-3xl font-headline font-medium text-on-surface/50 line-through decoration-primary-container/40">
              {equation.rhsStr}
            </div>
            <div className="flex items-center text-2xl md:text-4xl font-headline font-bold text-primary animate-pulse">
              <span className="mx-2 text-primary-fixed">{operationLabel.charAt(0)}</span>
              <span>{operationLabel.slice(1).trim()}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Keypad — in-flow at the bottom, takes its natural height */}
      <div className="flex-shrink-0 bg-slate-900/95 backdrop-blur-2xl rounded-t-[2.5rem] px-4 pt-4 pb-6 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="grid grid-cols-4 gap-2 flex-1">
            {KEYPAD_ROWS.map((row, ri) =>
              row.map((key, ci) => {
                const isOpKey = OP_KEYS.includes(key)
                return (
                  <button
                    key={`${ri}-${ci}`}
                    onClick={() => handleKey(key)}
                    className={`h-12 rounded-2xl font-headline font-bold text-xl transition-colors active:scale-90 ${
                      isOpKey
                        ? KEY_TO_OP[key] === selectedOp
                          ? 'bg-primary text-on-primary text-2xl shadow-[0_4px_16px_rgba(59,191,250,0.3)]'
                          : 'bg-surface-container-highest text-primary text-2xl hover:bg-surface-bright'
                        : key === 'x'
                        ? 'bg-surface-container-high text-primary italic font-mono hover:bg-surface-bright'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                    }`}
                  >
                    {key === '⌫' ? (
                      <span className="material-symbols-outlined">backspace</span>
                    ) : key === '*' ? '×' : key === '/' ? '÷' : key}
                  </button>
                )
              })
            )}
          </div>

          {/* Execution Block */}
          <div className="w-full md:w-44 flex flex-col gap-2">
            <div className="flex gap-2">
              {solved ? (
                <button
                  onClick={onNextPuzzle}
                  className="flex-1 h-12 bg-gradient-to-br from-secondary to-secondary-container text-on-secondary-container rounded-2xl font-headline font-extrabold text-base tracking-tight uppercase shadow-[0_4px_16px_rgba(105,246,184,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">replay</span>
                  NEXT
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-2xl font-headline font-extrabold text-base tracking-tight uppercase shadow-[0_4px_16px_rgba(34,177,236,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">balance</span>
                  GO
                </button>
              )}
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="w-12 h-12 rounded-2xl bg-surface-container-low text-on-surface-variant flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all disabled:opacity-30"
              >
                <span className="material-symbols-outlined">undo</span>
              </button>
            </div>

            {/* Level selector */}
            <div className="flex items-center justify-between bg-surface-container-low rounded-2xl px-3 py-1">
              <button
                onClick={() => onLevelChange(Math.max(0, levelIndex - 1))}
                disabled={levelIndex === 0}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-primary disabled:opacity-30 hover:bg-surface-container active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="font-headline font-bold text-sm text-on-surface tracking-widest uppercase">
                {levelLabel}
              </span>
              <button
                onClick={() => onLevelChange(Math.min(levelCount - 1, levelIndex + 1))}
                disabled={levelIndex === levelCount - 1}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-primary disabled:opacity-30 hover:bg-surface-container active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
      `}</style>
    </div>
  )
}

/** Split an expression string into displayable term parts with metadata */
function parseDisplayTerms(expr) {
  const parts = []
  let current = ''
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i]
    if ((ch === '+' || ch === '-') && i > 0) {
      if (current.trim()) parts.push({ text: current.trim(), isOp: false, isVar: /[a-z]/i.test(current) })
      parts.push({ text: ` ${ch} `, isOp: true, isVar: false })
      current = ''
    } else {
      current += ch
    }
  }
  if (current.trim()) parts.push({ text: current.trim(), isOp: false, isVar: /[a-z]/i.test(current) })
  return parts
}
