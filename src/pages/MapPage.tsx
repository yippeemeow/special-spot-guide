import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import VenueMap from "@/components/VenueMap";

const MapContent = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const target = (location.state as any)?.target;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center justify-between px-5 pt-10 pb-4" style={{ background: "var(--gradient-header)" }}>
        <div />
        <h1 className="text-lg font-bold text-primary-foreground">{t("venueMap")}</h1>
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
          <BackArrow className="h-5 w-5" />
        </button>
      </div>

      {target && (
        <div className="mx-5 mt-4 rounded-xl bg-primary/10 border border-primary/20 p-3 text-center">
          <p className="text-sm font-semibold text-primary">
            {t("navigateToLocation")}: {t(target)}
          </p>
        </div>
      )}

      <VenueMap />
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
