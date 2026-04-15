import { Compass, Maximize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VenueMapProps {
  crowdRadar?: boolean;
  targetLocation?: string;
}

// بيانات الزحام
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
  information: "low",
};

// إحداثيات مراكز المناطق لرسم المسار
const coordinates: Record<string, { x: number; y: number }> = {
  mainStage: { x: 180, y: 60 },
  childrenArea: { x: 80, y: 60 },
  restaurantArea: { x: 280, y: 60 },
  digitalSolutions: { x: 85, y: 130 },
  dataSecurity: { x: 165, y: 130 },
  innovationUX: { x: 245, y: 130 },
  techFuture: { x: 325, y: 130 },
  firstAid: { x: 77, y: 185 },
  menRestroom: { x: 155, y: 185 },
  womenRestroom: { x: 233, y: 185 },
  menPrayer: { x: 311, y: 185 },
  womenPrayer: { x: 350, y: 225 },
  information: { x: 77, y: 225 },
  reception: { x: 160, y: 265 },
  userLocation: { x: 180, y: 250 },
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

// Service area rendering helper
const ServiceRect = ({
  area,
  x,
  y,
  w,
  h,
  label,
  targetLocation,
  colors,
}: {
  area: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  targetLocation?: string;
  colors: { fill: string; stroke: string };
}) => {
  const isTarget = targetLocation === area;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill={colors.fill}
        stroke={isTarget ? "#00f3ff" : colors.stroke}
        strokeWidth={isTarget ? 3 : 1}
        className={isTarget ? "animate-pulse" : ""}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 3}
        textAnchor="middle"
        className="text-[5px] font-bold"
        fill="hsl(0, 0%, 85%)"
      >
        {label}
      </text>
    </g>
  );
};

