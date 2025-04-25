import React from 'react';

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  return (
    <ul>
      {questions.map(question => (
        <li key={question.id}>
          <p>{question.prompt}</p>
          <select
            value={question.correctIndex}
            onChange={(e) => onUpdateCorrectAnswer(question.id, parseInt(e.target.value))}
          >
            {question.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
          <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;