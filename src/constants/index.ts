export const TOKEN_ENDPOINT = "/v1/security/oauth2/token";
export const FLIGHT_DESTINATIONS_ENDPOINT = "/v1/shopping/flight-destinations";

export const COLUMN_MIN_WIDTHS = {
  price: "8rem",
  returnDate: "10rem",
  departureDate: "10rem",
  origin: "15rem",
  destination: "15rem",
} as const;

export const PRICE_FIELD = "price";
export const TOTAL_FIELD = "total";
export const OBJECT_VALUE_SEPARATOR = " | ";

export const CACHE_KEY = "flights-data";
export const CACHE_TTL = 1000 * 60 * 60;
