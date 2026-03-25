import { useState } from 'react'
import GameplayScreen from './GameplayScreen'
import { isSolved } from './algebraEngine'
import { LEVELS, pickEquation } from './levels'

export default function App() {
  const [levelIndex, setLevelIndex] = useState(0)
  const [equation, setEquation] = useState(() => pickEquation(LEVELS[0]))
  const [solved, setSolved] = useState(false)

  function handleLevelChange(newIndex) {
    setLevelIndex(newIndex)
    setEquation(pickEquation(LEVELS[newIndex]))
    setSolved(false)
  }

  function handleApply(operationResult) {
    const next = {
      lhsStr: operationResult.newLhsSimplified,
      rhsStr: operationResult.newRhsSimplified,
    }
    setEquation(next)
    if (isSolved(`${next.lhsStr} = ${next.rhsStr}`)) {
      setSolved(true)
    }
  }

  function handleNextPuzzle() {
    setEquation(pickEquation(LEVELS[levelIndex]))
    setSolved(false)
  }

  return (
    <GameplayScreen
      equation={equation}
      onApply={handleApply}
      solved={solved}
      onNextPuzzle={handleNextPuzzle}
      levelIndex={levelIndex}
      levelCount={LEVELS.length}
      levelLabel={LEVELS[levelIndex].label}
      onLevelChange={handleLevelChange}
    />
  )
}
