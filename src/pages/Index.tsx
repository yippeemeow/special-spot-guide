import { LanguageProvider } from "@/contexts/LanguageContext";
import EventHeader from "@/components/EventHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import VenueMap from "@/components/VenueMap";
import PlacesToVisit from "@/components/PlacesToVisit";
import EventsList from "@/components/EventsList";
import DiscoverAreas from "@/components/DiscoverAreas";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
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
      </div>
    </LanguageProvider>
  );
};

export default Index;
