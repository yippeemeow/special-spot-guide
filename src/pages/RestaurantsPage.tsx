import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Navigation, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ChatBot from "@/components/ChatBot";

const restaurants = [
  { id: 1, nameKey: "alBaik", descKey: "alBaikDesc", emoji: "🍗", distance: "80م" },
  { id: 2, nameKey: "kudu", descKey: "kuduDesc", emoji: "🍔", distance: "95م" },
  { id: 3, nameKey: "shawarmer", descKey: "shawarmerDesc", emoji: "🌯", distance: "110م" },
  { id: 4, nameKey: "maestro", descKey: "maestroDesc", emoji: "🍕", distance: "70م" },
];

const RestaurantsContent = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const handleNavigate = (name: string) => {
    navigate("/map", { state: { target: "restaurantArea", highlight: name } });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="flex items-center justify-between px-5 pt-10 pb-4" style={{ background: "var(--gradient-header)" }}>
        <div />
        <h1 className="text-lg font-bold text-primary-foreground text-glow">{t("restaurants")}</h1>
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-primary-foreground">
          <BackArrow className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 px-5 space-y-3">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-2xl border border-secondary/15 bg-card p-4 shadow-sm transition-all hover:border-secondary/30"
          >
            <button
              onClick={() => handleNavigate(r.nameKey)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-secondary-foreground"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Navigation className="h-4 w-4" />
            </button>

            <div className="flex flex-1 flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="text-sm font-bold text-foreground">{t(r.nameKey)}</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t(r.descKey)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] rounded-full bg-secondary/15 text-secondary px-2 py-0.5 font-semibold">{t("open")}</span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{r.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
      <ChatBot />
    </div>
  );
};

const RestaurantsPage = () => (
  <AccessibilityProvider>
    <LanguageProvider>
      <RestaurantsContent />
    </LanguageProvider>
  </AccessibilityProvider>
);

export default RestaurantsPage;
