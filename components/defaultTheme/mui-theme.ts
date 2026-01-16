"use client";

import { createTheme } from "@mui/material/styles";

export const lightMuiTheme = createTheme({
  palette: {
    mode: "light",
  },

  typography: {
    fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    allVariants: {
      fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: "#E8E8E8",
          fontWeight: 600,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif", // 👈 ใส่ตรงนี้แทน
          "&:hover": {
            backgroundColor: "transparent",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #E8E8E8 inset",
            WebkitTextFillColor: "#2c2f33",
          },
        },
        input: {
          fontWeight: 600,
          padding: "14px 12px",
          fontSize: 14,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,

          fontWeight: 600,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
          color: "#2c2f33",
          "&.Mui-focused": {
            color: "#2c2f33",
          },
          transform: "translate(12px, 14px) scale(1)",
        },
        shrink: {
          fontWeight: 600,
          color: "#2c2f33",
          transform: "translate(12px, -20px) scale(0.85)",
        },
      },
    },
  },
});

export const darkMuiTheme = createTheme({
  palette: { mode: "dark" },

  typography: {
    fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
    allVariants: {
      fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: "#2c2f33",
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif", // 👈 ใส่ตรงนี้แทน
          "&:hover": {
            backgroundColor: "#2c2f33",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #2c2f33 inset",
            WebkitTextFillColor: "#fff",
          },
        },
        input: {
          padding: "14px 12px",
          fontSize: 14,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
          color: "#fff",
          "&.Mui-focused": {
            color: "#fff",
          },
          transform: "translate(12px, 14px) scale(1)",
        },
        shrink: {
          color: "#fff",
          transform: "translate(12px, -20px) scale(0.85)",
        },
      },
    },
  },
});
