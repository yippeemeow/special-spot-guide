import { Home, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "map", label: t("map"), icon: MapPin, path: "/map" },
    { id: "home", label: t("home"), icon: Home, path: "/" },
  ];

  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] w-full bg-card border-t border-border/40">
      <div className="flex items-stretch justify-around py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === currentPath;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-8 py-1 min-w-[72px] transition-colors ${
                isActive ? "text-secondary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_6px_hsla(187,100%,42%,0.6)]" : ""}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
