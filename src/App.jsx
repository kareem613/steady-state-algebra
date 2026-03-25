import { useState } from 'react'
import GameplayScreen from './GameplayScreen'
import { isSolved } from './algebraEngine'
import { LEVELS, pickEquation } from './levels'

const LEVEL_KEY = 'ssa-level-index'

function getSavedLevelIndex() {
  try {
    const saved = localStorage.getItem(LEVEL_KEY)
    if (saved !== null) {
      const parsed = parseInt(saved, 10)
      if (parsed >= 0 && parsed < LEVELS.length) return parsed
    }
  } catch {}
  return 0
}

export default function App() {
  const [levelIndex, setLevelIndex] = useState(getSavedLevelIndex)
  const [equation, setEquation] = useState(() => pickEquation(LEVELS[getSavedLevelIndex()]))
  const [history, setHistory] = useState([]) // stack of previous equations
  const [solved, setSolved] = useState(false)
  const [attempts, setAttempts] = useState(0)

  function handleLevelChange(newIndex) {
    setLevelIndex(newIndex)
    try { localStorage.setItem(LEVEL_KEY, String(newIndex)) } catch {}
    setEquation(pickEquation(LEVELS[newIndex]))
    setHistory([])
    setSolved(false)
    setAttempts(0)
  }

  function handleApply(operationResult) {
    const next = {
      lhsStr: operationResult.newLhsSimplified,
      rhsStr: operationResult.newRhsSimplified,
    }
    setAttempts(n => n + 1)
    setHistory(prev => [...prev, equation])
    setEquation(next)
    if (isSolved(`${next.lhsStr} = ${next.rhsStr}`)) {
      setSolved(true)
    }
  }

  function handleUndo() {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setEquation(prev)
    setSolved(false)
  }

  function handleNextPuzzle() {
    setEquation(pickEquation(LEVELS[levelIndex]))
    setHistory([])
    setSolved(false)
  }

  return (
    <GameplayScreen
      equation={equation}
      onApply={handleApply}
      onUndo={handleUndo}
      canUndo={history.length > 0}
      solved={solved}
      onNextPuzzle={handleNextPuzzle}
      levelIndex={levelIndex}
      levelCount={LEVELS.length}
      levelLabel={LEVELS[levelIndex].label}
      onLevelChange={handleLevelChange}
      attempts={attempts}
    />
  )
}
