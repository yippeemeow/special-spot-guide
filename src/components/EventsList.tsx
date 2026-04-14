import { useState } from "react";
import { Navigation, Clock, MapPin, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface EventItem {
  id: number;
  titleKey: string;
  locationKey: string;
  timeAr: string;
  timeEn: string;
  descKey: string;
  status: "live" | "soon" | "ended";
  distance: string;
  minutesUntil?: number;
  mapTarget?: string;
  category: "stage" | "booths";
}

const events: EventItem[] = [
  {
    id: 1,
    titleKey: "openingCeremony",
    locationKey: "mainStage",
    timeAr: "٤:٣٠ م – ٥:٠٠ م",
    timeEn: "4:30 PM – 5:00 PM",
    descKey: "openingDesc",
    status: "live",
    distance: "50م",
    mapTarget: "mainStage", // تم التعديل ليتوافق مع مفاتيح الخريطة
    category: "stage",
  },
  {
    id: 2,
    titleKey: "techColoring",
    locationKey: "childrenArea",
    timeAr: "٤:٠٠ م – ٥:٠٠ م",
    timeEn: "4:00 PM – 5:00 PM",
    descKey: "techColoringDesc",
    status: "live",
    distance: "120م",
    mapTarget: "childrenArea",
    category: "stage",
  },
  {
    id: 6,
    titleKey: "boothDigitalSolutions",
    locationKey: "digitalSolutions",
    timeAr: "٤:٠٠ م – ١١:٠٠ م",
    timeEn: "4:00 PM – 11:00 PM",
    descKey: "boothDigitalSolutionsDesc",
    status: "live",
    distance: "60م",
    mapTarget: "digitalSolutions",
    category: "booths",
  },
  {
    id: 7,
    titleKey: "boothDataSecurity",
    locationKey: "dataSecurity",
    timeAr: "٤:٠٠ م – ١١:٠٠ م",
    timeEn: "4:00 PM – 11:00 PM",
    descKey: "boothDataSecurityDesc",
    status: "live",
    distance: "75م",
    mapTarget: "dataSecurity",
    category: "booths",
  },
  {
    id: 8,
    titleKey: "boothInnovationUX",
    locationKey: "innovationUX",
    timeAr: "٥:٠٠ م – ١٠:٠٠ م",
    timeEn: "5:00 PM – 10:00 PM",
    descKey: "boothInnovationUXDesc",
    status: "soon",
    distance: "90م",
    minutesUntil: 20,
    mapTarget: "innovationUX",
    category: "booths",
  },
  {
    id: 9,
    titleKey: "boothTechFuture",
    locationKey: "techFuture",
    timeAr: "٤:٠٠ م – ١١:٠٠ م",
    timeEn: "4:00 PM – 11:00 PM",
    descKey: "boothTechFutureDesc",
    status: "live",
    distance: "85م",
    mapTarget: "techFuture",
    category: "booths",
  },
];

const statusStyles = {
  live: "bg-secondary text-secondary-foreground glow-cyan",
  soon: "bg-event-soon text-primary-foreground",
  ended: "bg-muted text-muted-foreground",
};

interface EventsListProps {
  filterCategory?: string;
}

const EventsList = ({ filterCategory }: EventsListProps) => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleNavigate = (targetName?: string) => {
    if (targetName) {
      // نرسل الـ target name لكي تستقبله صفحة الخريطة وترسم المسار
      navigate(`/map?target=${targetName}`);
    } else {
      navigate("/map");
    }
  };

  const filteredEvents =
    filterCategory && filterCategory !== "all" ? events.filter((e) => e.category === filterCategory) : events;

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const order = { live: 0, soon: 1, ended: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <>
      <div className="mt-6 px-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setShowAll(true)} className="text-sm font-semibold text-secondary hover:underline">
            {t("viewAll")}
          </button>
          <div className="text-end">
            <h2 className="text-lg font-bold text-foreground">{t("currentEvents")}</h2>
            <p className="text-xs text-muted-foreground">{t("nearbyEventsSubtitle")}</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className={`flex w-[240px] shrink-0 flex-col rounded-3xl border bg-card/40 backdrop-blur-sm p-4 shadow-lg transition-all ${
                event.status === "ended" ? "opacity-50 border-border" : "border-secondary/20 hover:border-secondary/50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/70">{event.distance}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyles[event.status]}`}
                >
                  {event.status === "live" && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary-foreground animate-pulse me-1.5" />
                  )}
                  {event.status === "live" && t("now")}
                  {event.status === "soon" && event.minutesUntil && t("inMinutes", { n: event.minutesUntil })}
                  {event.status === "ended" && t("ended")}
                </span>
              </div>

              <h3 className="text-sm font-bold text-foreground leading-tight h-10 line-clamp-2">{t(event.titleKey)}</h3>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-secondary/70" />
                  <span className="truncate">{t(event.locationKey)}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground/50" />
                  <span>{lang === "ar" ? event.timeAr : event.timeEn}</span>
                </div>
              </div>

              {event.status !== "ended" ? (
                <button
                  onClick={() => handleNavigate(event.mapTarget)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-95 shadow-[0_4px_15px_rgba(0,243,255,0.2)]"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  <Navigation className="h-4 w-4 fill-current" />
                  {t("startRoute")}
                </button>
              ) : (
                <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-muted/50 py-3 text-sm font-bold text-muted-foreground">
                  {t("ended")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* مودال عرض الكل - تم تحسين التصميم */}
      {showAll && (
        <div className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 pt-12 pb-6 bg-background/80 backdrop-blur-md border-b border-white/5">
            <button
              onClick={() => setShowAll(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">{t("allEvents")}</h1>
            <div className="w-10" />
          </div>

          <div className="px-5 py-6 space-y-4 pb-20">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className={`rounded-3xl border bg-card/30 p-5 shadow-sm transition-all ${
                  event.status === "ended" ? "opacity-50 border-border" : "border-secondary/10"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${statusStyles[event.status]}`}>
                    {event.status === "live" && t("now")}
                    {event.status === "soon" && event.minutesUntil && t("inMinutes", { n: event.minutesUntil })}
                    {event.status === "ended" && t("ended")}
                  </span>
                  <span className="text-xs text-muted-foreground">{event.distance}</span>
                </div>
                <h3 className="text-md font-bold text-foreground mb-1">{t(event.titleKey)}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{t(event.descKey)}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground/80 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-secondary" />
                    {t(event.locationKey)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {lang === "ar" ? event.timeAr : event.timeEn}
                  </span>
                </div>

                {event.status !== "ended" && (
                  <button
                    onClick={() => {
                      setShowAll(false);
                      handleNavigate(event.mapTarget);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-black active:scale-[0.97] transition-all shadow-lg"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <Navigation className="h-4 w-4 fill-current" />
                    {t("startRoute")}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsList;
