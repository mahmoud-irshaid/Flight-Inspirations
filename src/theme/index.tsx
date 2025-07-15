import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6b73ff",
      light: "#9c9eff",
      dark: "#4a52cc",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff6b9d",
      light: "#ffb3d1",
      dark: "#cc4a7a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    },
    success: {
      main: "#68d391",
      light: "#9ae6b4",
      dark: "#38a169",
    },
    warning: {
      main: "#f6ad55",
      light: "#fbd38d",
      dark: "#dd6b20",
    },
    error: {
      main: "#fc8181",
      light: "#feb2b2",
      dark: "#e53e3e",
    },
    info: {
      main: "#63b3ed",
      light: "#90cdf4",
      dark: "#3182ce",
    },
    grey: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
  },
  typography: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      color: "#2d3748",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
      color: "#2d3748",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: "#2d3748",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: "#2d3748",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#2d3748",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#718096",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(107, 115, 255, 0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(107, 115, 255, 0.25)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 20px rgba(107, 115, 255, 0.15)",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
