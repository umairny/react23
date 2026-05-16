import './Tenzies.css'
import React, { useState, useEffect } from "react"
import Die from "./comp/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

const levels = {
    1: { diceCount: 10, label: "Beginner", targetRolls: 8 },
    2: { diceCount: 12, label: "Expert", targetRolls: 11 },
    3: { diceCount: 15, label: "Legend", targetRolls: 14 }
}

function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

function allNewDice(count) {
    return Array.from({ length: count }, generateNewDie)
}

function getStoredBestScores() {
    try {
        return JSON.parse(localStorage.getItem("tenzies_best_scores")) || {}
    } catch {
        return {}
    }
}

function isBetterScore(nextScore, currentBest) {
    if (!currentBest) return true
    if (nextScore.rolls < currentBest.rolls) return true
    return nextScore.rolls === currentBest.rolls && nextScore.time < currentBest.time
}

export default function Tenzies() {
    const [currentLevel, setCurrentLevel] = useState(1)
    const [dice, setDice] = useState(() => allNewDice(levels[1].diceCount))
    const [tenzies, setTenzies] = useState(false)
    const [rolls, setRolls] = useState(0)
    const [timer, setTimer] = useState(0)
    const [isGameActive, setIsGameActive] = useState(false)
    const [lastScore, setLastScore] = useState(null)
    const [bestScores, setBestScores] = useState(getStoredBestScores)

    useEffect(() => {
        if (!isGameActive) return undefined

        const intervalId = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [isGameActive])

    useEffect(() => {
        if (tenzies || dice.length === 0) return

        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue) {
            const finishedScore = { rolls, time: timer }

            setTenzies(true)
            setIsGameActive(false)
            setLastScore(finishedScore)
            updateBestScores(finishedScore)
        }
    }, [dice])

    function updateBestScores(finishedScore) {
        const currentBest = bestScores[currentLevel]
        if (!isBetterScore(finishedScore, currentBest)) return

        const updatedScores = {
            ...bestScores,
            [currentLevel]: finishedScore
        }
        setBestScores(updatedScores)
        localStorage.setItem("tenzies_best_scores", JSON.stringify(updatedScores))
    }

    function startGame() {
        setTenzies(false)
        setLastScore(null)
        setRolls(0)
        setTimer(0)
        setDice(allNewDice(levels[currentLevel].diceCount))
        setIsGameActive(true)
    }

    function rollDice() {
        if (tenzies) {
            startGame()
            return
        }

        if (!isGameActive) {
            startGame()
            return
        }

        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))
        setRolls(prev => prev + 1)
    }

    function holdDice(id) {
        if (tenzies) return

        if (!isGameActive) {
            setIsGameActive(true)
        }

        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    function releaseAllDice() {
        if (tenzies) return

        setDice(oldDice => oldDice.map(die => ({ ...die, isHeld: false })))
    }

    function quickPick(value) {
        if (tenzies) return

        if (!isGameActive) {
            setIsGameActive(true)
        }

        setDice(oldDice => oldDice.map(die => ({
            ...die,
            isHeld: die.value === value
        })))
    }

    function rollUnlockedDice() {
        if (tenzies || !isGameActive) return

        const unlockedDice = dice.some(die => !die.isHeld)
        if (unlockedDice) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
            setRolls(prev => prev + 1)
        }
    }

    function changeLevel(level) {
        const l = parseInt(level)
        setCurrentLevel(l)
        setTenzies(false)
        setLastScore(null)
        setIsGameActive(false)
        setRolls(0)
        setTimer(0)
        setDice(allNewDice(levels[l].diceCount))
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const heldCount = dice.filter(die => die.isHeld).length
    const targetValue = dice.find(die => die.isHeld)?.value
    const levelBest = bestScores[currentLevel]
    const currentLevelData = levels[currentLevel]
    const progressPercent = Math.round((heldCount / dice.length) * 100)
    const activeValues = [1, 2, 3, 4, 5, 6].map(value => ({
        value,
        count: dice.filter(die => die.value === value).length
    }))
    const statusMessage = tenzies
        ? `Won in ${lastScore?.rolls || rolls} rolls and ${formatTime(lastScore?.time || timer)}.`
        : targetValue
            ? `Chasing ${targetValue}s. ${heldCount} of ${dice.length} locked.`
            : `Pick a number to chase. A sharp ${currentLevelData.label} run is about ${currentLevelData.targetRolls} rolls.`

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main className="tenzies-page">
            <div className="tenzies-container">
                {tenzies && <Confetti />}
                
                <header className="tenzies-header">
                    <div>
                        <p className="eyebrow">Dice sprint</p>
                        <h1>Tenzies</h1>
                    </div>
                    <p className="instructions">
                        Roll until every die shows the same number. Lock the good dice, reroll the rest, and beat your record.
                    </p>
                </header>

                <div className="levels-track">
                    {Object.keys(levels).map(lvl => (
                        <button 
                            key={lvl}
                            className={`level-btn ${currentLevel === parseInt(lvl) ? 'active' : ''}`}
                            onClick={() => changeLevel(lvl)}
                        >
                            <span>Level {lvl}</span>
                            <strong>{levels[lvl].label}</strong>
                        </button>
                    ))}
                </div>

                <div className="stats-board">
                    <div className="stat-item">
                        <span className="stat-label">Rolls</span>
                        <span className="stat-value">{rolls}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Time</span>
                        <span className="stat-value">{formatTime(timer)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Locked</span>
                        <span className="stat-value">{heldCount}/{dice.length}</span>
                    </div>
                    <div className="stat-item best">
                        <span className="stat-label">Best</span>
                        <span className="stat-value">
                            {levelBest ? `${levelBest.rolls} rolls / ${formatTime(levelBest.time)}` : "No record"}
                        </span>
                    </div>
                </div>

                <section className="game-panel" aria-label="Tenzies game board">
                    <div className="game-status">
                        <div>
                            <span className={`status-pill ${tenzies ? "won" : isGameActive ? "live" : ""}`}>
                                {tenzies ? "Complete" : isGameActive ? "Live" : "Ready"}
                            </span>
                            <p>{statusMessage}</p>
                        </div>
                        <div className="progress-meter" aria-label={`${progressPercent}% complete`}>
                            <span style={{ width: `${progressPercent}%` }}></span>
                        </div>
                    </div>

                    <div className={`dice-grid level-${currentLevel}`}>
                        {diceElements}
                    </div>
                </section>

                <div className="quick-picks" aria-label="Quick hold dice by value">
                    {activeValues.map(item => (
                        <button
                            key={item.value}
                            className={targetValue === item.value ? "active" : ""}
                            type="button"
                            onClick={() => quickPick(item.value)}
                        >
                            <span>{item.value}</span>
                            <small>{item.count}</small>
                        </button>
                    ))}
                </div>

                <div className="controls-row">
                    <button 
                        className="btn btn-primary roll-btn" 
                        onClick={rollDice}
                    >
                        {tenzies ? "Play Again" : (isGameActive ? "Roll Dice" : "Start Game")}
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        type="button"
                        onClick={rollUnlockedDice}
                        disabled={!isGameActive || tenzies || heldCount === dice.length}
                    >
                        Roll Open
                    </button>
                    <button 
                        className="btn btn-ghost" 
                        type="button"
                        onClick={releaseAllDice}
                        disabled={tenzies || heldCount === 0}
                    >
                        Release All
                    </button>
                </div>
            </div>
        </main>
    )
}
