import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: "What is the name of the little mermaid in the Disney movie?",
    options: ["Ariel", "Chloe", "Seven", "Blue"],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    questionText:
      "What is the name of the toy cowboy in the movie “Toy Story?",
    options: ["Pluto", "Mickey", "Woody", "Harry"],
    correctAnswerIndex: 2
  },

  {
    id: 3,
    questionText:
      "What was the name of the group Justin Timberlake used to be part of?",
    options: ["Backstreet boys", "N’ SYNC", "Five", "NKOTB"],
    correctAnswerIndex: 1
  },

  {
    id: 4,
    questionText:
      "Who is often referred to as the “King of Pop” and is known for iconic hits like “Thriller” and “Billie Jean”?",
    options: ["Boy George", "Prince", "Stevie Wonder", "Michael Jackson"],
    correctAnswerIndex: 3
  },

  {
    id: 5,
    questionText:
      "What’s the name of the paradise warriors go to after death?",
    options: ["Valhalla", "Mars", "Egypt", "Vasa"],
    correctAnswerIndex: 0
  },
  ];


const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);
ho
      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });

       
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    }
  }
});
