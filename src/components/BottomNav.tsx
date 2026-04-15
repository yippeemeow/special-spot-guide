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
    <div className="fixed bottom-0 z-50 w-full max-w-[430px] left-1/2 -translate-x-1/2">
      <div className="mx-3 mb-[env(safe-area-inset-bottom)] mb-2 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-lg">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === currentPath;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-8 py-1.5 rounded-xl transition-colors min-w-[72px] ${
                  isActive ? "text-secondary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_6px_hsla(187,100%,42%,0.6)]" : ""}`} />
                <span className="text-[11px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
