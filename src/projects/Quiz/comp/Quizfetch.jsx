import { useEffect, useState } from "react";
import QuizStyle from "./Quizstyle";
import ShowError from "./ShowError";
import Loading from "./Loading";
import { nanoid } from "nanoid";

function decodeHtml(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

export default function Quizfetch(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    setError(null);
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code !== 0) {
          throw new Error("Failed to fetch questions. Please try different options.");
        }
        
        const processedData = data.results.map((q) => {
          const id = nanoid();
          const allAnswers = [...q.incorrect_answers, q.correct_answer];
          
          // Fisher-Yates shuffle for stable randomization
          for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
          }

          return {
            id: id,
            question: decodeHtml(q.question),
            correctAnswer: decodeHtml(q.correct_answer),
            answers: allAnswers.map(decodeHtml)
          };
        });

        setQuizData(processedData);
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err);
        setIsLoaded(true);
      });
  }, [props.url]);

  if (error) {
    return <ShowError err={error} onChangeSettings={props.onChangeSettings} />;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <QuizStyle
        data={quizData}
        total={props.totalScore}
        settings={props.settings}
        onPlayAgain={props.onPlayAgain}
        onChangeSettings={props.onChangeSettings}
      />
    );
  }
}
