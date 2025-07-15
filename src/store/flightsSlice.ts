import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFlights, fetchToken } from "../services/flightsApi";
import { formatProperName } from "../utils/tableUtils";
import { Flight } from "../types/flightsTypes";
import { FlightsState } from "./types";

const initialState: FlightsState = {
  flights: [],
  loading: false,
  error: null,
  dictionaries: null,
  meta: null,
  currency: "",
};

/**
 * Async thunk for searching flights with optional departure date
 * @param params - Object containing origin and optional departure date
 * @returns Promise resolving to flight search results with dictionaries and meta data
 */
export const searchFlights = createAsyncThunk(
  "flights/searchFlights",
  async (
    { origin, departureDate }: { origin: string; departureDate?: string },
    { rejectWithValue }
  ) => {
    try {
      const token = await fetchToken();
      const response = await fetchFlights(token, origin, departureDate);
      return response;
    } catch (error) {
      return rejectWithValue(
        "Failed to search flights, please make sure to fill proper data and try again!"
      );
    }
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        const { data, dictionaries, meta } = action.payload;

        state.dictionaries = dictionaries;
        state.meta = meta;
        state.currency = meta.currency;

        state.flights = data.map((flight: Flight, index: number) => {
          const originLocation = dictionaries.locations?.[flight.origin];
          const destinationLocation =
            dictionaries.locations?.[flight.destination];

          return {
            originalIndex: index,
            origin: originLocation
              ? `${flight.origin} - ${formatProperName(
                  originLocation.detailedName
                )}`
              : flight.origin,
            destination: destinationLocation
              ? `${flight.destination} - ${formatProperName(
                  destinationLocation.detailedName
                )}`
              : flight.destination,
            price: flight.price,
            departureDate: flight.departureDate,
            returnDate: flight.returnDate,
          };
        });

        state.loading = false;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flightsSlice.reducer;
