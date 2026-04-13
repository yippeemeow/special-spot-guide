import { Home, Calendar, MapPin, Utensils, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "settings", label: t("settings"), icon: Settings, path: "/" },
    { id: "map", label: t("map"), icon: MapPin, path: "/map" },
    { id: "events", label: t("events"), icon: Calendar, path: "/" },
    { id: "home", label: t("home"), icon: Home, path: "/" },
  ];

  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-secondary/15 bg-card/95 backdrop-blur-xl">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === currentPath;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-secondary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_6px_hsla(187,100%,42%,0.6)]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
