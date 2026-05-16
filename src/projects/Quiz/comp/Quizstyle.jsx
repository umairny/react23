import { useState } from 'react'

export default function QuizStyle(props) {
    const [selections, setSelections] = useState({})
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    function handleSelection(questionId, answer) {
        if (!isFinished) {
            setSelections(prev => ({
                ...prev,
                [questionId]: answer
            }))
        }
    }

    function checkAnswers() {
        if (answeredCount < props.data.length) return

        let correctCount = 0
        props.data.forEach(q => {
            if (selections[q.id] === q.correctAnswer) {
                correctCount++
            }
        })
        setScore(correctCount)
        setIsFinished(true)
    }

    const answeredCount = Object.keys(selections).length
    const progressPercent = Math.round((answeredCount / props.data.length) * 100)
    const scorePercent = props.total ? Math.round((score / props.total) * 100) : 0
    const resultLabel = scorePercent >= 80 ? "Excellent work" : scorePercent >= 50 ? "Solid run" : "Review round"

    return (
        <div className="quiz-container">
            <header className="quiz-play-header">
                <div>
                    <p className="quiz-kicker">{props.settings.category}</p>
                    <h1>{isFinished ? resultLabel : "Answer the set"}</h1>
                </div>
                <div className="quiz-meta">
                    <span>{props.settings.questions} questions</span>
                    <span>{props.settings.difficulty}</span>
                </div>
            </header>

            <div className="quiz-progress-wrap">
                <div className="quiz-progress-label">
                    <span>{answeredCount}/{props.data.length} answered</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className="quiz-progress" aria-label={`${progressPercent}% answered`}>
                    <span style={{ width: `${progressPercent}%` }}></span>
                </div>
            </div>

            <div className='quiz-content'>
                {props.data.map((item, index) => (
                    <div key={item.id} className="question-block">
                        <div className="question-heading">
                            <span>Question {index + 1}</span>
                            {isFinished && selections[item.id] === item.correctAnswer && <strong>Correct</strong>}
                            {isFinished && selections[item.id] !== item.correctAnswer && <strong className="missed">Missed</strong>}
                        </div>
                        <h4 className="question-text">{item.question}</h4>
                        <div className="answers-grid">
                            {item.answers.map((answer, i) => {
                                const isSelected = selections[item.id] === answer
                                const isCorrect = answer === item.correctAnswer
                                const isWrong = isSelected && !isCorrect
                                
                                let statusClass = ""
                                if (isFinished) {
                                    if (isCorrect) statusClass = "correct"
                                    else if (isWrong) statusClass = "wrong"
                                    else statusClass = "dimmed"
                                } else if (isSelected) {
                                    statusClass = "selected"
                                }

                                return (
                                    <button
                                        key={i}
                                        className={`answer-btn ${statusClass}`}
                                        onClick={() => handleSelection(item.id, answer)}
                                        disabled={isFinished}
                                    >
                                        {answer}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
                
                <footer className="quiz-footer">
                    {isFinished ? (
                        <div className="results-area">
                            <p className="score-text">
                                You scored <span className="highlight">{score}/{props.total}</span>
                                <span>{scorePercent}% correct</span>
                            </p>
                            <div className="result-actions">
                                <button className="btn btn-primary" onClick={props.onPlayAgain}>Play Again</button>
                                <button className="btn btn-quiet" onClick={props.onChangeSettings}>Change Settings</button>
                            </div>
                        </div>
                    ) : (
                        <div className="quiz-actions">
                            <button className="btn btn-quiet" onClick={props.onChangeSettings}>
                                Change Settings
                            </button>
                        <button 
                            className="btn btn-primary check-btn" 
                            onClick={checkAnswers}
                                disabled={answeredCount < props.data.length}
                        >
                                Check Answers
                        </button>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    )
}
