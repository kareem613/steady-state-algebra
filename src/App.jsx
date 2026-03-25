import { useState } from 'react'
import GameplayScreen from './GameplayScreen'
import GhostPreviewScreen from './GhostPreviewScreen'
import { isSolved } from './algebraEngine'

const INITIAL_EQUATION = {
  lhsStr: '3 * x + 6',
  rhsStr: '12',
}

export default function App() {
  const [equation, setEquation] = useState(INITIAL_EQUATION)
  const [screen, setScreen] = useState('gameplay') // 'gameplay' | 'ghost'
  const [pendingOperation, setPendingOperation] = useState(null)
  const [solved, setSolved] = useState(false)

  function handlePreview(operationResult) {
    setPendingOperation(operationResult)
    setScreen('ghost')
  }

  function handleAccept() {
    if (!pendingOperation) return
    const next = {
      lhsStr: pendingOperation.newLhsSimplified,
      rhsStr: pendingOperation.newRhsSimplified,
    }
    setEquation(next)
    setPendingOperation(null)
    setScreen('gameplay')
    if (isSolved(`${next.lhsStr} = ${next.rhsStr}`)) {
      setSolved(true)
    }
  }

  function handleBack() {
    setPendingOperation(null)
    setScreen('gameplay')
  }

  if (solved) {
    return (
      <div className="bg-background text-on-background font-body min-h-screen flex flex-col items-center justify-center dark">
        <div className="text-center p-12">
          <div className="text-secondary font-headline text-6xl font-bold mb-4">✓</div>
          <h1 className="text-4xl font-headline font-bold text-on-background mb-4">Solved!</h1>
          <p className="text-on-surface-variant text-xl mb-8">
            <span className="font-mono text-primary">{equation.lhsStr} = {equation.rhsStr}</span>
          </p>
          <button
            onClick={() => { setEquation(INITIAL_EQUATION); setSolved(false) }}
            className="px-8 py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-bold text-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'ghost' && pendingOperation) {
    return (
      <GhostPreviewScreen
        equation={equation}
        operation={pendingOperation}
        onAccept={handleAccept}
        onBack={handleBack}
      />
    )
  }

  return (
    <GameplayScreen
      equation={equation}
      onPreview={handlePreview}
    />
  )
}
