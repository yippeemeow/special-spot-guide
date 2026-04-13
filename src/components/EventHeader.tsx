import { Bell, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import masarkLogo from "@/assets/masark-logo.jpeg";

const EventHeader = () => {
  const { t, toggleLang, lang } = useLanguage();

  return (
    <div className="relative overflow-hidden px-5 pb-8 pt-10" style={{ background: "var(--gradient-header)" }}>
      {/* Decorative circles */}
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -right-5 top-10 h-24 w-24 rounded-full bg-primary/10 blur-xl" />
      <div className="absolute right-20 bottom-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex gap-2">
          <button
            onClick={toggleLang}
            className="flex h-10 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 text-xs font-semibold text-primary-foreground backdrop-blur-sm"
          >
            <Globe className="h-4 w-4" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary-foreground backdrop-blur-sm">
            <Bell className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-primary-foreground text-glow">{t("appName")}</h1>
            <p className="text-xs text-primary-foreground/60">{t("eventSubtitle")}</p>
          </div>
          <img
            src={masarkLogo}
            alt="Masark Logo"
            className="h-14 w-14 rounded-xl object-cover shadow-lg ring-2 ring-primary/30"
          />
        </div>
      </div>

      <p className="relative mt-3 text-center text-xs text-primary-foreground/50">{t("welcome")}</p>
    </div>
  );
};

export default EventHeader;
