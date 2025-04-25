import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <ul>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDeleteQuestion={onDeleteQuestion}
          onUpdateQuestion={onUpdateQuestion}
        />
      ))}
    </ul>
  );
}

export default QuestionList;