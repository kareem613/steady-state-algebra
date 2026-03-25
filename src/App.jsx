import { useState } from 'react'
import GameplayScreen from './GameplayScreen'
import { isSolved } from './algebraEngine'
import { LEVELS, pickEquation } from './levels'

export default function App() {
  const [levelIndex, setLevelIndex] = useState(0)
  const [equation, setEquation] = useState(() => pickEquation(LEVELS[0]))
  const [history, setHistory] = useState([]) // stack of previous equations
  const [solved, setSolved] = useState(false)

  function handleLevelChange(newIndex) {
    setLevelIndex(newIndex)
    setEquation(pickEquation(LEVELS[newIndex]))
    setHistory([])
    setSolved(false)
  }

  function handleApply(operationResult) {
    const next = {
      lhsStr: operationResult.newLhsSimplified,
      rhsStr: operationResult.newRhsSimplified,
    }
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
    />
  )
}
