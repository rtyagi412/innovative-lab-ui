import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "/src/styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  // {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  // </StrictMode>
);
