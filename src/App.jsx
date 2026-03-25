import { useState } from 'react'
import GameplayScreen from './GameplayScreen'
import LevelSelectScreen from './LevelSelectScreen'
import { isSolved } from './algebraEngine'
import { pickEquation } from './levels'

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [equation, setEquation] = useState(null)
  const [solved, setSolved] = useState(false)

  function handleSelectLevel(level) {
    setSelectedLevel(level)
    setEquation(pickEquation(level))
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

  // Show level selector on first launch or after solving
  if (!selectedLevel || solved) {
    return (
      <LevelSelectScreen
        onSelect={handleSelectLevel}
        solvedEquation={solved ? equation : null}
      />
    )
  }

  return (
    <GameplayScreen
      equation={equation}
      onApply={handleApply}
    />
  )
}
