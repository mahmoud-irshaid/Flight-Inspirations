import { render, screen } from "@testing-library/react";
import TableFooter from "./TableFooter";

describe("TableFooter", () => {
  it("renders the footer", () => {
    const editedCells = new Set<string>();
    const hasEmptyCell = false;
    const saveChanges = jest.fn();
    const dataLength = 10;
    const rowsPerPage = 5;
    const page = 0;
    const onPageChange = jest.fn();
    const onRowsPerPageChange = jest.fn();
    render(
      <TableFooter
        editedCells={editedCells}
        hasEmptyCell={hasEmptyCell}
        saveChanges={saveChanges}
        dataLength={dataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    );
    expect(
      screen.getByText(/save changes|fill all cells/i)
    ).toBeInTheDocument();
  });
});
