// lib/theme/ThemeRegistry.tsx
'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme } from './muiTheme';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const jss = document.getElementById('jss-server-side');
    if (jss && jss.parentElement) jss.parentElement.removeChild(jss);
  }, []);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
