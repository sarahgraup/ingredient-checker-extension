import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Popup from "popup/Popup";
import { BrowserRouter } from "react-router-dom";


const queryClient = new QueryClient();

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* <CssVarsProvider
            defaultColorScheme="light"
            defaultMode="light"
            theme={theme}
          > */}
            <CssBaseline enableColorScheme />
            <Popup />
          {/* </CssVarsProvider> */}
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
