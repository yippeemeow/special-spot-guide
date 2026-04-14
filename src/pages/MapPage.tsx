import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Radio, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import VenueMap from "@/components/VenueMap";
import ChatBot from "@/components/ChatBot";
import BottomNav from "@/components/BottomNav";

const MapPage = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // جلب الهدف سواء كان قادماً من الـ State أو من الـ Query Parameters
  const queryParams = new URLSearchParams(location.search);
  const targetFromQuery = queryParams.get("target");
  const target = targetFromQuery || (location.state as any)?.target;

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const [crowdRadar, setCrowdRadar] = useState(false);

  // تفعيل رادار الزحام تلقائياً إذا كان هناك هدف محدد لإظهار "الهيت ماب" فوراً
  useEffect(() => {
    if (target) {
      setCrowdRadar(true);
    }
  }, [target]);

  return (
    <div className="min-h-screen bg-background pb-24 rtl" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-10 pb-4"
        style={{ background: "var(--gradient-header)" }}
      >
        <div className="w-10" />
        <h1 className="text-lg font-bold text-primary-foreground text-glow">{t("venueMap")}</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary-foreground transition-transform active:scale-90"
        >
          <BackArrow className="h-5 w-5" />
        </button>
      </div>

      {/* زر رادار الزحام */}
      <div className="mx-5 mt-4">
        <button
          onClick={() => setCrowdRadar(!crowdRadar)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
            crowdRadar
              ? "text-primary-foreground shadow-lg glow-neon scale-[1.02]"
              : "bg-card border border-primary/20 text-foreground shadow-sm hover:border-primary/30"
          }`}
          style={crowdRadar ? { background: "var(--gradient-neon)" } : undefined}
        >
          <Radio className={`h-5 w-5 ${crowdRadar ? "animate-pulse" : ""}`} />
          {crowdRadar ? "إيقاف رادار الزحام" : t("crowdRadar")}
        </button>
      </div>

      {/* تفاصيل الزحام (Heatmap Legend) */}
      {crowdRadar && (
        <div className="mx-5 mt-3 rounded-xl border border-primary/20 bg-card p-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <p className="text-[10px] font-bold text-muted-foreground mb-2 text-center uppercase tracking-wider">
            {t("crowdLegend")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                style={{ background: "hsl(120, 60%, 40%)" }}
              />
              <span className="text-foreground font-medium">{t("crowdLow")}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.5)]"
                style={{ background: "hsl(45, 80%, 50%)" }}
              />
              <span className="text-foreground font-medium">{t("crowdMedium")}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                style={{ background: "hsl(0, 70%, 50%)" }}
              />
              <span className="text-foreground font-medium">{t("crowdHigh")}</span>
            </span>
          </div>
        </div>
      )}

      {/* عرض الوجهة الحالية */}
      {target && (
        <div className="mx-5 mt-3 rounded-xl bg-secondary/20 border border-secondary/30 p-3 flex items-center justify-center gap-2 animate-bounce-subtle">
          <MapPin className="h-4 w-4 text-secondary" />
          <p className="text-sm font-bold text-secondary-foreground">
            {t("navigateToLocation")}: <span className="text-white">{target}</span>
          </p>
        </div>
      )}

      {/* الخريطة - نمرر لها الهدف وحالة الرادار لتقوم برسم المسار والدوائر */}
      <div className="mt-4">
        <VenueMap crowdRadar={crowdRadar} targetLocation={target} />
      </div>

      <BottomNav />
      <ChatBot />
    </div>
  );
};

export default MapPage;
