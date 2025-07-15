import { render, screen } from "@testing-library/react";
import { DateCell } from "./DateCell";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("DateCell", () => {
  it("renders a date value", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCell value="2025-08-01" onChange={jest.fn()} />
      </LocalizationProvider>
    );
    expect(screen.getByDisplayValue("08/01/2025")).toBeInTheDocument();
  });
});
