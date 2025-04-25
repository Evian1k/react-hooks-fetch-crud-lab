import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server, resetQuestions } from "../mocks/server"; // Import resetQuestions

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetQuestions(); // Reset the in-memory questions
});
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  await screen.findByText(/lorem testum 1/);

  fireEvent.click(screen.queryByText("New Question"));

  // Fill out all required fields
  fireEvent.change(screen.queryByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 3/), {
    target: { value: "Test Answer 3" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 4/), {
    target: { value: "Test Answer 4" },
  });
  fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });

  fireEvent.submit(screen.queryByText(/Add Question/));

  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 1/);

  fireEvent.click(screen.queryAllByText("Delete Question")[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/));

  rerender(<App />);

  await screen.findByText(/lorem testum 2/);

  expect(screen.queryByText(/lorem testum 1/)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 2/);

  // Target the dropdown for "lorem testum 2" (second question, index 1)
  const dropdowns = screen.queryAllByLabelText(/Correct Answer/);
  fireEvent.change(dropdowns[1], {
    target: { value: "3" },
  });

  expect(dropdowns[1].value).toBe("3");

  rerender(<App />);

  // Re-query the dropdowns after rerender
  const updatedDropdowns = screen.queryAllByLabelText(/Correct Answer/);
  expect(updatedDropdowns[1].value).toBe("3");
});