const VenueMap = ({ crowdRadar = false, targetLocation }: VenueMapProps) => {
  const { t } = useLanguage();
  const c = (area: string, df: string, ds: string) => getColor(area, crowdRadar, df, ds);

  const destination = targetLocation ? coordinates[targetLocation] : null;
  const start = coordinates.userLocation;

  const serviceFill = "hsl(235, 20%, 15%)";
  const serviceStroke = "hsl(235, 20%, 25%)";

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-1 text-lg font-bold text-foreground">{t("venueMap")}</h2>
      <p className="mb-3 text-sm text-muted-foreground">
        {targetLocation ? `يرجى اتباع الخط المنقط للوصول إلى ${t(targetLocation)}` : t("exploreLocations")}
      </p>

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm glow-primary">
        {/* أزرار التحكم */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground shadow-md transition-transform active:scale-90"
            style={{ background: "var(--gradient-cta)" }}
          >
            <Compass className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-primary/20 transition-transform active:scale-90">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <svg viewBox="0 0 400 310" className="w-full drop-shadow-2xl">
            {/* أرضية المعرض */}
            <rect x="20" y="10" width="360" height="290" rx="12" fill="hsl(235, 25%, 10%)" stroke="hsl(270, 20%, 25%)" strokeWidth="1" />

            {/* رسم المسار */}
            {destination && (
              <g>
                <path
                  d={`M ${start.x} ${start.y} Q ${start.x} ${destination.y + 40}, ${destination.x} ${destination.y}`}
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8, 4"
                  className="animate-[dash_2s_linear_infinite]"
                />
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#bc13fe" />
                    <stop offset="100%" stopColor="#00f3ff" />
                  </linearGradient>
                </defs>
              </g>
            )}

            {/* ===== المناطق الرئيسية ===== */}
            {/* المسرح الرئيسي */}
            <rect x="120" y="30" width="120" height="60" rx="8"
              fill={c("mainStage", "hsl(270, 30%, 18%)", "hsl(270, 40%, 35%)").fill}
              stroke={targetLocation === "mainStage" ? "#00f3ff" : c("mainStage", "hsl(270, 30%, 18%)", "hsl(270, 40%, 35%)").stroke}
              strokeWidth={targetLocation === "mainStage" ? 3 : 1}
              className={targetLocation === "mainStage" ? "animate-pulse" : ""}
            />
            <text x="180" y="60" textAnchor="middle" className="text-[9px] font-bold" fill="white">{t("mainStage")}</text>

            {/* منطقة الأطفال */}
            <rect x="50" y="30" width="60" height="60" rx="8"
              fill={c("childrenArea", "hsl(45, 30%, 15%)", "hsl(45, 30%, 30%)").fill}
              stroke={targetLocation === "childrenArea" ? "#00f3ff" : c("childrenArea", "hsl(45, 30%, 15%)", "hsl(45, 30%, 30%)").stroke}
              strokeWidth={targetLocation === "childrenArea" ? 3 : 1}
            />
            <text x="80" y="60" textAnchor="middle" className="text-[7px] font-bold" fill="white">{t("childrenArea")}</text>

            {/* منطقة المطاعم */}
            <rect x="250" y="30" width="60" height="60" rx="8"
              fill={c("restaurantArea", "hsl(35, 30%, 15%)", "hsl(35, 30%, 30%)").fill}
              stroke={targetLocation === "restaurantArea" ? "#00f3ff" : c("restaurantArea", "hsl(35, 30%, 15%)", "hsl(35, 30%, 30%)").stroke}
              strokeWidth={targetLocation === "restaurantArea" ? 3 : 1}
            />
            <text x="280" y="60" textAnchor="middle" className="text-[7px] font-bold" fill="white">{t("restaurantArea")}</text>

            {/* ===== البوثات ===== */}
            <rect x="50" y="110" width="70" height="40" rx="6"
              fill={c("digitalSolutions", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").fill}
              stroke={targetLocation === "digitalSolutions" ? "#00f3ff" : c("digitalSolutions", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").stroke}
              strokeWidth={targetLocation === "digitalSolutions" ? 3 : 1}
            />
            <text x="85" y="133" textAnchor="middle" className="text-[6px] font-bold" fill="white">{t("digitalSolutions")}</text>

            <rect x="130" y="110" width="70" height="40" rx="6"
              fill={c("dataSecurity", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").fill}
              stroke={targetLocation === "dataSecurity" ? "#00f3ff" : c("dataSecurity", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").stroke}
              strokeWidth={targetLocation === "dataSecurity" ? 3 : 1}
            />
            <text x="165" y="133" textAnchor="middle" className="text-[6px] font-bold" fill="white">{t("dataSecurity")}</text>

            <rect x="210" y="110" width="70" height="40" rx="6"
              fill={c("innovationUX", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").fill}
              stroke={targetLocation === "innovationUX" ? "#00f3ff" : c("innovationUX", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").stroke}
              strokeWidth={targetLocation === "innovationUX" ? 3 : 1}
            />
            <text x="245" y="133" textAnchor="middle" className="text-[6px] font-bold" fill="white">{t("innovationUX")}</text>

            <rect x="290" y="110" width="70" height="40" rx="6"
              fill={c("techFuture", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").fill}
              stroke={targetLocation === "techFuture" ? "#00f3ff" : c("techFuture", "hsl(200, 30%, 15%)", "hsl(200, 30%, 28%)").stroke}
              strokeWidth={targetLocation === "techFuture" ? 3 : 1}
            />
            <text x="325" y="133" textAnchor="middle" className="text-[6px] font-bold" fill="white">{t("techFuture")}</text>

            {/* ===== الخدمات ===== */}
            {/* الصف الأول من الخدمات */}
            <ServiceRect area="firstAid" x="50" y="170" w="55" h="30" label={t("firstAid")} targetLocation={targetLocation} colors={c("firstAid", serviceFill, serviceStroke)} />
            <ServiceRect area="menRestroom" x="115" y="170" w="55" h="30" label={t("menRestroom")} targetLocation={targetLocation} colors={c("menRestroom", serviceFill, serviceStroke)} />
            <ServiceRect area="womenRestroom" x="205" y="170" w="55" h="30" label={t("womenRestroom")} targetLocation={targetLocation} colors={c("womenRestroom", serviceFill, serviceStroke)} />
            <ServiceRect area="menPrayer" x="283" y="170" w="55" h="30" label={t("menPrayer")} targetLocation={targetLocation} colors={c("menPrayer", serviceFill, serviceStroke)} />

            {/* الصف الثاني من الخدمات */}
            <ServiceRect area="information" x="50" y="210" w="55" h="30" label={t("information")} targetLocation={targetLocation} colors={c("information", serviceFill, serviceStroke)} />
            <ServiceRect area="womenPrayer" x="322" y="210" w="55" h="30" label={t("womenPrayer")} targetLocation={targetLocation} colors={c("womenPrayer", serviceFill, serviceStroke)} />

            {/* ===== أنت هنا ===== */}
            <g className="animate-pulse">
              <circle cx="180" cy="250" r="8" fill="hsla(270, 80%, 60%, 0.3)" />
              <circle cx="180" cy="250" r="4" fill="hsl(270, 80%, 60%)" />
            </g>
            <text x="180" y="267" textAnchor="middle" className="text-[7px] font-extrabold" fill="hsl(270, 80%, 60%)">{t("youAreHere")}</text>

            {/* المدخل الرئيسي */}
            <rect x="145" y="290" width="110" height="10" rx="4" fill="var(--gradient-cta)" />
            <text x="200" y="297" textAnchor="middle" className="text-[6px] font-bold" fill="white">{t("mainEntrance")}</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 border-t border-primary/15 bg-black/20 px-4 py-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_5px_cyan]" /> {t("myLocation")}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-[#bc13fe] animate-pulse" /> مسار الوصول
          </span>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -24; }
        }
      `}</style>
    </div>
  );
};

export default VenueMap;
