import { Navigation, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const services = [
  { id: 1, nameKey: "menRestroom", icon: "🚹", distance: "30م", mapTarget: "menRestroom" },
  { id: 2, nameKey: "womenRestroom", icon: "🚺", distance: "35م", mapTarget: "womenRestroom" },
  { id: 3, nameKey: "firstAid", icon: "🏥", distance: "60م", mapTarget: "firstAid" },
  { id: 4, nameKey: "menPrayer", icon: "🕌", distance: "45م", mapTarget: "menPrayer" },
  { id: 5, nameKey: "womenPrayer", icon: "🕌", distance: "50م", mapTarget: "womenPrayer" },
  { id: 6, nameKey: "information", icon: "ℹ️", distance: "20م", mapTarget: "information" },
];

const ServicesList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = (target: string) => {
    navigate("/map", { state: { target } });
  };

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-3 text-lg font-bold text-foreground text-end">{t("services")}</h2>
      <div className="grid grid-cols-2 gap-3">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => handleNavigate(s.mapTarget)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-xs font-semibold text-foreground text-center">{t(s.nameKey)}</span>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{s.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-primary">
              <Navigation className="h-3 w-3" />
              <span>{t("navigate")}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
