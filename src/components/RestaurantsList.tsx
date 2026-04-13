import { Navigation, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    nameKey: "alBaik",
    descKey: "alBaikDesc",
    emoji: "🍗",
    distance: "80م",
    rating: 4.8,
  },
  {
    id: 2,
    nameKey: "kudu",
    descKey: "kuduDesc",
    emoji: "🍔",
    distance: "95م",
    rating: 4.5,
  },
  {
    id: 3,
    nameKey: "shawarmer",
    descKey: "shawarmerDesc",
    emoji: "🌯",
    distance: "110م",
    rating: 4.3,
  },
  {
    id: 4,
    nameKey: "maestro",
    descKey: "maestroDesc",
    emoji: "🍕",
    distance: "70م",
    rating: 4.2,
  },
];

const RestaurantsList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <button
              onClick={() => handleNavigate(r.nameKey)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Navigation className="h-4 w-4" />
            </button>

            <div className="flex flex-1 flex-col items-end">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-event-soon">{r.rating}</span>
                  <Star className="h-3 w-3 fill-event-soon text-event-soon" />
                </div>
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="text-sm font-bold text-foreground">{t(r.nameKey)}</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t(r.descKey)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-semibold">{t("open")}</span>
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
