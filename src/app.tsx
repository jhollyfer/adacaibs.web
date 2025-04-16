import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import NotFound from "./pages/NotFound";
import PodcastDetails from "./pages/PodcastDetails";
import Podcasts from "./pages/Podcasts";
import VideoDetails from "./pages/VideoDetails";
import Videos from "./pages/Videos";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminGallery from "./pages/admin/Gallery";
import AdminNews from "./pages/admin/News";
import AdminPodcasts from "./pages/admin/Podcasts";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminUsers from "./pages/admin/Users";
import AdminVideos from "./pages/admin/Videos";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/noticias/:id" element={<NewsDetails />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/eventos/:id" element={<EventDetails />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcasts/:id" element={<PodcastDetails />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:id" element={<VideoDetails />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/contato" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/noticias" element={<AdminNews />} />
            <Route path="/admin/eventos" element={<AdminEvents />} />
            <Route path="/admin/podcasts" element={<AdminPodcasts />} />
            <Route path="/admin/videos" element={<AdminVideos />} />
            <Route path="/admin/galeria" element={<AdminGallery />} />
            <Route path="/admin/depoimentos" element={<AdminTestimonials />} />
            <Route path="/admin/usuarios" element={<AdminUsers />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
