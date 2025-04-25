import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:4000/questions', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          prompt: "lorem testum 1",
          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          correctIndex: 2,
        },
        // Add more questions if needed
      ])
    );
  }),

  rest.post('http://localhost:4000/questions', (req, res, ctx) => {
    const newQuestion = {
      ...req.body,
      id: Math.floor(Math.random() * 1000), // Simulated ID
    };
    return res(ctx.status(201), ctx.json(newQuestion));
  }),

  rest.patch('http://localhost:4000/questions/:id', (req, res, ctx) => {
    return res(ctx.json({ ...req.body }));
  }),

  rest.delete('http://localhost:4000/questions/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
