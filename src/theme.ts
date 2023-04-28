import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    spacing: number;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    spacing?: number;
  }
}

const theme = createTheme({
  spacing: 8,
});

export default theme;
