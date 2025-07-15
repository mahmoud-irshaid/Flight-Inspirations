import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";

import { store } from "./store";
import theme from "./theme";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import "./styles/global.css";

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container className="app-container" maxWidth="lg">
              <Home />
            </Container>
          </ThemeProvider>
        </LocalizationProvider>
      </ErrorBoundary>
    </Provider>
  );
}
