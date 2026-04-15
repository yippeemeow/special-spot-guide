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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-24 rtl" dir="rtl">
      {/* رأس الصفحة الذي يحتوي على الشعار والتنبيهات */}
      <EventHeader />

      {/* شريط البحث المتقدم */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md pb-2">
        <SearchBar onSearch={setSearchQuery} />
        <CategoryTabs onCategoryChange={setCategory} />
      </div>

      <main className="px-1 animate-in fade-in duration-500">
        {/* قائمة الفعاليات والبوثات */}
        {(category === "all" || category === "stage" || category === "booths") && (
          <section className="mt-2">
            <EventsList filterCategory={category} searchQuery={searchQuery} />
          </section>
        )}

        {/* قائمة المطاعم */}
        {(category === "all" || category === "restaurants") && (
          <section className="mt-4">
            <RestaurantsList searchQuery={searchQuery} />
          </section>
        )}

        {/* فعاليات الأطفال */}
        {(category === "all" || category === "kids") && (
          <section className="mt-4">
            <ChildrenActivities searchQuery={searchQuery} />
          </section>
        )}

        {/* الخدمات العامة (مصلى، دورات مياه، إسعافات) */}
        {(category === "all" || category === "services") && (
          <section className="mt-4">
            <ServicesList searchQuery={searchQuery} />
          </section>
        )}
      </main>

      {/* شريط التنقل السفلي والمكونات العائمة */}
      <BottomNav />
      <AccessibilityPanel />
      <ChatBot />

      {/* مساحة إضافية للسكرول لضمان عدم غياب المحتوى خلف شريط التنقل */}
      <div className="h-10" />
    </div>
  );
};

export default Index;
