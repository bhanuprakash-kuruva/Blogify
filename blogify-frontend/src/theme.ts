import { createTheme } from "@mui/material/styles";

// Shared typography for both themes
const typography = {
  fontFamily: "'Merriweather', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  h1: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.3 },
  h2: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.35 },
  h3: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.4 },
  h5: { fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.4 },
  h6: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.4 },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.75,
    fontFamily: "'Roboto', sans-serif",
  },
  body2: { fontSize: "0.9rem", lineHeight: 1.6 },
  subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
  subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 },
  caption: { fontSize: "0.8rem", lineHeight: 1.4 },
  button: { textTransform: "none", fontWeight: 600 },
};

// Shared shape + component overrides
const shape = { borderRadius: 8 };
const components = {
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 6, padding: "8px 20px" },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      },
    },
  },
};

// LIGHT THEME
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565c0",
      light: "#5e92f3",
      dark: "#003c8f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#555555",
      disabled: "#9e9e9e",
    },
    divider: "#e0e0e0",
  },
  typography,
  shape,
  components: {
    ...components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          ...components.MuiAppBar.styleOverrides.root,
          backgroundColor: "#ffffff",
          color: "#212121",
        },
      },
    },
  },
});

// DARK THEME
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // softer blue for dark mode
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ffb74d",
      light: "#ffe97d",
      dark: "#f57c00",
      contrastText: "#000000",
    },
    background: {
      default: "#121212", // dark background
      paper: "#1e1e1e", // article/card contrast
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
      disabled: "#777777",
    },
    divider: "#333333",
  },
  typography,
  shape,
  components: {
    ...components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          ...components.MuiAppBar.styleOverrides.root,
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...components.MuiCard.styleOverrides.root,
          boxShadow: "0 2px 12px rgba(0,0,0,0.6)", // stronger shadow
        },
      },
    },
  },
});
