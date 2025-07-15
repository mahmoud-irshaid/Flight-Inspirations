import {
  COLUMN_MIN_WIDTHS,
  OBJECT_VALUE_SEPARATOR,
  PRICE_FIELD,
  TOTAL_FIELD,
} from "../constants";
import { TableData } from "../types/tableTypes";

/**
 * Extracts and formats the display value from a table cell
 * @param row - The table row data
 * @param columnKey - The column key to extract value from
 * @returns Formatted string value for display
 */
export const extractCellDisplayValue = (
  row: TableData,
  columnKey: string
): string => {
  const cellValue = row[columnKey as keyof TableData];

  if (typeof cellValue === "string") {
    return cellValue;
  }

  if (typeof cellValue === "object" && cellValue !== null) {
    if (columnKey === PRICE_FIELD && TOTAL_FIELD in cellValue) {
      return cellValue.total;
    }

    const objectValues = Object.values(cellValue).map((value) => String(value));
    return objectValues.join(OBJECT_VALUE_SEPARATOR);
  }

  return String(cellValue);
};

/**
 * Converts camelCase/snake_case strings to Title Case
 * @param text - The text to format
 * @returns Formatted header text
 */
export const formatColumnHeader = (text: string): string => {
  return text
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Formats names to proper title case
 * @param name - The name to format
 * @returns Properly formatted name
 */
export const formatProperName = (name: string): string => {
  return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Calculates the minimum width for a table column
 * @param columnKey - The column key to get width for
 * @returns CSS width value or null if no specific width needed
 */
export const calculateColumnMinWidth = (columnKey: string): string => {
  return COLUMN_MIN_WIDTHS[columnKey as keyof typeof COLUMN_MIN_WIDTHS];
};

/**
 * Checks if a cell value is empty or only whitespace
 * @param row - The table row data
 * @param columnKey - The column key to check
 * @returns True if the cell is empty
 */
export const isCellEmpty = (row: TableData, columnKey: string): boolean => {
  return extractCellDisplayValue(row, columnKey).trim() === "";
};

/**
 * Checks if any cells in the provided data are empty
 * @param data - Array of table data
 * @param columns - Array of column keys to check
 * @returns True if any cell is empty
 */
export const hasEmptyCells = (
  data: TableData[],
  columns: string[]
): boolean => {
  return data.some((row) => columns.some((column) => isCellEmpty(row, column)));
};

/**
 * Gets the available column keys from table data, excluding system columns
 * @param data - Array of table data
 * @param excludeColumns - Array of column keys to exclude
 * @returns Array of column keys
 */
export const getAvailableColumns = (
  data: TableData[],
  excludeColumns: string[] = ["originalIndex"]
): string[] => {
  if (data.length === 0) return [];

  return Object.keys(data[0]).filter((key) => !excludeColumns.includes(key));
};

// Type definitions for better type safety
export type ColumnKey = keyof typeof COLUMN_MIN_WIDTHS;
export type TableUtilsConfig = {
  priceField: string;
  totalField: string;
  separator: string;
};

/**
 * Configuration object for customizing utility behavior
 */
export const TABLE_UTILS_CONFIG: TableUtilsConfig = {
  priceField: PRICE_FIELD,
  totalField: TOTAL_FIELD,
  separator: OBJECT_VALUE_SEPARATOR,
};
