import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import EventHeader from "@/components/EventHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import VenueMap from "@/components/VenueMap";
import PlacesToVisit from "@/components/PlacesToVisit";
import EventsList from "@/components/EventsList";
import DiscoverAreas from "@/components/DiscoverAreas";
import BottomNav from "@/components/BottomNav";
import AccessibilityPanel from "@/components/AccessibilityPanel";

const Index = () => {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <EventHeader />
          <SearchBar />
          <CategoryTabs />
          <PlacesToVisit />
          <VenueMap />
          <EventsList />
          <DiscoverAreas />
          <BottomNav />
          <AccessibilityPanel />
        </div>
      </LanguageProvider>
    </AccessibilityProvider>
  );
};

export default Index;
