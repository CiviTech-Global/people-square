import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";
import { muiTheme } from "./presentation/themes";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(10, 94, 176, 0.12)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(10, 94, 176, 0.12)",
              color: "#111827",
              fontFamily: "'DM Sans', sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#2DD4A0",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#E63946",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
