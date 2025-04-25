import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText((content) => content.includes("lorem testum 1"))).toBeInTheDocument();
  expect(await screen.findByText((content) => content.includes("lorem testum 2"))).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Wait for first render of the list
  await screen.findByText((content) => content.includes("lorem testum 1"));

  // Click the form page
  fireEvent.click(screen.queryByText("New Question"));

  // Fill out the form
  fireEvent.change(screen.queryByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });

  // Submit the form
  fireEvent.submit(screen.queryByRole("form"));

  // View questions
  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText((content) => content.includes("Test Prompt"))).toBeInTheDocument();
  expect(await screen.findByText((content) => content.includes("lorem testum 1"))).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText((content) => content.includes("lorem testum 1"));

  fireEvent.click(screen.queryAllByText("Delete Question")[0]);

  await waitForElementToBeRemoved(() => screen.queryByText((content) => content.includes("lorem testum 1")));

  rerender(<App />);

  await screen.findByText((content) => content.includes("lorem testum 2"));

  expect(screen.queryByText((content) => content.includes("lorem testum 1"))).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText((content) => content.includes("lorem testum 2"));

  fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
    target: { value: "3" },
  });

  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

  rerender(<App />);

  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});
