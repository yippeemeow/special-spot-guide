import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import EventHeader from "@/components/EventHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import EventsList from "@/components/EventsList";
import RestaurantsList from "@/components/RestaurantsList";
import ServicesList from "@/components/ServicesList";
import ChildrenActivities from "@/components/ChildrenActivities";
import DiscoverAreas from "@/components/DiscoverAreas";
import BottomNav from "@/components/BottomNav";
import AccessibilityPanel from "@/components/AccessibilityPanel";

const Index = () => {
  const [category, setCategory] = useState("all");

  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <EventHeader />
          <SearchBar />
          <CategoryTabs onCategoryChange={setCategory} />

          {(category === "all" || category === "stage" || category === "booths") && (
            <EventsList />
          )}
          {(category === "all" || category === "restaurants") && (
            <RestaurantsList />
          )}
          {(category === "all" || category === "kids") && (
            <ChildrenActivities />
          )}
          {(category === "all" || category === "services") && (
            <ServicesList />
          )}

          {category === "all" && <DiscoverAreas />}
          <div className="pb-20" />
          <BottomNav />
          <AccessibilityPanel />
        </div>
      </LanguageProvider>
    </AccessibilityProvider>
  );
};

export default Index;
