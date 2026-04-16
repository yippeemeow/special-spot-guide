import { useState } from "react";
import EventHeader from "@/components/EventHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import CurrentlyLive from "@/components/CurrentlyLive";
import EventsList from "@/components/EventsList";
import RestaurantsList from "@/components/RestaurantsList";
import ServicesList from "@/components/ServicesList";
import ChildrenActivities from "@/components/ChildrenActivities";
import BoothsList from "@/components/BoothsList";
import BottomNav from "@/components/BottomNav";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative h-full md:h-[812px] min-h-screen md:min-h-0 bg-background pb-24 rtl overflow-y-auto" dir="rtl">
      <EventHeader />

      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md pb-1">
        <SearchBar onSearch={setSearchQuery} />
        <CategoryTabs onCategoryChange={setCategory} />
      </div>

      <main>
        {category === "all" && (
          <CurrentlyLive />
        )}

        {(category === "all" || category === "stage") && (
          <EventsList searchQuery={searchQuery} />
        )}

        {(category === "all" || category === "booths") && (
          <BoothsList searchQuery={searchQuery} />
        )}

        {(category === "all" || category === "kids") && (
          <ChildrenActivities searchQuery={searchQuery} />
        )}

        {(category === "all" || category === "restaurants") && (
          <RestaurantsList searchQuery={searchQuery} />
        )}

        {(category === "all" || category === "services") && (
          <ServicesList searchQuery={searchQuery} />
        )}
      </main>

      <BottomNav />
      <AccessibilityPanel />
      <ChatBot />
      <div className="h-10" />
    </div>
  );
};

export default Index;
