import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => setQuestions([...questions, data]))
      .catch(error => console.error('Error adding question:', error));
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setQuestions(questions.filter(q => q.id !== id));
        }
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  const handleUpdateCorrectAnswer = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(response => response.json())
      .then(() => {
        setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q.id === id ? { ...q, correctIndex: newCorrectIndex } : q
          )
        );
      })
      .catch(error => console.error('Error updating question:', error));
  };
  

  return (
    <div className="App">
      <main>
        <nav>
          <button onClick={() => setShowQuestions(false)}>New Question</button>
          <button onClick={() => setShowQuestions(true)}>View Questions</button>
        </nav>
        <section>
          <h1>Quiz Questions</h1>
          {showQuestions ? (
            <QuestionList
              questions={questions}
              onDeleteQuestion={handleDeleteQuestion}
              onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
            />
          ) : (
            <QuestionForm onAddQuestion={handleAddQuestion} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
