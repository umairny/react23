import './Tenzies.css'
import React, { useState, useEffect, useRef } from "react"
import Die from "./comp/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function Tenzies() {
    const levels = {
        1: { diceCount: 10, label: "Beginner" },
        2: { diceCount: 12, label: "Expert" },
        3: { diceCount: 15, label: "Legend" }
    }

    const [currentLevel, setCurrentLevel] = useState(1)
    const [dice, setDice] = useState(() => allNewDice(levels[1].diceCount))
    const [tenzies, setTenzies] = useState(false)
    const [rolls, setRolls] = useState(0)
    const [timer, setTimer] = useState(0)
    const [isGameActive, setIsGameActive] = useState(false)
    const [bestScores, setBestScores] = useState(() => {
        return JSON.parse(localStorage.getItem("tenzies_best_scores")) || {}
    })
    
    const timerRef = useRef(null)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue) {
            setTenzies(true)
            setIsGameActive(false)
            clearInterval(timerRef.current)
            updateBestScores()
        }
    }, [dice])

    function updateBestScores() {
        const currentBest = bestScores[currentLevel] || { rolls: Infinity, time: Infinity }
        const newBest = {
            rolls: Math.min(currentBest.rolls, rolls),
            time: Math.min(currentBest.time, timer)
        }
        
        const updatedScores = {
            ...bestScores,
            [currentLevel]: newBest
        }
        setBestScores(updatedScores)
        localStorage.setItem("tenzies_best_scores", JSON.stringify(updatedScores))
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice(count) {
        const newDice = []
        for (let i = 0; i < count; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function startGame() {
        setTenzies(false)
        setRolls(0)
        setTimer(0)
        setDice(allNewDice(levels[currentLevel].diceCount))
        setIsGameActive(true)
        
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
            setRolls(prev => prev + 1)
        } else {
            startGame()
        }
    }

    function holdDice(id) {
        if (!isGameActive && !tenzies) {
            // Auto start on first die click
            startGame()
        }
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    function changeLevel(level) {
        const l = parseInt(level)
        setCurrentLevel(l)
        setTenzies(false)
        setIsGameActive(false)
        setRolls(0)
        setTimer(0)
        setDice(allNewDice(levels[l].diceCount))
        clearInterval(timerRef.current)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

    const levelBest = bestScores[currentLevel]

    return (
        <main className="tenzies-page">
            <div className="tenzies-container glass">
                {tenzies && <Confetti />}
                
                <header className="tenzies-header">
                    <h1 className="gradient-text">Tenzies</h1>
                    <p className="instructions">
                        Roll until all dice are the same. Click each die to freeze it.
                    </p>
                </header>

                <div className="levels-track">
                    {Object.keys(levels).map(lvl => (
                        <button 
                            key={lvl}
                            className={`level-btn ${currentLevel === parseInt(lvl) ? 'active' : ''}`}
                            onClick={() => changeLevel(lvl)}
                        >
                            Level {lvl}: {levels[lvl].label}
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
                    {levelBest && levelBest.rolls !== Infinity && (
                        <div className="stat-item best">
                            <span className="stat-label">Best</span>
                            <span className="stat-value">{levelBest.rolls} rolls / {formatTime(levelBest.time)}</span>
                        </div>
                    )}
                </div>

                <div className={`dice-grid level-${currentLevel}`}>
                    {diceElements}
                </div>

                <button 
                    className="btn btn-primary roll-btn" 
                    onClick={tenzies ? startGame : rollDice}
                >
                    {tenzies ? "Play Again" : (isGameActive ? "Roll Dice" : "Start Game")}
                </button>
            </div>
        </main>
    )
}
