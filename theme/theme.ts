// theme/theme.ts
"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // xanh chủ đạo
    },
    secondary: {
      main: "#9c27b0", // tím phụ
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // không viết HOA toàn bộ
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
  },
});

export default theme;
