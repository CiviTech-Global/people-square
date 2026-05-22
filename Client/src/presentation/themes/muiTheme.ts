import { createTheme } from "@mui/material/styles";
import { palette } from "./colors";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: palette.oceanBlue,
      dark: palette.oceanBlueDark,
      light: palette.oceanBlueLight,
      contrastText: "#ffffff",
    },
    secondary: {
      main: palette.skyBlue,
      light: palette.skyBlueLight,
      contrastText: "#ffffff",
    },
    error: {
      main: palette.error,
    },
    warning: {
      main: palette.warning,
    },
    success: {
      main: palette.mint,
    },
    info: {
      main: palette.skyBlue,
    },
    background: {
      default: palette.offWhite,
      paper: palette.white,
    },
    text: {
      primary: palette.gray900,
      secondary: palette.gray500,
    },
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    button: {
      textTransform: "none" as const,
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
          borderRadius: 50,
          padding: "10px 24px",
          fontSize: "0.875rem",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: `0 4px 15px rgba(10, 94, 176, 0.2)`,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${palette.oceanBlue} 0%, ${palette.skyBlue} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${palette.oceanBlueDark} 0%, ${palette.oceanBlueLight} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(10, 94, 176, 0.12)",
          boxShadow: "0 10px 40px rgba(10, 94, 176, 0.08)",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            borderRadius: 12,
            "& fieldset": {
              borderColor: "rgba(10, 94, 176, 0.12)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(10, 94, 176, 0.25)",
            },
            "&.Mui-focused fieldset": {
              borderColor: palette.oceanBlue,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});
