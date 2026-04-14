import { useState } from "react";
import EventHeader from "@/components/EventHeader";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import EventsList from "@/components/EventsList";
import RestaurantsList from "@/components/RestaurantsList";
import ServicesList from "@/components/ServicesList";
import ChildrenActivities from "@/components/ChildrenActivities";
import BottomNav from "@/components/BottomNav";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [category, setCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      <SearchBar />
      <CategoryTabs onCategoryChange={setCategory} />

      {(category === "all" || category === "stage" || category === "booths") && (
        <EventsList filterCategory={category} />
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

      <div className="pb-20" />
      <BottomNav />
      <AccessibilityPanel />
      <ChatBot />
    </div>
  );
};

export default Index;
