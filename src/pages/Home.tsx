import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useTableData } from "../hooks/useTableData";
import FlightSearchForm from "../components/FlightSearchForm/FlightSearchForm";
import FlightTable from "../components/FlightTable/FlightTable";
import Loading from "../components/Loading/Loading";

const Home = () => {
  const [searchParams, setSearchParams] = useState<{
    origin: string;
    departureDate?: string;
  }>({ origin: "MAD" });

  const { data, editedCells, updateCell, saveChanges, debouncedFilter } =
    useTableData(searchParams);

  const loading = useAppSelector((state) => state.flights.loading);
  const error = useAppSelector((state) => state.flights.error);

  /**
   * Updates search parameters from the form submission
   * @param params - Search parameters containing origin and optional departure date
   */
  const handleSearch = (params: { origin: string; departureDate?: string }) => {
    setSearchParams(params);
  };

  return (
    <>
      <FlightSearchForm onSearch={handleSearch} searchParams={searchParams} />
      <div style={{ minHeight: loading ? "300px" : "400px" }}>
        {loading ? (
          <Loading />
        ) : !error ? (
          <div>
            <FlightTable
              data={data}
              editedCells={editedCells}
              updateCell={updateCell}
              saveChanges={saveChanges}
              debouncedFilter={debouncedFilter}
              searchParams={searchParams}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
