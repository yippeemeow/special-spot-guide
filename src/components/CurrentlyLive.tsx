import { Navigation, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface LiveItem {
  id: string;
  title: { ar: string; en: string; zh: string; es: string };
  section: { ar: string; en: string; zh: string; es: string };
  time: { ar: string; en: string; zh: string; es: string };
  mapTarget: string;
  emoji: string;
}

const liveItems: LiveItem[] = [
  // Booths - all running now
  {
    id: "booth1", emoji: "🏢",
    title: { ar: "بوث الحلول الرقمية", en: "Digital Solutions Booth", zh: "数字解决方案展位", es: "Stand de soluciones digitales" },
    section: { ar: "البوثات", en: "Booths", zh: "展位", es: "Stands" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "digitalSolutions",
  },
  {
    id: "booth2", emoji: "🔒",
    title: { ar: "بوث البيانات والأمن الرقمي", en: "Data & Security Booth", zh: "数据与安全展位", es: "Stand de datos y seguridad" },
    section: { ar: "البوثات", en: "Booths", zh: "展位", es: "Stands" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "dataSecurity",
  },
  {
    id: "booth3", emoji: "💡",
    title: { ar: "بوث الابتكار وتجربة المستخدم", en: "Innovation & UX Booth", zh: "创新与UX展位", es: "Stand de innovación y UX" },
    section: { ar: "البوثات", en: "Booths", zh: "展位", es: "Stands" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "innovationUX",
  },
  {
    id: "booth4", emoji: "🚀",
    title: { ar: "بوث المستقبل التقني", en: "Tech Future Booth", zh: "技术未来展位", es: "Stand del futuro tecnológico" },
    section: { ar: "البوثات", en: "Booths", zh: "展位", es: "Stands" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "techFuture",
  },
  // Restaurants
  {
    id: "rest1", emoji: "🍔",
    title: { ar: "مطعم كودو", en: "Kudu Restaurant", zh: "Kudu餐厅", es: "Restaurante Kudu" },
    section: { ar: "المطاعم", en: "Restaurants", zh: "餐厅", es: "Restaurantes" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "restaurantArea",
  },
  {
    id: "rest2", emoji: "🍗",
    title: { ar: "مطعم البيك", en: "Al Baik", zh: "Al Baik餐厅", es: "Al Baik" },
    section: { ar: "المطاعم", en: "Restaurants", zh: "餐厅", es: "Restaurantes" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "restaurantArea",
  },
  {
    id: "rest3", emoji: "☕",
    title: { ar: "كوفي شوب", en: "Coffee Shop", zh: "咖啡店", es: "Cafetería" },
    section: { ar: "المطاعم", en: "Restaurants", zh: "餐厅", es: "Restaurantes" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "restaurantArea",
  },
  // Services
  {
    id: "svc1", emoji: "🕌",
    title: { ar: "مصلى نساء", en: "Women's Prayer", zh: "女祈祷室", es: "Sala de oración mujeres" },
    section: { ar: "الخدمات", en: "Services", zh: "服务", es: "Servicios" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "womenPrayer",
  },
  {
    id: "svc2", emoji: "🕌",
    title: { ar: "مصلى رجال", en: "Men's Prayer", zh: "男祈祷室", es: "Sala de oración hombres" },
    section: { ar: "الخدمات", en: "Services", zh: "服务", es: "Servicios" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "menPrayer",
  },
  {
    id: "svc3", emoji: "🏥",
    title: { ar: "الإسعافات الأولية", en: "First Aid", zh: "急救站", es: "Primeros auxilios" },
    section: { ar: "الخدمات", en: "Services", zh: "服务", es: "Servicios" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "firstAid",
  },
  {
    id: "svc4", emoji: "ℹ️",
    title: { ar: "الاستعلامات", en: "Information", zh: "咨询处", es: "Información" },
    section: { ar: "الخدمات", en: "Services", zh: "服务", es: "Servicios" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    mapTarget: "information",
  },
];

const CurrentlyLive = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="mt-6 px-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-end mb-3">
        <h2 className="text-lg font-bold text-foreground">الفعاليات الجارية الآن</h2>
        <p className="text-xs text-muted-foreground">كل ما هو متاح حالياً ({liveItems.length})</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {liveItems.map((item) => (
          <div
            key={item.id}
            className="flex w-[200px] shrink-0 flex-col rounded-3xl border border-secondary/20 bg-card/40 backdrop-blur-sm p-4 shadow-lg hover:border-secondary/50 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{item.emoji}</span>
              <span className="rounded-full px-2.5 py-1 text-[10px] font-bold bg-secondary text-secondary-foreground glow-cyan">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary-foreground animate-pulse me-1.5" />
                الآن
              </span>
            </div>

            <h3 className="text-sm font-bold text-foreground leading-tight min-h-[2.5rem] line-clamp-2">
              {item.title[lang]}
            </h3>

            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <MapPin className="h-3 w-3 text-secondary/70" />
                <span>{item.section[lang]}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3 text-muted-foreground/50" />
                <span>{item.time[lang]}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/map?target=${item.mapTarget}`)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-95 shadow-[0_4px_15px_rgba(0,243,255,0.2)]"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Navigation className="h-4 w-4 fill-current" />
              وجّهني
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyLive;
