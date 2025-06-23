import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./app/App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "./app/provider/MainProvider";
import { Notification } from "@app/layouts/Notification";
import { CountdownProvider } from "@app/provider/CountdownProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CountdownProvider>
          <Notification>
            <MainProvider>
              <App />
            </MainProvider>
          </Notification>
        </CountdownProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
