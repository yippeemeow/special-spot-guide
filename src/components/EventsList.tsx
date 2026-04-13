import { Navigation, Clock, MapPin } from "lucide-react";

interface Event {
  id: number;
  title: string;
  location: string;
  time: string;
  description: string;
  status: "live" | "soon" | "upcoming";
  statusLabel: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "الافتتاح الرسمي",
    location: "المسرح الرئيسي",
    time: "٤:٣٠ م – ٥:٠٠ م",
    description: "حفل الافتتاح الرسمي لفعالية علم للابتكار الرقمي",
    status: "live",
    statusLabel: "الآن",
  },
  {
    id: 2,
    title: "فعالية التلوين التقني",
    location: "منطقة الأطفال",
    time: "٤:٠٠ م – ٥:٠٠ م",
    description: "نشاط تلوين بأدوات تقنية مبتكرة",
    status: "live",
    statusLabel: "الآن",
  },
  {
    id: 3,
    title: "مستقبل الحلول الرقمية في السعودية",
    location: "المسرح الرئيسي",
    time: "٥:١٥ م – ٦:٠٠ م",
    description: "جلسة حوارية عن مستقبل الحلول الرقمية",
    status: "soon",
    statusLabel: "قريبًا",
  },
  {
    id: 4,
    title: "كيف تسهّل الخدمات الرقمية حياة الأفراد؟",
    location: "المسرح الرئيسي",
    time: "٦:١٥ م – ٧:٠٠ م",
    description: "عرض تفاعلي عن أثر الرقمنة",
    status: "soon",
    statusLabel: "قريبًا",
  },
];

const statusStyles = {
  live: "bg-event-live text-primary-foreground",
  soon: "bg-event-soon text-primary-foreground",
  upcoming: "bg-event-upcoming text-primary-foreground",
};

const EventsList = () => {
  return (
    <div className="mt-6 px-5">
      <div className="flex items-center justify-between">
        <button className="text-sm font-semibold text-primary">عرض الكل</button>
        <h2 className="text-lg font-bold text-foreground">الفعاليات الجارية والقادمة</h2>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2" style={{ direction: "rtl" }}>
        {events.map((event) => (
          <div
            key={event.id}
            className="flex w-[220px] shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex justify-end">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[event.status]}`}>
                {event.status === "live" && <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse-live" />}
                {event.statusLabel}
              </span>
            </div>

            <h3 className="text-right text-sm font-bold text-foreground leading-snug">{event.title}</h3>

            <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <span>{event.location}</span>
              <MapPin className="h-3 w-3" />
            </div>

            <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <span>{event.time}</span>
              <Clock className="h-3 w-3" />
            </div>

            <p className="mt-2 text-right text-xs text-muted-foreground leading-relaxed">{event.description}</p>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Navigation className="h-4 w-4" />
              ابدأ المسار
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
