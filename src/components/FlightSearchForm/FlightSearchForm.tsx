import { memo } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppSelector } from "../../store/hooks";
import { Search, Flight } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { FlightSearchFormProps, FormData } from "./FlightSearchForm.type";
import "./FlightSearchForm.style.css";

const FlightSearchForm = ({
  onSearch,
  searchParams,
}: FlightSearchFormProps) => {
  const loading = useAppSelector((state) => state.flights.loading);
  const error = useAppSelector((state) => state.flights.error);

  /**
   * Converts search params departure date to Dayjs object
   * @param dateParam - Date parameter from search params
   * @returns Dayjs object or null
   */
  const initializeDepartureDate = (dateParam?: string): Dayjs | null => {
    if (!dateParam) return null;
    return typeof dateParam === "string" ? dayjs(dateParam) : null;
  };

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(
    initializeDepartureDate(searchParams.departureDate)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      origin: searchParams.origin || "",
    },
    mode: "onChange",
  });

  /**
   * Validates origin city code format
   * @param value - Origin city code value
   * @returns True if valid, error message if invalid
   */
  const validateOriginCode = (value: string): string | true => {
    if (value.length !== 3) return "origin must be 3 characters";
    return true;
  };

  /**
   * Handles departure date change
   * @param newValue - New date value from DatePicker
   */
  const handleDateChange = (newValue: Dayjs | null): void => {
    setDepartureDate(newValue);
  };

  /**
   * Handles form submission and triggers search
   * @param values - Form values
   */
  const onSubmit = async (values: FormData): Promise<void> => {
    onSearch({
      origin: values.origin,
      departureDate: departureDate
        ? departureDate.format("YYYY-MM-DD")
        : undefined,
    });
  };

  // Keep form in sync with searchParams
  useEffect(() => {
    setValue("origin", searchParams.origin || "");
    setDepartureDate(initializeDepartureDate(searchParams.departureDate));
  }, [searchParams, setValue]);

  return (
    <Container maxWidth="lg" className="flightsearch-container">
      <Box className="flightsearch-header-box">
        <Flight className="flightsearch-header-icon" sx={{ fontSize: 32 }} />
        <Typography
          variant="h4"
          component="h1"
          className="gradient-text flightsearch-title"
        >
          Find Your Perfect Flight
        </Typography>
      </Box>

      <Typography variant="body1" className="flightsearch-description">
        Discover amazing flight deals and explore new destinations with our
        smart search engine
      </Typography>

      <Paper elevation={0} className="form-container flightsearch-form-paper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="flightsearch-form-fields">
            <TextField
              fullWidth
              id="origin"
              label="Origin City Code"
              {...register("origin", {
                required: "Origin city code is required",
                validate: validateOriginCode,
              })}
              error={!!errors.origin}
              helperText={errors.origin?.message || ""}
              placeholder="e.g., MAD"
              className="flightsearch-input"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Departure Date"
                value={departureDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    className: "flightsearch-input",
                  },
                }}
              />
            </LocalizationProvider>

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={<Search sx={{ fontSize: 24 }} />}
              className="flightsearch-submit-btn"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Box>
        </form>

        {error && (
          <Box className="error-container flightsearch-error-box">
            <Typography variant="body2" color="error.dark" fontWeight={600}>
              {error}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default memo(FlightSearchForm);
