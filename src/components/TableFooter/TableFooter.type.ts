export interface TableFooterProps {
  editedCells: Set<string>;
  hasEmptyCell: boolean;
  saveChanges: () => void;
  dataLength: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
