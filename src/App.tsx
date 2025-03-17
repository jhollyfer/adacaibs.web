
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import Videos from "./pages/Videos";
import VideoDetails from "./pages/VideoDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminNews from "./pages/admin/News";
import AdminEvents from "./pages/admin/Events";
import AdminPodcasts from "./pages/admin/Podcasts";
import AdminVideos from "./pages/admin/Videos";
import AdminGallery from "./pages/admin/Gallery";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminUsers from "./pages/admin/Users";

const queryClient = new QueryClient();

const App = () => (
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

export default App;
