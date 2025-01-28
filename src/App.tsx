import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Popup from 'popup/Popup';
import { BrowserRouter } from 'react-router-dom';
import { themeOptions } from 'utils/themeOptions';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import 'styles.css';


const queryClient = new QueryClient();

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const theme = createTheme(themeOptions);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* <CssVarsProvider
            defaultColorScheme="light"
            defaultMode="light"
            theme={theme}
          > */}
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Popup />
            {/* </CssVarsProvider> */}
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
