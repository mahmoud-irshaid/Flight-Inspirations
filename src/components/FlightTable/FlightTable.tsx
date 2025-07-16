import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  MouseEvent,
  ChangeEvent,
} from "react";
import { Container, Box, Typography, Chip, Fade } from "@mui/material";
import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableCell,
  SearchInput,
  InputCell,
} from "../StyledComponents/StyledComponents";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { DateCell } from "../DateCell/DateCell";
import { Edit, TableChart } from "@mui/icons-material";
import TableFooter from "../TableFooter/TableFooter";
import {
  extractCellDisplayValue,
  formatColumnHeader,
  calculateColumnMinWidth,
} from "../../utils/tableUtils";
import { useAppSelector } from "../../store/hooks";
import { TableProps } from "./FlightTable.type";
import "./FlightTable.style.css";

const dateCells = ["departureDate", "returnDate"];

const FlightTable = ({
  data,
  editedCells,
  updateCell,
  saveChanges,
  debouncedFilter,
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderedColumns, setOrderedColumns] = useState<string[]>(
    Object.keys(data[0] || {}).filter((key) => key !== "originalIndex")
  );

  const currency = useAppSelector((state) => state.flights.currency);

  /**
   * Handles pagination page change
   * @param _event - Mouse event (unused)
   * @param newPage - New page number
   */
  const handleChangePage = useCallback(
    (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  /**
   * Handles rows per page change and resets to first page
   * @param event - Input change event
   */
  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  /**
   * Handles column reordering via drag and drop
   * @param result - Drag and drop result containing source and destination
   */
  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      setOrderedColumns((prev) => [...prev]);
      return;
    }
    setOrderedColumns((prev) => {
      const newColumns = Array.from(prev);
      const [reorderedItem] = newColumns.splice(result.source.index, 1);
      newColumns.splice(result.destination!.index, 0, reorderedItem);
      return newColumns;
    });
  }, []);

  const hasEmptyCell = useMemo(
    () =>
      data.some((row) =>
        orderedColumns.some(
          (col) => extractCellDisplayValue(row, col).trim() === ""
        )
      ),
    [data, orderedColumns]
  );

  /**
   * Creates a memoized handler for search input changes
   * @param column - Column name to filter by
   * @returns Input change handler function
   */
  const handleSearchInputChange = useCallback(
    (column: string) => (e: ChangeEvent<HTMLInputElement>) => {
      debouncedFilter(column, e.target.value);
      if (page) setPage(0);
    },
    [debouncedFilter, page]
  );

  /**
   * Creates a memoized handler for date cell changes
   * @param rowIndex - Row index in the data array
   * @param column - Column name to update
   * @returns Date change handler function
   */
  const handleDateCellChange = useCallback(
    (rowIndex: number, column: string) => (value: string) => {
      updateCell(rowIndex, column, value);
    },
    [updateCell]
  );

  /**
   * Creates a memoized handler for input cell changes
   * @param rowIndex - Row index in the data array
   * @param column - Column name to update
   * @returns Input change handler function
   */
  const handleInputCellChange = useCallback(
    (rowIndex: number, column: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        updateCell(rowIndex, column, e.target.value);
      },
    [updateCell]
  );

  useEffect(() => {
    if (data.length > 0 && orderedColumns.length === 0) {
      const columns = Object.keys(data[0]).filter(
        (key) => key !== "originalIndex"
      );
      setOrderedColumns(columns);
    }
  }, [data, orderedColumns.length]);

  return (
    <Container maxWidth="xl" className="table-container-root">
      <Box className="table-header-box">
        <Box className="table-header-title-box">
          <TableChart className="table-header-icon" sx={{ fontSize: 28 }} />
          <Typography
            variant="h4"
            component="h2"
            className="gradient-text table-title"
          >
            Flight Results
          </Typography>
        </Box>

        {data.length > 0 && (
          <Box className="table-chip-box">
            <Chip
              label={`${data.length} flights found`}
              color="primary"
              variant="outlined"
              className="table-chip"
            />
            {editedCells.size > 0 && (
              <Chip
                icon={<Edit />}
                label={`${editedCells.size} unsaved changes`}
                color="warning"
                variant="outlined"
                className="table-chip"
              />
            )}
          </Box>
        )}
      </Box>

      <Fade in={true} timeout={800}>
        <Box style={{ minHeight: "400px" }}>
          <TableContainer>
            <StyledTable style={{ tableLayout: "fixed", width: "100%" }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <thead>
                  <Droppable droppableId="table-columns" direction="horizontal">
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          display: "table-row",
                          width: "100%",
                        }}
                      >
                        {orderedColumns.map((column, index) => (
                          <Draggable
                            key={column}
                            draggableId={column}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              const columnWidth =
                                calculateColumnMinWidth(column) ?? "120px";

                              return (
                                <TableHeader
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={
                                    snapshot.isDragging ? "dragging-header" : ""
                                  }
                                  style={{
                                    ...provided.draggableProps.style,
                                    width: columnWidth,
                                    minWidth: columnWidth,
                                    boxSizing: "border-box",
                                  }}
                                >
                                  {formatColumnHeader(column) +
                                    (column === "price"
                                      ? ` (${currency})`
                                      : "")}
                                  <SearchInput
                                    id={column}
                                    placeholder={`Search ${formatColumnHeader(
                                      column
                                    )}`}
                                    onChange={handleSearchInputChange(column)}
                                  />
                                </TableHeader>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tr>
                    )}
                  </Droppable>
                </thead>

                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <TableCell colSpan={orderedColumns.length}>
                        <Box className="table-empty-box">
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            No flights found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Try adjusting your search criteria or check back
                            later
                          </Typography>
                        </Box>
                      </TableCell>
                    </tr>
                  ) : (
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {orderedColumns.map((column, columnIndex) => (
                            <TableCell
                              key={`${row.originalIndex}-${column}`}
                              isEdited={editedCells.has(
                                `${row.originalIndex}-${column}`
                              )}
                              minWidth={calculateColumnMinWidth(column)}
                              isEmptied={
                                extractCellDisplayValue(row, column).trim() ===
                                ""
                              }
                            >
                              {dateCells.includes(column) ? (
                                <DateCell
                                  value={extractCellDisplayValue(row, column)}
                                  onChange={handleDateCellChange(
                                    row.originalIndex,
                                    column
                                  )}
                                />
                              ) : (
                                <InputCell
                                  id={`${rowIndex}-${columnIndex}`}
                                  value={extractCellDisplayValue(row, column)}
                                  onChange={handleInputCellChange(
                                    row.originalIndex,
                                    column
                                  )}
                                />
                              )}
                            </TableCell>
                          ))}
                        </tr>
                      ))
                  )}
                </tbody>
              </DragDropContext>
            </StyledTable>
          </TableContainer>
        </Box>
      </Fade>
      <TableFooter
        editedCells={editedCells}
        hasEmptyCell={hasEmptyCell}
        saveChanges={saveChanges}
        dataLength={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default memo(FlightTable);
