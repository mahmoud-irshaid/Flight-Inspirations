export type FormData = {
  origin: string;
};

export interface FlightSearchFormProps {
  onSearch: (params: { origin: string; departureDate?: string }) => void;
  searchParams: { origin: string; departureDate?: string };
}
