import { Navigation, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EventItem {
  id: number;
  titleKey: string;
  locationKey: string;
  timeAr: string;
  timeEn: string;
  descKey: string;
  status: "live" | "soon";
  distance: string;
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
  },
  {
    id: 3,
    titleKey: "digitalFuture",
    locationKey: "mainStage",
    timeAr: "٥:١٥ م – ٦:٠٠ م",
    timeEn: "5:15 PM – 6:00 PM",
    descKey: "digitalFutureDesc",
    status: "soon",
    distance: "50م",
  },
  {
    id: 4,
    titleKey: "digitalServices",
    locationKey: "mainStage",
    timeAr: "٦:١٥ م – ٧:٠٠ م",
    timeEn: "6:15 PM – 7:00 PM",
    descKey: "digitalServicesDesc",
    status: "soon",
    distance: "50م",
  },
];

const statusStyles = {
  live: "bg-event-live text-primary-foreground",
  soon: "bg-event-soon text-primary-foreground",
};

const EventsList = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="mt-6 px-5">
      <div className="flex items-center justify-between mb-3">
        <button className="text-sm font-semibold text-primary">{t("viewAll")}</button>
        <h2 className="text-lg font-bold text-foreground">{t("nearbyEvents")}</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex w-[220px] shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">{event.distance}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[event.status]}`}>
                {event.status === "live" && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse-live me-1" />
                )}
                {t(event.status === "live" ? "now" : "soon")}
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

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Navigation className="h-4 w-4" />
              {t("startRoute")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
