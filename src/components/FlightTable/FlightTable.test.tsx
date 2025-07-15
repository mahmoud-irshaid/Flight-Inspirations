import { render, screen } from "@testing-library/react";
import FlightTable from "./FlightTable";
import { TableData } from "../../types/tableTypes";
import { Provider } from "react-redux";
import { store } from "../../store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("FlightTable", () => {
  it("renders the table", () => {
    const mockData: TableData[] = [
      {
        originalIndex: 0,
        departureDate: "2025-08-01",
        destination: "NYC",
        origin: "MAD",
        price: { total: "500" },
        returnDate: "2053-08-10",
      },
    ];
    const editedCells = new Set<string>();
    const updateCell = jest.fn();
    const saveChanges = jest.fn();
    const debouncedFilter = jest.fn();
    const searchParams = { origin: "MAD", departureDate: "2025-08-01" };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <FlightTable
            data={mockData}
            editedCells={editedCells}
            updateCell={updateCell}
            saveChanges={saveChanges}
            debouncedFilter={debouncedFilter}
            searchParams={searchParams}
          />
        </Provider>
      </LocalizationProvider>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
