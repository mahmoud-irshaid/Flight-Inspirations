import { useState, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import { TableData } from "../types/tableTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { searchFlights } from "../store/flightsSlice";
import { getCached, setCached } from "../utils/cacheUtils";
import { CACHE_KEY, CACHE_TTL } from "../constants";

export const useTableData = (searchParams: {
  origin: string;
  departureDate?: string;
}) => {
  const dispatch = useAppDispatch();
  const flights = useAppSelector((state) => state.flights.flights);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );
  const [localData, setLocalData] = useState<TableData[]>([]);

  /**
   * Saves current changes to cache and resets edited cells state
   */
  const saveChanges = useCallback(() => {
    setEditedCells(new Set());
    setCached(CACHE_KEY, searchParams, localData);
  }, [searchParams, localData]);

  /**
   * Updates a specific cell in the table data
   * @param originalIndex - Row index in the original data array
   * @param columnId - Column identifier to update
   * @param value - New value for the cell
   */
  const updateCell = useCallback(
    (originalIndex: number, columnId: string, value: string) => {
      const updatedData = [...localData];
      updatedData[originalIndex] = {
        ...updatedData[originalIndex],
        [columnId]: value,
      };
      setLocalData(updatedData);
      setEditedCells((prev) =>
        new Set(prev).add(`${originalIndex}-${columnId}`)
      );
    },
    [localData]
  );

  /**
   * Debounced filter function to avoid excessive filtering on rapid input changes
   */
  const debouncedFilter = useMemo(
    () =>
      debounce((column: string, value: string) => {
        setColumnFilters((prev) => ({
          ...prev,
          [column]: value,
        }));
      }, 300),
    []
  );

  /**
   * Filtered data based on current column filters
   */
  const filteredData = useMemo(() => {
    return localData.filter((row) => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        const value = row[column as keyof TableData];
        if (typeof value === "string") {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        } else if (typeof value === "object" && value !== null) {
          if ("total" in value) {
            return value.total
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
          return JSON.stringify(value)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [localData, columnFilters]);

  // Load from cache or fetch new data when search parameters change
  useEffect(() => {
    const cached = getCached<TableData[]>(CACHE_KEY, CACHE_TTL, searchParams);
    if (cached) {
      setLocalData(cached);
    } else {
      dispatch(searchFlights(searchParams));
    }
    setEditedCells(new Set());
  }, [dispatch, searchParams]);

  // Sync Redux data to local state when flights data changes
  useEffect(() => {
    const cached = getCached<TableData[]>(CACHE_KEY, CACHE_TTL, searchParams);
    if (!cached && flights.length > 0) {
      setLocalData(flights);
    }
  }, [flights, searchParams]);

  return {
    data: filteredData,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
  };
};
