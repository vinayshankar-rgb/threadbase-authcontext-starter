import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";
import "./index.css";
// TODO (task): import { AuthProvider } from "./auth/AuthContext.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      {/* TODO (task): wrap <App /> in <AuthProvider> so the whole tree can call useAuth() */}
      <App />
     </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
