import { Bell, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import masarkLogo from "@/assets/masark-logo.jpeg";

const EventHeader = () => {
  const { t, lang, setLang, langLabels, allLangs } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowLangMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative overflow-hidden px-5 pb-8 pt-10" style={{ background: "var(--gradient-header)" }}>
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />
      <div className="absolute -right-5 top-10 h-24 w-24 rounded-full bg-secondary/10 blur-xl" />
      <div className="absolute right-20 bottom-0 h-32 w-32 rounded-full bg-secondary/5 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex gap-2 relative" ref={menuRef}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex h-10 items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 text-xs font-semibold text-primary-foreground backdrop-blur-sm"
          >
            <Globe className="h-4 w-4" />
            {langLabels[lang]}
            <ChevronDown className="h-3 w-3" />
          </button>
          {showLangMenu && (
            <div className="absolute top-12 left-0 z-50 min-w-[140px] rounded-xl border border-secondary/20 bg-card shadow-xl overflow-hidden">
              {allLangs.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setShowLangMenu(false); }}
                  className={`w-full px-4 py-2.5 text-sm text-start transition-colors ${
                    lang === l ? "bg-secondary/20 text-secondary font-bold" : "text-foreground hover:bg-secondary/10"
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
          )}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-primary-foreground backdrop-blur-sm">
            <Bell className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-primary-foreground text-glow">{t("appName")}</h1>
            <p className="text-xs text-primary-foreground/70 font-medium">{t("appTagline")}</p>
          </div>
          <img
            src={masarkLogo}
            alt="Masark Logo"
            className="h-14 w-14 rounded-xl object-cover shadow-lg ring-2 ring-secondary/30"
          />
        </div>
      </div>

      <p className="relative mt-3 text-center text-xs text-primary-foreground/50">{t("eventSubtitle")}</p>
    </div>
  );
};

export default EventHeader;
