import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index.tsx";
import MapPage from "./pages/MapPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Mobile frame: constrains entire app to a phone-width column */}
            <div className="min-h-screen w-full flex justify-center bg-background">
              <div
                id="mobile-frame"
                className="relative w-full max-w-[430px] min-h-screen bg-background shadow-2xl overflow-hidden"
              >
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
