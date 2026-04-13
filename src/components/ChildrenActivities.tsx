import { Navigation, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const activities = [
  {
    id: 1,
    titleKey: "techColoring",
    descKey: "techColoringDesc",
    timeAr: "٤:٠٠ م – ٥:٠٠ م",
    timeEn: "4:00 PM – 5:00 PM",
    emoji: "🎨",
    status: "live" as const,
  },
  {
    id: 2,
    title: { ar: "ركن الروبوتات", en: "Robot Corner" },
    desc: { ar: "تجربة تفاعلية مع الروبوتات الذكية", en: "Interactive experience with smart robots" },
    timeAr: "٥:٣٠ م – ٦:٣٠ م",
    timeEn: "5:30 PM – 6:30 PM",
    emoji: "🤖",
    status: "soon" as const,
    minutesUntil: 15,
  },
  {
    id: 3,
    title: { ar: "مسابقة الألغاز الرقمية", en: "Digital Puzzle Contest" },
    desc: { ar: "تحدي ألغاز تقنية للأطفال", en: "Tech puzzle challenge for kids" },
    timeAr: "٧:٠٠ م – ٨:٠٠ م",
    timeEn: "7:00 PM – 8:00 PM",
    emoji: "🧩",
    status: "soon" as const,
    minutesUntil: 60,
  },
];

const ChildrenActivities = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/map", { state: { target: "childrenArea" } });
  };

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-3 text-lg font-bold text-foreground text-end">{t("childrenActivities")}</h2>
      <div className="space-y-3">
        {activities.map((a) => {
          const title = a.titleKey ? t(a.titleKey) : (a.title ? a.title[lang] : "");
          const desc = a.descKey ? t(a.descKey) : (a.desc ? a.desc[lang] : "");

          return (
            <div
              key={a.id}
              className="rounded-2xl border border-primary/15 bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  a.status === "live" ? "bg-primary text-primary-foreground glow-primary" : "bg-event-soon text-primary-foreground"
                }`}>
                  {a.status === "live" && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse-live me-1" />
                  )}
                  {a.status === "live" ? t("now") : t("inMinutes", { n: a.minutesUntil || 0 })}
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">{title}</h3>
                  <span className="text-xl">{a.emoji}</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-muted-foreground text-end">{desc}</p>

              <div className="mt-2 flex items-center justify-end gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{lang === "ar" ? a.timeAr : a.timeEn}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{t("childrenArea")}</span>
                </div>
              </div>

              <button
                onClick={handleNavigate}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                style={{ background: "var(--gradient-cta)" }}
              >
                <Navigation className="h-4 w-4" />
                {t("navigate")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildrenActivities;
