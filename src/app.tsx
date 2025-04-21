import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages

// Admin Pages
import React from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes";

const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={Router} />
        {/* <BrowserRouter>
          <Routes>

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/noticias" element={<AdminNews />} />
            <Route path="/admin/eventos" element={<AdminEvents />} />
            <Route path="/admin/podcasts" element={<AdminPodcasts />} />
            <Route path="/admin/videos" element={<AdminVideos />} />
            <Route path="/admin/galeria" element={<AdminGallery />} />
            <Route path="/admin/depoimentos" element={<AdminTestimonials />} />
            <Route path="/admin/usuarios" element={<AdminUsers />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter> */}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
