import { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { useTableData } from "./useTableData";

describe("useTableData", () => {
  it("should initialize with default state", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const searchParams = { origin: "MAD" };
    const { result } = renderHook(() => useTableData(searchParams), {
      wrapper,
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.editedCells).toBeDefined();
    expect(result.current.updateCell).toBeInstanceOf(Function);
    expect(result.current.saveChanges).toBeInstanceOf(Function);
    expect(result.current.debouncedFilter).toBeInstanceOf(Function);
  });
});
