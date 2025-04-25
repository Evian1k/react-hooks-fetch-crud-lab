import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:4000/questions', (req, res, ctx) => {
    return res(
      ctx.json([
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
      ])
    );
  }),

  rest.post('http://localhost:4000/questions', (req, res, ctx) => {
    const { prompt, answers, correctIndex } = req.body;
    return res(
      ctx.json({
        id: 3,
        prompt,
        answers,
        correctIndex,
      })
    );
  }),

  rest.delete('http://localhost:4000/questions/:id', (req, res, ctx) => {
    return res(ctx.json({}));
  }),

  rest.patch('http://localhost:4000/questions/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { correctIndex } = req.body;
    return res(
      ctx.json({
        id: parseInt(id),
        prompt: 'lorem testum 1',
        answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctIndex,
      })
    );
  }),
];