// lib/theme/muiTheme.ts
import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: { main: '#0f62fe' },
    secondary: { main: '#7c3aed' },
    background: { default: '#f6f9fc' }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
    h1: { fontSize: '1.75rem', fontWeight: 700 },
    h2: { fontSize: '1.4rem', fontWeight: 700 }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12 }
      }
    }
  }
});
