import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders the loading indicator", () => {
    render(<Loading />);
    expect(screen.getByText(/searching for flights/i)).toBeInTheDocument();
  });
});
