import React from 'react';
import 'whatwg-fetch';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import '@testing-library/jest-dom/extend-expect';
import { server } from '../mocks/server';
import App from '../components/App';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays question prompts after fetching', async () => {
  render(<App />);

  await userEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/)).toBeInTheDocument();
});

test('creates a new question when the form is submitted', async () => {
  render(<App />);

  await screen.findByText(/lorem testum 1/);

  await userEvent.click(screen.queryByText('New Question'));

  await userEvent.type(screen.queryByLabelText(/Prompt/), 'Test Prompt');
  await userEvent.type(screen.queryByLabelText(/Answer 1/), 'Test Answer 1');
  await userEvent.type(screen.queryByLabelText(/Answer 2/), 'Test Answer 2');
  await userEvent.type(screen.queryByLabelText(/Answer 3/), 'Test Answer 3');
  await userEvent.type(screen.queryByLabelText(/Answer 4/), 'Test Answer 4');
  await userEvent.selectOptions(screen.queryByLabelText(/Correct Answer/), '1');

  await userEvent.click(screen.queryByText(/Add Question/));

  await userEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
});

test('deletes the question when the delete button is clicked', async () => {
  const { rerender } = render(<App />);

  await userEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 1/);

  await userEvent.click(screen.queryAllByText('Delete Question')[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/));

  rerender(<App />);

  await screen.findByText(/lorem testum 2/);

  expect(screen.queryByText(/lorem testum 1/)).not.toBeInTheDocument();
});

test('updates the answer when the dropdown is changed', async () => {
  const { rerender } = render(<App />);

  await userEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 2/);

  const dropdown = screen.queryAllByLabelText(/Correct Answer/)[0];
  await userEvent.selectOptions(dropdown, '3');

  expect(dropdown).toHaveValue('3');

  rerender(<App />);

  // Ensure the dropdown still exists after rerender
  await screen.findByText(/lorem testum 2/);
  expect(screen.queryAllByLabelText(/Correct Answer/)[0]).toHaveValue('3');
});