import "./quiz.css";
import Quizfetch from "./comp/Quizfetch";
import { useState } from "react";

const categories = [
  { value: "9", label: "General Knowledge" },
  { value: "10", label: "Books" },
  { value: "11", label: "Films" },
  { value: "12", label: "Music" },
  { value: "17", label: "Nature & Science" },
  { value: "18", label: "Computers" },
  { value: "21", label: "Sports" },
  { value: "23", label: "History" },
  { value: "24", label: "Politics" },
  { value: "25", label: "Art" },
  { value: "27", label: "Animals" },
];

const questionCounts = ["5", "10", "15", "20"];
const difficulties = ["easy", "medium", "hard"];

export default function Quiz() {
  const [formData, setFormData] = useState({
    cate: "9",
    ques: "5",
    diffi: "easy",
  });
  const [start, setStart] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const url = `https://opentdb.com/api.php?amount=${formData.ques}&category=${formData.cate}&difficulty=${formData.diffi}&type=multiple`;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setQuizKey(prev => prev + 1);
    setStart(true);
  }

  function playAgain() {
    setQuizKey(prev => prev + 1);
  }

  function changeSettings() {
    setStart(false);
  }

  const selectedCategory = categories.find(category => category.value === formData.cate)?.label;

  return (
    <main className="quiz-page">
      {!start ? (
        <div className="quiz-card">
          <header className="quiz-header">
            <p className="quiz-kicker">Trivia trainer</p>
            <h1>Quizzical</h1>
            <p className="quiz-subtitle">Choose a lane, answer every question, then review what you missed.</p>
          </header>

          <form onSubmit={handleSubmit} className="quiz-config-form">
            <div className="form-group">
              <label>Select Category</label>
              <select name="cate" value={formData.cate} onChange={handleChange}>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Questions</label>
                <div className="segmented-control">
                  {questionCounts.map(count => (
                    <label key={count} className={formData.ques === count ? "active" : ""}>
                      <input
                        type="radio"
                        name="ques"
                        value={count}
                        checked={formData.ques === count}
                        onChange={handleChange}
                      />
                      {count}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <div className="segmented-control difficulty-control">
                  {difficulties.map(difficulty => (
                    <label key={difficulty} className={formData.diffi === difficulty ? "active" : ""}>
                      <input
                        type="radio"
                        name="diffi"
                        value={difficulty}
                        checked={formData.diffi === difficulty}
                        onChange={handleChange}
                      />
                      {difficulty}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="quiz-summary">
              <span>{selectedCategory}</span>
              <span>{formData.ques} questions</span>
              <span>{formData.diffi}</span>
            </div>

            <button className="btn btn-primary start-btn">Start Quiz</button>
          </form>

          <div className="quiz-credits">
            Powered by <a href="https://opentdb.com/" target="_blank" rel="noreferrer">Open Trivia DB</a>
          </div>
        </div>
      ) : (
        <Quizfetch
          key={quizKey}
          url={url}
          totalScore={Number(formData.ques)}
          settings={{
            category: selectedCategory,
            difficulty: formData.diffi,
            questions: formData.ques
          }}
          onPlayAgain={playAgain}
          onChangeSettings={changeSettings}
        />
      )}
    </main>
  );
}
