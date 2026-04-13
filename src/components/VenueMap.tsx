import { Compass, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VenueMapProps {
  crowdRadar?: boolean;
}

const crowdData: Record<string, "low" | "medium" | "high"> = {
  mainStage: "high",
  childrenArea: "medium",
  restaurantArea: "medium",
  digitalSolutions: "low",
  dataSecurity: "low",
  innovationUX: "medium",
  techFuture: "low",
  firstAid: "low",
  menRestroom: "medium",
  womenRestroom: "high",
  menPrayer: "low",
  womenPrayer: "low",
};

const crowdColors = {
  low: { fill: "hsla(120, 60%, 40%, 0.4)", stroke: "hsl(120, 60%, 35%)" },
  medium: { fill: "hsla(45, 80%, 50%, 0.4)", stroke: "hsl(45, 80%, 40%)" },
  high: { fill: "hsla(0, 70%, 50%, 0.4)", stroke: "hsl(0, 70%, 40%)" },
};

const getColor = (area: string, radar: boolean, defaultFill: string, defaultStroke: string) => {
  if (!radar) return { fill: defaultFill, stroke: defaultStroke };
  const level = crowdData[area];
  if (!level) return { fill: defaultFill, stroke: defaultStroke };
  return crowdColors[level];
};

const VenueMap = ({ crowdRadar = false }: VenueMapProps) => {
  const { t } = useLanguage();

  const c = (area: string, df: string, ds: string) => getColor(area, crowdRadar, df, ds);

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-1 text-lg font-bold text-foreground">{t("venueMap")}</h2>
      <p className="mb-3 text-sm text-muted-foreground">{t("exploreLocations")}</p>

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm glow-primary">
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground shadow-md" style={{ background: "var(--gradient-cta)" }}>
            <Compass className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-primary/20">
            <Maximize2 className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-primary/20">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-primary/20">
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <svg viewBox="0 0 400 300" className="w-full">
            <rect x="20" y="10" width="360" height="280" rx="8" fill="hsl(235, 25%, 16%)" stroke="hsl(270, 20%, 25%)" strokeWidth="1" />

            <rect x="120" y="30" width="120" height="60" rx="6" fill={c("mainStage", "hsl(270, 30%, 25%)", "hsl(270, 40%, 35%)").fill} stroke={c("mainStage", "hsl(270, 30%, 25%)", "hsl(270, 40%, 35%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="180" y="55" textAnchor="middle" className="text-[8px] font-bold" fill="hsl(0, 0%, 90%)">{t("mainStage")}</text>
            <text x="180" y="68" textAnchor="middle" className="text-[6px]" fill="hsl(235, 15%, 55%)">Main Stage</text>

            <rect x="50" y="30" width="60" height="60" rx="6" fill={c("childrenArea", "hsl(45, 30%, 22%)", "hsl(45, 30%, 30%)").fill} stroke={c("childrenArea", "hsl(45, 30%, 22%)", "hsl(45, 30%, 30%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="80" y="55" textAnchor="middle" className="text-[7px] font-bold" fill="hsl(0, 0%, 90%)">{t("childrenArea")}</text>

            <rect x="250" y="30" width="60" height="60" rx="6" fill={c("restaurantArea", "hsl(35, 30%, 22%)", "hsl(35, 30%, 30%)").fill} stroke={c("restaurantArea", "hsl(35, 30%, 22%)", "hsl(35, 30%, 30%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="280" y="55" textAnchor="middle" className="text-[7px] font-bold" fill="hsl(0, 0%, 90%)">{t("restaurantArea")}</text>

            <rect x="50" y="110" width="70" height="40" rx="4" fill={c("digitalSolutions", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").fill} stroke={c("digitalSolutions", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="85" y="133" textAnchor="middle" className="text-[5px] font-bold" fill="hsl(0, 0%, 90%)">{t("digitalSolutions")}</text>

            <rect x="130" y="110" width="70" height="40" rx="4" fill={c("dataSecurity", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").fill} stroke={c("dataSecurity", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="165" y="133" textAnchor="middle" className="text-[5px] font-bold" fill="hsl(0, 0%, 90%)">{t("dataSecurity")}</text>

            <rect x="210" y="110" width="70" height="40" rx="4" fill={c("innovationUX", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").fill} stroke={c("innovationUX", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="245" y="133" textAnchor="middle" className="text-[5px] font-bold" fill="hsl(0, 0%, 90%)">{t("innovationUX")}</text>

            <rect x="290" y="110" width="70" height="40" rx="4" fill={c("techFuture", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").fill} stroke={c("techFuture", "hsl(200, 30%, 20%)", "hsl(200, 30%, 28%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="325" y="133" textAnchor="middle" className="text-[5px] font-bold" fill="hsl(0, 0%, 90%)">{t("techFuture")}</text>

            <rect x="50" y="170" width="55" height="30" rx="4" fill={c("firstAid", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").fill} stroke={c("firstAid", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="77" y="187" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("firstAid")}</text>

            <rect x="115" y="170" width="45" height="30" rx="4" fill={c("menRestroom", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").fill} stroke={c("menRestroom", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="137" y="187" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("menRestroom")}</text>

            <rect x="170" y="170" width="45" height="30" rx="4" fill={c("womenRestroom", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").fill} stroke={c("womenRestroom", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="192" y="187" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("womenRestroom")}</text>

            <rect x="225" y="170" width="45" height="30" rx="4" fill={c("menPrayer", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").fill} stroke={c("menPrayer", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="247" y="187" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("menPrayer")}</text>

            <rect x="280" y="170" width="45" height="30" rx="4" fill={c("womenPrayer", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").fill} stroke={c("womenPrayer", "hsl(235, 20%, 18%)", "hsl(235, 20%, 25%)").stroke} strokeWidth={crowdRadar ? 2 : 1} />
            <text x="302" y="187" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("womenPrayer")}</text>

            <circle cx="180" cy="235" r="5" fill="hsl(270, 80%, 60%)" className="animate-pulse-live" />
            <text x="180" y="250" textAnchor="middle" className="text-[6px] font-bold" fill="hsl(270, 80%, 60%)">{t("youAreHere")}</text>

            <rect x="140" y="255" width="40" height="25" rx="4" fill="hsl(270, 30%, 20%)" stroke="hsl(270, 30%, 30%)" strokeWidth="1" />
            <text x="160" y="270" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("reception")}</text>

            <rect x="200" y="255" width="50" height="25" rx="4" fill="hsl(270, 30%, 20%)" stroke="hsl(270, 30%, 30%)" strokeWidth="1" />
            <text x="225" y="270" textAnchor="middle" className="text-[5px]" fill="hsl(0, 0%, 85%)">{t("information")}</text>

            <rect x="145" y="282" width="80" height="8" rx="2" fill="hsl(270, 80%, 55%)" />
            <text x="185" y="289" textAnchor="middle" className="text-[5px] font-bold" fill="white">{t("mainEntrance")}</text>
          </svg>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-primary/15 px-4 py-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" /> {t("myLocation")}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-event-soon" /> {t("event")}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" /> {t("service")}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-live" /> {t("now")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VenueMap;
