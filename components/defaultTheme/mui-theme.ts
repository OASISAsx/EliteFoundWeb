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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#E8E8E8",
          borderRadius: 10,
          fontWeightMedium: 600,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
          color: "#2c2f33",
        },
        // notchedOutline: {
        //   borderColor: "#6c6cff",
        // },
        input: {
          padding: "14px 12px",
          fontWeightMedium: 600,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#2c2f33",
          fontWeightMedium: 600,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: "#fff",
    //       "&.Mui-focused": { color: "#6c6cff" },
    //     },
    //     shrink: {
    //       color: "#6c6cff",
    //     },
    //   },
    // },

    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       color: "#fff",
    //     },
    //   },
    // },
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
          border: "1.5px solid rgba(0,0,0,0.12)",
          fontWeight: 600,

          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif", // 👈 ใส่ตรงนี้แทน
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #E8E8E8 inset",
            WebkitTextFillColor: "#2c2f33",
          },
          "&:before, &:after": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
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
    /* ================= PICKERS ================= */
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c2f33",
          borderRadius: 10,
          color: "#fff",
        },
        // notchedOutline: {
        //   borderColor: "#6c6cff",
        // },
        input: {
          padding: "14px 12px",
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: "#fff",
    //       "&.Mui-focused": { color: "#6c6cff" },
    //     },
    //     shrink: {
    //       color: "#6c6cff",
    //     },
    //   },
    // },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    /* ================= BASELINE ================= */
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    /* ================= FILLED INPUT ================= */
    MuiFilledInput: {
      styleOverrides: {
        root: {
          marginBottom: 20,
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.12)",
          backgroundColor: "#2c2f33",
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
          "&:hover": {
            backgroundColor: "#2c2f33",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #2c2f33 inset",
            WebkitTextFillColor: "#fff",
          },
          "&:before, &:after": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
        },
        input: {
          padding: "14px 12px",
          fontSize: 14,
          fontFamily: "Anuphan, Roboto, Helvetica, Arial, sans-serif",
        },
      },
    },

    /* ================= LABEL ================= */
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
          // color: "#6c6cff",
          transform: "translate(12px, -20px) scale(0.85)",
        },
      },
    },

    /* ================= ICON ================= */
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       color: "#6c6cff",
    //     },
    //   },
    // },
  },
});
