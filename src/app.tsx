import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthenticationProvider } from "./context/autenticacao";
import { TanstackQuery } from "./lib/tanstack/instance";
import { Router } from "./routes";

export function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={TanstackQuery}>
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
