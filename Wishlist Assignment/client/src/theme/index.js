import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// ThemeProvider Wrapper
const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global reset styles */}
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
