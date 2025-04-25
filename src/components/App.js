import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar'; // Fixed path
import QuestionForm from './QuestionForm'; // Fixed path
import QuestionList from './QuestionList'; // Fixed path

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((addedQuestion) => setQuestions([...questions, addedQuestion]));
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: 'DELETE' })
      .then(() => setQuestions(questions.filter((q) => q.id !== id)));
  };

  const handleUpdateQuestion = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((q) => (q.id === id ? updatedQuestion : q))
        );
      });
  };

  return (
    <div className="App">
      <main>
        <AdminNavBar onChangePage={setPage} />
        <section>
          <h1>Quiz Questions</h1>
          {page === 'Form' ? (
            <QuestionForm onAddQuestion={handleAddQuestion} />
          ) : (
            <QuestionList
              questions={questions}
              onDeleteQuestion={handleDeleteQuestion}
              onUpdateQuestion={handleUpdateQuestion}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;