import { extractCellDisplayValue } from "./tableUtils";

describe("getDisplayValue", () => {
  it("returns the correct value for a string column", () => {
    const row = {
      origin: "MAD",
      destination: "NYC",
      price: { total: "500" },
      departureDate: "2025-08-01",
      returnDate: "2025-08-10",
      originalIndex: 0,
    };
    expect(extractCellDisplayValue(row, "origin")).toBe("MAD");
  });
  it("returns the correct value for a price column", () => {
    const row = {
      origin: "MAD",
      destination: "NYC",
      price: { total: "500" },
      departureDate: "2025-08-01",
      returnDate: "2025-08-10",
      originalIndex: 0,
    };
    expect(extractCellDisplayValue(row, "price")).toBe("500");
  });
});
