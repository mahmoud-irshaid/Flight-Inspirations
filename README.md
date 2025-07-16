# Flight Inspirations Admin Dashboard

<div align="center">
  <img src="public/flight-inspirations-logo.svg" alt="Flight Inspirations Logo" width="1000" height="200">
</div>

## Live Demo

[Flight Inspirations App Demo](https://flight-inspirations-zeta.vercel.app/)


## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Media & Demos](#media--demos)
- [Known Issues & Limitations](#known-issues--limitations)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Flight Inspirations Admin Dashboard** is a React-based web application for searching, viewing, and editing flight inspiration data. It demonstrates frontend integration, API usage, UI/UX best practices, and advanced table features. The app is built with TypeScript, Redux Toolkit, Material UI, and modern React patterns.

**Purpose:**

- Provide a user-friendly interface for searching flight destinations using the Amadeus API.
- Allow inline editing, filtering, and management of flight data in a responsive, interactive table.

**Tech Stack:**

- React 18, TypeScript
- Redux Toolkit for state management
- Material UI (MUI) for UI components and theming
- Day.js for date handling
- react-hook-form for form management
- @hello-pangea/dnd for drag-and-drop
- Cypress & Jest for testing

---

## Architecture

The application is structured as a modular React SPA with the following main layers:

- **App Shell:**
  - `App.tsx` sets up providers (Redux, Theme, Localization, ErrorBoundary) and global layout.
- **Pages:**
  - `Home.tsx` is the main page, orchestrating search, table, and loading/error states.
- **Components:**
  - `Header`: Top navigation and branding.
  - `FlightSearchForm`: Search form for origin and departure date.
  - `FlightTable`: Editable, filterable, paginated table with drag-and-drop columns.
  - `TableFooter`: Pagination controls and save button.
  - `DateCell`: Custom date picker cell for table editing.
  - `Loading`: Animated loading indicator.
  - `ErrorBoundary`: Catches and displays UI errors.
  - `StyledComponents`: Custom styled wrappers for table and UI elements.
- **State Management:**
  - Redux slice (`flightsSlice.ts`) manages flight data, loading, error, and currency.
  - Custom hooks (`useTableData.ts`) handle table state, caching, and editing logic.
- **API & Utilities:**
  - `flightsApi.ts` handles Amadeus API requests.
  - `cacheUtils.ts` provides client-side caching.
  - `tableUtils.ts` provides table formatting and helpers.
- **Styling:**
  - MUI theme (`theme/index.tsx`), global CSS, and CSS modules for component styles.

---

## Features

- **Flight Search:**
  - Search by origin city code and optional departure date.
  - Uses Amadeus Flight Inspiration Search API.
- **Editable Table:**
  - Inline cell editing for all fields.
  - Date picker for date fields.
  - Save button to persist changes to cache.
- **Filtering & Sorting:**
  - Column-level filtering with instant feedback.
- **Client-side Caching:**
  - Results are cached locally for performance and offline access.
- **Pagination:**
  - Client-side pagination with customizable rows per page.
- **Drag-and-Drop Columns:**
  - Reorder table columns via drag-and-drop.
- **Responsive Design:**
  - Fully responsive for desktop and mobile.
- **Error Handling:**
  - Graceful error boundaries and user-friendly error messages.
- **Loading States:**
  - Animated loading spinner during API calls.

---

## Running Locally

### Prerequisites

- Node.js (v14.0.0 or later)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/mahmoud-irshaid/Flight-Inspirations.git
cd Flight-Inspirations
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open your browser and navigate to http://localhost:3000

---

## Testing

- **Unit & Integration Tests:**
  - Run with:
    ```bash
    npm test
    ```
  - Tests cover hooks, utilities, and core components.
- **End-to-End (E2E) Tests:**
  - Cypress tests are located in `cypress/e2e/`.
  - Run with:
    ```bash
    npx cypress open
    ```

---

## Known Issues & Limitations

- The Amadeus `/search` endpoint returns 404 for most cities except MAD (Madrid). This is a backend/API limitation, not a frontend bug.
- Some features (multi-city search, advanced filtering) may depend on API improvements.
- The app uses client-side caching; changes are not persisted to a backend.
