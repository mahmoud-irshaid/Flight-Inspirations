import { TableData } from "../../types/tableTypes";

export interface TableProps {
  data: TableData[];
  editedCells: Set<string>;
  updateCell: (rowIndex: number, column: string, value: string) => void;
  saveChanges: () => void;
  debouncedFilter: (column: string, value: string) => void;
  searchParams: { origin: string; departureDate?: string };
}
