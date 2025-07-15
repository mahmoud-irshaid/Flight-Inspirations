import { CACHE_TTL } from "../constants";

const REQUIRED_ENV_VARS = ["REACT_APP_API_KEY", "REACT_APP_API_SECRET"];

REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Environment variable ${key} is not set.`);
  }
});

const axiosConfig = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ?? "",
  API_KEY: process.env.REACT_APP_API_KEY ?? "",
  API_SECRET: process.env.REACT_APP_API_SECRET ?? "",
  CACHE_TTL: CACHE_TTL,
};

export default axiosConfig;
