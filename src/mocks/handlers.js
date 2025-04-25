import { rest } from 'msw';

let questions = [
  {
    id: 1,
    prompt: 'lorem testum 1',
    answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    correctIndex: 0,
  },
  {
    id: 2,
    prompt: 'lorem testum 2',
    answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    correctIndex: 0,
  },
];

export const handlers = [
  rest.get('http://localhost:4000/questions', (req, res, ctx) => {
    return res(ctx.json(questions));
  }),

  rest.post('http://localhost:4000/questions', (req, res, ctx) => {
    const { prompt, answers, correctIndex } = req.body;
    const newQuestion = {
      id: questions.length + 1,
      prompt,
      answers,
      correctIndex,
    };
    questions.push(newQuestion);
    return res(ctx.json(newQuestion));
  }),

  rest.delete('http://localhost:4000/questions/:id', (req, res, ctx) => {
    const { id } = req.params;
    questions = questions.filter((q) => q.id !== parseInt(id));
    return res(ctx.status(200));
  }),

  rest.patch('http://localhost:4000/questions/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { correctIndex } = req.body;
    const questionIndex = questions.findIndex((q) => q.id === parseInt(id));
    if (questionIndex !== -1) {
      questions[questionIndex] = {
        ...questions[questionIndex],
        correctIndex: parseInt(correctIndex),
      };
      return res(ctx.json(questions[questionIndex]));
    }
    return res(ctx.status(404));
  }),
];

export const resetQuestions = () => {
  questions = [
    {
      id: 1,
      prompt: 'lorem testum 1',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctIndex: 0,
    },
    {
      id: 2,
      prompt: 'lorem testum 2',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctIndex: 0,
    },
  ];
};