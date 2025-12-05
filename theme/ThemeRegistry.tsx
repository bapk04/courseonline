"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = createCache({ key: "mui", prepend: true });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
