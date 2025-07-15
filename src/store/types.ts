import { FlightsResponse } from "../types/flightsTypes";
import { TableData } from "../types/tableTypes";

export interface FlightsState {
  flights: TableData[];
  loading: boolean;
  error: string | null;
  dictionaries: FlightsResponse["dictionaries"] | null;
  meta: FlightsResponse["meta"] | null;
  currency: string;
}
