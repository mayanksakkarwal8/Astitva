
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import TopRatedPlaces from "./pages/TopRatedPlaces";
import CulturalInsights from "./pages/CulturalInsights";
import Contributions from "./pages/Contributions";
import NotFound from "./pages/NotFound";
import RegionDetail from "./pages/RegionDetail";
import FilterResults from "./pages/FilterResults";
import Booking from "./pages/Booking";
import React from "react";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/top-rated" element={<TopRatedPlaces />} />
              <Route path="/insights" element={<CulturalInsights />} />
              <Route path="/contributions" element={<Contributions />} />
              <Route path="/region/:id" element={<RegionDetail />} />
              <Route path="/filter" element={<FilterResults />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
