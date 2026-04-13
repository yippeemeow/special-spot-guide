import { useState } from "react";
import { Home, Calendar, MapPin, Utensils, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BottomNav = () => {
  const [active, setActive] = useState("home");
  const { t } = useLanguage();

  const navItems = [
    { id: "settings", label: t("settings"), icon: Settings },
    { id: "food", label: t("restaurants"), icon: Utensils },
    { id: "map", label: t("map"), icon: MapPin },
    { id: "events", label: t("events"), icon: Calendar },
    { id: "home", label: t("home"), icon: Home },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
