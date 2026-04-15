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
    <div className="min-h-screen bg-background pb-24 rtl" dir="rtl">
      <EventHeader />

      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md pb-2">
        <SearchBar onSearch={setSearchQuery} />
        <CategoryTabs onCategoryChange={setCategory} />
      </div>

      <main className="px-1">
        {/* الفعاليات الجارية الآن - تظهر فقط في تبويب الكل */}
        {category === "all" && (
          <section className="mt-2">
            <CurrentlyLive />
          </section>
        )}

        {(category === "all" || category === "stage") && (
          <section className="mt-4">
            <EventsList searchQuery={searchQuery} />
          </section>
        )}

        {(category === "all" || category === "booths") && (
          <section className="mt-4">
            <BoothsList searchQuery={searchQuery} />
          </section>
        )}

        {(category === "all" || category === "kids") && (
          <section className="mt-4">
            <ChildrenActivities searchQuery={searchQuery} />
          </section>
        )}

        {(category === "all" || category === "restaurants") && (
          <section className="mt-4">
            <RestaurantsList searchQuery={searchQuery} />
          </section>
        )}

        {(category === "all" || category === "services") && (
          <section className="mt-4">
            <ServicesList searchQuery={searchQuery} />
          </section>
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
