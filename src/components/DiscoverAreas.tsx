import { Baby, Mic2, UtensilsCrossed, Wrench, Grid3X3, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DiscoverAreas = () => {
  const { t } = useLanguage();

  const areas = [
    { id: 1, labelKey: "stage", icon: Mic2 },
    { id: 2, labelKey: "kids", icon: Baby },
    { id: 3, labelKey: "booths", icon: Grid3X3 },
    { id: 4, labelKey: "restaurants", icon: UtensilsCrossed },
    { id: 5, labelKey: "services", icon: Wrench },
    { id: 6, labelKey: "information", icon: Info },
  ];

  return (
    <div className="mt-6 px-5 pb-28">
      <h2 className="mb-3 text-lg font-bold text-foreground">{t("discoverAreas")}</h2>
      <div className="grid grid-cols-3 gap-3">
        {areas.map((area) => {
          const Icon = area.icon;
          return (
            <button
              key={area.id}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-foreground">{t(area.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverAreas;
