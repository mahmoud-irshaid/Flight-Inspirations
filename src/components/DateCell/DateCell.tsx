import { memo } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DateCellProps } from "./DateCell.type";
import { styled } from "@mui/material/styles";

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-input": {
    padding: "0",
    border: "none",
    background: "transparent",
    color: "var(--color-text-primary)",
  },
  "& .MuiInputBase-root": {
    "&:before, &:after": {
      display: "none",
    },
    borderRadius: "6px",
    transition: "all 0.3s ease",
  },
});

export const DateCell = memo(({ value, onChange }: DateCellProps) => {
  return (
    <StyledDatePicker
      value={dayjs(value)}
      onChange={(newValue) => {
        if (newValue) {
          onChange(newValue.format("M/D/YYYY"));
        }
      }}
      slotProps={{
        textField: {
          variant: "standard",
          fullWidth: true,
        },
      }}
    />
  );
});
