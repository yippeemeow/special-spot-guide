import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Radio } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import VenueMap from "@/components/VenueMap";
import ChatBot from "@/components/ChatBot";
import BottomNav from "@/components/BottomNav";

const MapContent = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const target = (location.state as any)?.target;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const [crowdRadar, setCrowdRadar] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="flex items-center justify-between px-5 pt-10 pb-4" style={{ background: "var(--gradient-header)" }}>
        <div />
        <h1 className="text-lg font-bold text-primary-foreground text-glow">{t("venueMap")}</h1>
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary-foreground">
          <BackArrow className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-5 mt-4">
        <button
          onClick={() => setCrowdRadar(!crowdRadar)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
            crowdRadar
              ? "text-primary-foreground shadow-lg glow-neon"
              : "bg-card border border-primary/20 text-foreground shadow-sm hover:border-primary/30"
          }`}
          style={crowdRadar ? { background: "var(--gradient-neon)" } : undefined}
        >
          <Radio className={`h-5 w-5 ${crowdRadar ? "animate-pulse" : ""}`} />
          {t("crowdRadar")}
        </button>
      </div>

      {crowdRadar && (
        <div className="mx-5 mt-3 rounded-xl border border-primary/20 bg-card p-3 shadow-sm">
          <p className="text-xs font-bold text-foreground mb-2 text-center">{t("crowdLegend")}</p>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="h-3 w-3 rounded-full" style={{ background: "hsl(120, 60%, 40%)" }} />
              <span className="text-foreground font-medium">{t("crowdLow")}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="h-3 w-3 rounded-full" style={{ background: "hsl(45, 80%, 50%)" }} />
              <span className="text-foreground font-medium">{t("crowdMedium")}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="h-3 w-3 rounded-full" style={{ background: "hsl(0, 70%, 50%)" }} />
              <span className="text-foreground font-medium">{t("crowdHigh")}</span>
            </span>
          </div>
        </div>
      )}

      {target && (
        <div className="mx-5 mt-3 rounded-xl bg-primary/10 border border-primary/20 p-3 text-center">
          <p className="text-sm font-semibold text-primary">
            {t("navigateToLocation")}: {t(target)}
          </p>
        </div>
      )}

      <VenueMap crowdRadar={crowdRadar} />

      <BottomNav />
      <ChatBot />
    </div>
  );
};

const MapPage = () => (
  <AccessibilityProvider>
    <LanguageProvider>
      <MapContent />
    </LanguageProvider>
  </AccessibilityProvider>
);

export default MapPage;
