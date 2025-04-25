import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  return (
    <ul>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDeleteQuestion={onDeleteQuestion}
          onUpdateCorrectAnswer={onUpdateCorrectAnswer}
        />
      ))}
    </ul>
  );
}

export default QuestionList;
