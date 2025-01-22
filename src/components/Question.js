import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Adding useEffect to manage the countdown timer
  useEffect(() => {
    // Only set the timeout if timeRemaining is greater than 0
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup function to clear the timeout when the component re-renders
      return () => clearTimeout(timer);
    } else {
      // When timeRemaining hits 0, reset it and trigger onAnswered callback with false
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Depend on timeRemaining and onAnswered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset time when an answer is selected
    onAnswered(isCorrect); // Send the answer status to parent
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
