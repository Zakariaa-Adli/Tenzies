import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const [seconds, setSeconds] = useState(0)
  const [gameStarted, setGamestarted] = useState(false)
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (!gameStarted || gameWon) return

    const intervalId = setInterval(() => {
      setSeconds(oldSeconds => oldSeconds + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [gameStarted, gameWon])


  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
      setSeconds(0)
      setGamestarted(false)
      return
    }

    setGamestarted(true)

    setDice(oldDice => oldDice.map(die =>
      die.isHeld
        ? die
        : { ...die, value: Math.ceil(Math.random() * 6) }
    ))
  }

  function hold(id) {
    setGamestarted(true)

    setDice(oldDice => oldDice.map(die =>
      die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    ))
  }

  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <p> Time : {seconds}s </p>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}