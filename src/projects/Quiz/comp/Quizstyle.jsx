import topImg from '../images/topblobs.png'
import botImg from '../images/bottomblobs.png'
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
        let correctCount = 0
        props.data.forEach(q => {
            if (selections[q.id] === q.correctAnswer) {
                correctCount++
            }
        })
        setScore(correctCount)
        setIsFinished(true)
    }

    function resetQuiz() {
        window.location.reload()
    }

    return (
        <div className="quiz-container glass">
            <div className='quiz-content'>
                {props.data.map((item, index) => (
                    <div key={item.id} className="question-block">
                        <h4 className="question-text" dangerouslySetInnerHTML={{ __html: item.question }}></h4>
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
                                        dangerouslySetInnerHTML={{ __html: answer }}
                                    ></button>
                                )
                            })}
                        </div>
                    </div>
                ))}
                
                <footer className="quiz-footer">
                    {isFinished ? (
                        <div className="results-area">
                            <p className="score-text">
                                You scored <span className="highlight">{score}/{props.total}</span> correct answers
                            </p>
                            <button className="btn btn-primary" onClick={resetQuiz}>Play again</button>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-primary check-btn" 
                            onClick={checkAnswers}
                            disabled={Object.keys(selections).length < props.data.length}
                        >
                            Check answers
                        </button>
                    )}
                </footer>
            </div>
        </div>
    )
}
