import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "./components/Autocomplete/Autocomplete";

describe("Autocomplete Component", () => {
  test("renders input field with placeholder", () => {
    render(<Autocomplete placeholder="Search..." lang="en" dir="ltr" />);
    const inputField = screen.getByPlaceholderText("Search...");
    expect(inputField).toBeInTheDocument();
  });
  test("displays the first result as autocomplete inline in the input", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        docs: [
          { title: "React" },
          { title: "Redux" },
          { title: "React Testing Library" },
        ]
      }),
      ok: true
    } as Response);

    render(<Autocomplete placeholder="Search..." lang="en" dir="ltr" />);

    const inputField = screen.getByTestId("visible-input");
    const hiddenInputField = screen.getByTestId("hidden-input");
    userEvent.type(inputField, "Re");

    await waitFor(() => {
      expect(inputField).toHaveValue("re");
      expect(hiddenInputField).toHaveValue("react");
    });

    mockFetch.mockRestore();
  });
});
