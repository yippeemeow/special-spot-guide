import { useState } from "react";
import { Home, Calendar, MapPin, Utensils, Settings } from "lucide-react";

const navItems = [
  { id: "settings", label: "الإعدادات", icon: Settings },
  { id: "food", label: "المطاعم", icon: Utensils },
  { id: "map", label: "الخريطة", icon: MapPin },
  { id: "events", label: "الفعاليات", icon: Calendar },
  { id: "home", label: "الرئيسية", icon: Home },
];

const BottomNav = () => {
  const [active, setActive] = useState("home");

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
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
