import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("catches errors and displays fallback UI", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const ProblemChild = () => {
      throw new Error("Test error");
    };
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    (console.error as jest.Mock).mockRestore &&
      (console.error as jest.Mock).mockRestore();
  });
});
