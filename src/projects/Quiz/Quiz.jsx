import "./quiz.css";
import Quizfetch from "./comp/Quizfetch";
import { useState } from "react";

export default function Quiz() {
  const [formData, setFormData] = useState({
    cate: 9,
    ques: 5,
    diffi: "easy",
  });
  const [start, setStart] = useState(false);
  const url = `https://opentdb.com/api.php?amount=${formData.ques}&category=${formData.cate}&difficulty=${formData.diffi}&type=multiple`;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStart(true);
  }

  return (
    <main className="quiz-page">
      {!start ? (
        <div className="quiz-card glass">
          <header className="quiz-header">
            <h1 className="gradient-text">Quizzical</h1>
            <p className="quiz-subtitle">Challenge your mind with dynamic trivia</p>
          </header>

          <form onSubmit={handleSubmit} className="quiz-config-form">
            <div className="form-group">
              <label>Select Category</label>
              <select name="cate" value={formData.cate} onChange={handleChange}>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Films</option>
                <option value="12">Entertainment: Music</option>
                <option value="17">Nature & Science</option>
                <option value="18">Science: Computers</option>
                <option value="21">Sports</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="27">Animals</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Questions</label>
                <select name="ques" value={formData.ques} onChange={handleChange}>
                  <option value="5">5 Questions</option>
                  <option value="10">10 Questions</option>
                  <option value="15">15 Questions</option>
                  <option value="20">20 Questions</option>
                </select>
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select name="diffi" value={formData.diffi} onChange={handleChange}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary start-btn">Start Quiz</button>
          </form>

          <div className="quiz-credits">
            Powered by <a href="https://opentdb.com/" target="_blank" rel="noreferrer">Open Trivia DB</a>
          </div>
        </div>
      ) : (
        <Quizfetch url={url} start={start} totalScore={formData.ques} />
      )}
    </main>
  );
}
