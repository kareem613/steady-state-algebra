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

  const operationLabel = (input && selectedOp) ? buildOperationDisplay(selectedOp, input) : null

  return (
    <div className="bg-background text-on-background font-body h-[100dvh] flex flex-col overflow-hidden dark">
      {/* TopAppBar */}
      <header className="bg-slate-950/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-[0_4px_24px_rgba(219,230,254,0.06)]">
        <div className="flex items-center justify-between px-6 h-16 w-full">
          <h1 className="text-xl font-bold text-sky-400 tracking-widest uppercase font-headline tracking-tight">
            STEADY STATE
          </h1>
        </div>
      </header>

      {/* Main Sandbox Canvas — centered in the space between header and keypad */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden"
            style={{ paddingTop: '64px', paddingBottom: 'clamp(320px, 62vw, 540px)' }}>
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        </div>

        {/* Equation Display */}
        <section className="w-full max-w-2xl mb-6 text-center">
          <div className={`p-6 md:p-10 rounded-2xl relative transition-colors ${solved ? 'bg-secondary/10' : 'bg-surface-container-low'}`}>
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

        {/* Ghost Preview of Proposed Change */}
        {operationLabel && (
          <section className="w-full max-w-3xl mb-4 flex flex-col items-center">
            <div
              className="border-2 border-dashed border-primary/20 p-4 md:p-8 rounded-[2rem] w-full flex flex-col items-center transition-all duration-500"
              style={{ backdropFilter: 'blur(16px)', background: 'rgba(21,38,63,0.4)' }}
            >
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4">
                {/* LHS crossed out */}
                <div className="flex items-center text-2xl md:text-4xl font-headline font-medium text-on-surface/50 line-through decoration-primary-container/40">
                  {lhsParts.map((p, i) => <span key={i}>{p.text}</span>)}
                </div>
                {/* Ghost op LHS */}
                <div className="flex items-center text-3xl md:text-5xl font-headline font-bold text-primary animate-pulse">
                  <span className="mx-2 text-primary-fixed">{operationLabel.charAt(0)}</span>
                  <span>{operationLabel.slice(1).trim()}</span>
                </div>
                <div className="text-2xl text-outline-variant mx-2">=</div>
                {/* RHS crossed out */}
                <div className="flex items-center text-2xl md:text-4xl font-headline font-medium text-on-surface/50 line-through decoration-primary-container/40">
                  {equation.rhsStr}
                </div>
                {/* Ghost op RHS */}
                <div className="flex items-center text-3xl md:text-5xl font-headline font-bold text-primary animate-pulse">
                  <span className="mx-2 text-primary-fixed">{operationLabel.charAt(0)}</span>
                  <span>{operationLabel.slice(1).trim()}</span>
                </div>
              </div>

              <div className="flex gap-4 w-full max-w-xs">
                <button
                  onClick={() => { setInput(''); setSelectedOp(null) }}
                  className="flex-1 py-3 px-4 rounded-xl bg-error-container text-on-error-container font-headline font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                  CLEAR
                </button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Keypad */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-slate-900/95 backdrop-blur-2xl rounded-t-[2.5rem] p-6 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
          <div className="grid grid-cols-4 gap-3 flex-1">
            {KEYPAD_ROWS.map((row, ri) =>
              row.map((key, ci) => {
                const isOpKey = OP_KEYS.includes(key)
                return (
                  <button
                    key={`${ri}-${ci}`}
                    onClick={() => handleKey(key)}
                    className={`h-14 rounded-2xl font-headline font-bold text-xl transition-colors active:scale-90 ${
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
          <div className="w-full md:w-48 flex flex-col gap-3">
            {solved ? (
              <button
                onClick={onNextPuzzle}
                className="flex-1 bg-gradient-to-br from-secondary to-secondary-container text-on-secondary-container rounded-[1.5rem] font-headline font-extrabold text-2xl tracking-tight uppercase shadow-[0_12px_40px_rgba(105,246,184,0.2)] active:scale-95 transition-all flex flex-col items-center justify-center gap-1 min-h-[120px]"
              >
                <span className="material-symbols-outlined text-4xl">replay</span>
                NEXT
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-[1.5rem] font-headline font-extrabold text-2xl tracking-tight uppercase shadow-[0_12px_40px_rgba(34,177,236,0.3)] active:scale-95 transition-all flex flex-col items-center justify-center gap-1 min-h-[120px]"
              >
                <span className="material-symbols-outlined text-4xl">balance</span>
                BALANCE
              </button>
            )}

            {/* Undo button */}
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="h-12 rounded-2xl bg-surface-container-low text-on-surface-variant font-headline font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container active:scale-95 transition-all disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-base">undo</span>
              Undo
            </button>

            {/* Level selector */}
            <div className="flex items-center justify-between bg-surface-container-low rounded-2xl px-3 py-2">
              <button
                onClick={() => onLevelChange(Math.max(0, levelIndex - 1))}
                disabled={levelIndex === 0}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-primary disabled:opacity-30 hover:bg-surface-container active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="font-headline font-bold text-sm text-on-surface tracking-widest uppercase">
                {levelLabel}
              </span>
              <button
                onClick={() => onLevelChange(Math.min(levelCount - 1, levelIndex + 1))}
                disabled={levelIndex === levelCount - 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-primary disabled:opacity-30 hover:bg-surface-container active:scale-90 transition-all"
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
