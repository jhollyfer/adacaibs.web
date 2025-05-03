import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages

// Admin Pages
import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthenticationProvider } from "./context/autenticacao";
import { Router } from "./routes";

const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthenticationProvider>
          <RouterProvider router={Router} />
        </AuthenticationProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
