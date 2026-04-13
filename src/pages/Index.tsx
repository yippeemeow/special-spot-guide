import EventHeader from "@/components/EventHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import VenueMap from "@/components/VenueMap";
import EventsList from "@/components/EventsList";
import DiscoverAreas from "@/components/DiscoverAreas";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-cairo">
      <EventHeader />
      <SearchBar />
      <CategoryTabs />
      <VenueMap />
      <EventsList />
      <DiscoverAreas />
      <BottomNav />
    </div>
  );
};

export default Index;
