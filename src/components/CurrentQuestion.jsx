import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const question = useSelector((state) => state.quiz.questions[currentQuestionIndex]);
  const userAnswer = useSelector((state) => state.quiz.answers[currentQuestionIndex]);
  const quizOver = useSelector((state) => state.quiz.quizOver);

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const answerIndex = parseInt(event.target.elements.answer.value, 10);
    if (!isNaN(answerIndex)) {
      console.log('Submitting answer:', answerIndex);
      dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex }));
    }
  };

  const handleNextQuestion = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };

  if (quizOver) {
    return <h1>Congratulations! Quiz Over</h1>;
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div className="question-container" >
      <h1>Question: {question.questionText}</h1>
           <form onSubmit={handleAnswerSubmit}>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              className="radio-button"
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={index}
              checked={(userAnswer && userAnswer.answerIndex === index) || (userAnswer && userAnswer.isCorrect)}
              disabled={userAnswer && userAnswer.isCorrect}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
        {!userAnswer && (
          <button className="submit-button" type="submit">
            Submit Answer
          </button>
        )}
        <p>{userAnswer && (userAnswer.isCorrect ? " Correct!" : " Wrong answer!")}</p>
        <p>
          {userAnswer && !userAnswer.isCorrect && (
            <>Correct answer is {question.options[question.correctAnswerIndex]}</>
          )}
        </p>

        {userAnswer && (
          <button className="next-button" onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </form>
    </div>
  );
};
