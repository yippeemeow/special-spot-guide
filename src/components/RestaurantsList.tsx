import { Navigation, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const restaurants = [
  { id: 1, nameKey: "alBaik", descKey: "alBaikDesc", emoji: "🍗", distance: "80م" },
  { id: 2, nameKey: "kudu", descKey: "kuduDesc", emoji: "🍔", distance: "95م" },
  { id: 3, nameKey: "shawarmer", descKey: "shawarmerDesc", emoji: "🌯", distance: "110م" },
  { id: 4, nameKey: "maestro", descKey: "maestroDesc", emoji: "🍕", distance: "70م" },
];

const RestaurantsList = ({ searchQuery }: { searchQuery?: string }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const q = (searchQuery || "").toLowerCase();
  const filtered = restaurants.filter((r) => !q || t(r.nameKey).toLowerCase().includes(q) || t(r.descKey).toLowerCase().includes(q));

  const handleNavigate = (name: string) => {
    navigate("/map", { state: { target: "restaurantArea", highlight: name } });
  };

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-3 text-lg font-bold text-foreground text-end">{t("restaurants")}</h2>
      <div className="space-y-3">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:glow-primary"
          >
            <button
              onClick={() => handleNavigate(r.nameKey)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-foreground"
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
                <span className="text-[10px] rounded-full bg-primary/15 text-primary px-2 py-0.5 font-semibold">{t("open")}</span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{r.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
