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
    id: 1, titleKey: "openingCeremony", locationKey: "mainStage",
    timeAr: "٤:٣٠ م – ٥:٠٠ م", timeEn: "4:30 PM – 5:00 PM",
    descKey: "openingDesc", status: "live", distance: "50م", mapTarget: "mainStage", category: "stage",
  },
  {
    id: 5, titleKey: "showEnded", locationKey: "mainStage",
    timeAr: "٣:٠٠ م – ٤:٠٠ م", timeEn: "3:00 PM – 4:00 PM",
    descKey: "openingDesc", status: "ended", distance: "50م", mapTarget: "mainStage", category: "stage",
  },
  {
    id: 2, titleKey: "techColoring", locationKey: "childrenArea",
    timeAr: "٤:٠٠ م – ٥:٠٠ م", timeEn: "4:00 PM – 5:00 PM",
    descKey: "techColoringDesc", status: "live", distance: "120م", mapTarget: "childrenArea", category: "stage",
  },
  {
    id: 3, titleKey: "digitalFuture", locationKey: "mainStage",
    timeAr: "٥:١٥ م – ٦:٠٠ م", timeEn: "5:15 PM – 6:00 PM",
    descKey: "digitalFutureDesc", status: "soon", distance: "50م", minutesUntil: 10, mapTarget: "mainStage", category: "stage",
  },
  {
    id: 4, titleKey: "digitalServices", locationKey: "mainStage",
    timeAr: "٦:١٥ م – ٧:٠٠ م", timeEn: "6:15 PM – 7:00 PM",
    descKey: "digitalServicesDesc", status: "soon", distance: "50م", minutesUntil: 45, mapTarget: "mainStage", category: "stage",
  },
  {
    id: 6, titleKey: "boothDigitalSolutions", locationKey: "digitalSolutions",
    timeAr: "٤:٠٠ م – ١١:٠٠ م", timeEn: "4:00 PM – 11:00 PM",
    descKey: "boothDigitalSolutionsDesc", status: "live", distance: "60م", mapTarget: "digitalSolutions", category: "booths",
  },
  {
    id: 7, titleKey: "boothDataSecurity", locationKey: "dataSecurity",
    timeAr: "٤:٠٠ م – ١١:٠٠ م", timeEn: "4:00 PM – 11:00 PM",
    descKey: "boothDataSecurityDesc", status: "live", distance: "75م", mapTarget: "dataSecurity", category: "booths",
  },
  {
    id: 8, titleKey: "boothInnovationUX", locationKey: "innovationUX",
    timeAr: "٥:٠٠ م – ١٠:٠٠ م", timeEn: "5:00 PM – 10:00 PM",
    descKey: "boothInnovationUXDesc", status: "soon", distance: "90م", minutesUntil: 20, mapTarget: "innovationUX", category: "booths",
  },
  {
    id: 9, titleKey: "boothTechFuture", locationKey: "techFuture",
    timeAr: "٤:٠٠ م – ١١:٠٠ م", timeEn: "4:00 PM – 11:00 PM",
    descKey: "boothTechFutureDesc", status: "live", distance: "85م", mapTarget: "techFuture", category: "booths",
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

  const handleNavigate = (target?: string) => {
    navigate("/map", { state: { target } });
  };

  const filteredEvents = filterCategory && filterCategory !== "all"
    ? events.filter((e) => e.category === filterCategory)
    : events;

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const order = { live: 0, soon: 1, ended: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <>
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setShowAll(true)} className="text-sm font-semibold text-secondary">{t("viewAll")}</button>
          <div className="text-end">
            <h2 className="text-lg font-bold text-foreground">{t("currentEvents")}</h2>
            <p className="text-xs text-muted-foreground">{t("nearbyEventsSubtitle")}</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className={`flex w-[220px] shrink-0 flex-col rounded-2xl border bg-card p-4 shadow-sm transition-all ${
                event.status === "ended" ? "opacity-50 border-border" : "border-secondary/20 glow-cyan"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{event.distance}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[event.status]}`}>
                  {event.status === "live" && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary-foreground animate-pulse-live me-1" />
                  )}
                  {event.status === "live" && t("now")}
                  {event.status === "soon" && event.minutesUntil && t("inMinutes", { n: event.minutesUntil })}
                  {event.status === "ended" && t("ended")}
                </span>
              </div>

              <h3 className="text-sm font-bold text-foreground leading-snug">{t(event.titleKey)}</h3>

              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>{t(event.locationKey)}</span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 shrink-0" />
                <span>{lang === "ar" ? event.timeAr : event.timeEn}</span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{t(event.descKey)}</p>

              {event.status !== "ended" ? (
                <button
                  onClick={() => handleNavigate(event.mapTarget)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  <Navigation className="h-4 w-4" />
                  {t("startRoute")}
                </button>
              ) : (
                <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-2.5 text-sm font-semibold text-muted-foreground">
                  {t("ended")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View All Modal */}
      {showAll && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md overflow-y-auto">
          <div className="flex items-center justify-between px-5 pt-10 pb-4" style={{ background: "var(--gradient-header)" }}>
            <div />
            <h1 className="text-lg font-bold text-primary-foreground text-glow">{t("allEvents")}</h1>
            <button onClick={() => setShowAll(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5 py-4 space-y-3 pb-10">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className={`rounded-2xl border bg-card p-4 shadow-sm ${
                  event.status === "ended" ? "opacity-50 border-border" : "border-secondary/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[event.status]}`}>
                    {event.status === "live" && (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary-foreground animate-pulse-live me-1" />
                    )}
                    {event.status === "live" && t("now")}
                    {event.status === "soon" && event.minutesUntil && t("inMinutes", { n: event.minutesUntil })}
                    {event.status === "ended" && t("ended")}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{event.distance}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{t(event.titleKey)}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t(event.locationKey)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lang === "ar" ? event.timeAr : event.timeEn}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{t(event.descKey)}</p>
                {event.status !== "ended" && (
                  <button
                    onClick={() => { setShowAll(false); handleNavigate(event.mapTarget); }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-secondary-foreground"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <Navigation className="h-4 w-4" />
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
