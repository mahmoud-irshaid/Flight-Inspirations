import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import { FlightsResponse } from "../types/flightsTypes";
import { getCached, setCached } from "../utils/cacheUtils";
import { FLIGHT_DESTINATIONS_ENDPOINT, TOKEN_ENDPOINT } from "../constants";

/**
 * Fetches a new access token from Amadeus API.
 */
export const fetchToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${axiosConfig.API_BASE_URL}${TOKEN_ENDPOINT}`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: axiosConfig.API_KEY,
        client_secret: axiosConfig.API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    throw new Error("Unable to authenticate with Amadeus API.");
  }
};

/**
 * Fetches flight destinations from Amadeus API.
 * Uses cache if available and valid.
 */
export const fetchFlights = async (
  token: string,
  origin: string,
  departureDate?: string
): Promise<FlightsResponse> => {
  const cacheKey = "flights";
  const cacheParams = { origin, departureDate };

  const cached = getCached<FlightsResponse>(
    cacheKey,
    axiosConfig.CACHE_TTL,
    cacheParams
  );
  if (cached) {
    return cached;
  }

  try {
    const response = await axios.get(
      `${axiosConfig.API_BASE_URL}${FLIGHT_DESTINATIONS_ENDPOINT}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          origin,
          ...(departureDate ? { departureDate } : {}),
        },
      }
    );

    setCached(cacheKey, cacheParams, response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch flights:", error);
    throw new Error("Unable to retrieve flight data.");
  }
};

export default {
  fetchToken,
  fetchFlights,
};
