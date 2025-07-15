// E2E tests for Flight Inspirations app

describe("Flight Inspirations App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the header", () => {
    cy.contains("Flight Inspirations").should("be.visible");
    cy.contains("Discover • Explore • Fly").should("be.visible");
  });

  describe("Flight Search Form", () => {
    it("validates origin input", () => {
      cy.get("input#origin").clear().blur();
      cy.contains("Origin city code is required").should("be.visible");
      cy.get("input#origin").type("MA").blur();
      cy.contains("origin must be 3 characters").should("be.visible");
      cy.get("input#origin").clear().type("MAD").blur();
      cy.contains("origin must be 3 characters").should("not.exist");
    });

    it("submits search and shows loading", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: {
          currency: "EUR",
        },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.contains("Searching for flights...").should("be.visible");
      cy.wait("@getFlights");
      cy.contains("Flight Results").should("be.visible");
    });

    it("shows error on API failure", () => {
      cy.intercept("GET", "**/flight-destinations*", { statusCode: 500 }).as(
        "getFlightsFail"
      );
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlightsFail");
      cy.contains("Failed to search flights").should("be.visible");
    });
  });

  describe("Flight Table", () => {
    beforeEach(() => {
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
    });

    it("renders table with results", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: { currency: "EUR" },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlights");
      cy.get(".table-title").should("contain", "Flight Results");
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length.greaterThan", 0);
    });

    it("can reorder columns", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: { currency: "EUR" },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlights");
      cy.get("th").eq(0).trigger("mousedown", { which: 1 });
      cy.get("th")
        .eq(1)
        .trigger("mousemove")
        .trigger("mouseup", { force: true });
    });

    it("can edit a cell and save changes", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: { currency: "EUR" },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlights");
      cy.get("tbody tr")
        .first()
        .find("input")
        .first()
        .clear()
        .type("Test City");
      cy.contains("unsaved changes").should("be.visible");
      cy.contains("Save Changes").should("not.be.disabled").click();
      cy.contains("unsaved changes").should("not.exist");
    });

    it("cannot save with empty cells", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: { currency: "EUR" },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlights");
      cy.get("tbody tr").first().find("input").first().clear();
      cy.contains("Fill All Cells").should("be.disabled");
      cy.contains("Please fill all empty cells before saving").should(
        "be.visible"
      );
    });

    it("pagination works", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
          {
            departureDate: "2024-07-02",
            destination: "LON",
            origin: "MAD",
            price: { total: "120" },
            returnDate: "2024-07-11",
          },
          {
            departureDate: "2024-07-03",
            destination: "PAR",
            origin: "MAD",
            price: { total: "130" },
            returnDate: "2024-07-12",
          },
          {
            departureDate: "2024-07-04",
            destination: "ROM",
            origin: "MAD",
            price: { total: "140" },
            returnDate: "2024-07-13",
          },
          {
            departureDate: "2024-07-05",
            destination: "AMS",
            origin: "MAD",
            price: { total: "150" },
            returnDate: "2024-07-14",
          },
          {
            departureDate: "2024-07-06",
            destination: "BER",
            origin: "MAD",
            price: { total: "160" },
            returnDate: "2024-07-15",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
            LON: { detailedName: "London" },
            PAR: { detailedName: "Paris" },
            ROM: { detailedName: "Rome" },
            AMS: { detailedName: "Amsterdam" },
            BER: { detailedName: "Berlin" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: { currency: "EUR" },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlights");
      cy.get(".MuiTablePagination-root").should("be.visible");
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get("tbody tr").should("exist");
    });
    it("can filter/search by column", () => {
      cy.intercept("GET", "**/flight-destinations*", {
        data: [
          {
            departureDate: "2024-07-01",
            destination: "BCN",
            origin: "MAD",
            price: { total: "100" },
            returnDate: "2024-07-10",
          },
        ],
        dictionaries: {
          locations: {
            MAD: { detailedName: "Madrid" },
            BCN: { detailedName: "Barcelona" },
          },
          currencies: {
            EUR: "Euro",
          },
        },
        meta: { currency: "EUR" },
      }).as("getFlights");
      cy.get("input#origin").clear().type("MAD");
      cy.get("form").submit();
      cy.wait("@getFlights");
      cy.get('input[placeholder^="Search"]').first().type("MAD");
      cy.wait(1000); // Wait for debounce/filter to apply
      cy.get("tbody tr").should("have.length.greaterThan", 0);
      cy.get("tbody tr").each(($row) => {
        cy.log($row.text());
        cy.wrap($row)
          .find("td")
          .find("input")
          .first()
          .should("contain.value", "MAD");
      });
    });
  });

  it("shows no results state", () => {
    cy.intercept("GET", "**/flight-destinations*", {
      data: [],
      dictionaries: { locations: {}, currencies: {} },
      meta: { currency: "EUR" },
    }).as("getNoFlights");
    cy.get("input#origin").clear().type("MAD");
    cy.get("form").submit();
    cy.wait("@getNoFlights");
    cy.contains("No flights found").should("be.visible");
  });

  it("shows global error boundary on React error", () => {
    // Simulate error boundary (requires a way to trigger an error in the app)
  });
});
