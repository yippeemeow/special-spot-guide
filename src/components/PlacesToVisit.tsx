import { MapPin, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const places = [
  { id: 1, nameKey: "mainStage", icon: "🎤", distance: "50م" },
  { id: 2, nameKey: "childrenArea", icon: "👶", distance: "120م" },
  { id: 3, nameKey: "restaurantArea", icon: "🍽️", distance: "80م" },
  { id: 4, nameKey: "digitalSolutions", icon: "💻", distance: "30م" },
  { id: 5, nameKey: "dataSecurity", icon: "🔒", distance: "45م" },
  { id: 6, nameKey: "innovationUX", icon: "🎨", distance: "60م" },
];

const PlacesToVisit = () => {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="mt-6 px-5">
      <div className="flex items-center justify-between mb-3">
        <button className="text-sm font-semibold text-primary">{t("viewAll")}</button>
        <h2 className="text-lg font-bold text-foreground">{t("placesToVisit")}</h2>
      </div>

      <div className="space-y-2">
        {places.map((place) => (
          <button
            key={place.id}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            <Arrow className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{place.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{t(place.nameKey)}</span>
                <span className="text-xl">{place.icon}</span>
              </div>
            </div>
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Navigation className="h-3.5 w-3.5" />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
