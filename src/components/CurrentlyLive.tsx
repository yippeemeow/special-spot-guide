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
  {
    id: "stage1", emoji: "🎤",
    title: { ar: "مستقبل الحلول الرقمية في السعودية", en: "Future of Digital Solutions in KSA", zh: "沙特数字解决方案的未来", es: "Futuro de las soluciones digitales en KSA" },
    section: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٥:١٥ م – ٦:٠٠ م", en: "5:15 PM – 6:00 PM", zh: "下午5:15 – 6:00", es: "5:15 PM – 6:00 PM" },
    mapTarget: "mainStage",
  },
];

const CurrentlyLive = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="mt-4 px-4">
      <div className="text-end mb-2">
        <h2 className="text-sm font-bold text-foreground">الفعاليات الجارية الآن</h2>
        <p className="text-[10px] text-muted-foreground">كل ما هو متاح حالياً ({liveItems.length})</p>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-3 no-scrollbar scroll-smooth">
        {liveItems.map((item) => (
          <div
            key={item.id}
            className="flex w-[160px] shrink-0 flex-col rounded-2xl border border-secondary/20 bg-card/40 backdrop-blur-sm p-3 shadow-md"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">{item.emoji}</span>
              <span className="rounded-full px-2 py-0.5 text-[8px] font-bold bg-secondary text-secondary-foreground glow-cyan">
                <span className="inline-block h-1 w-1 rounded-full bg-secondary-foreground animate-pulse me-1" />
                الآن
              </span>
            </div>

            <h3 className="text-xs font-bold text-foreground leading-tight min-h-[2rem] line-clamp-2">
              {item.title[lang]}
            </h3>

            <div className="mt-1.5 space-y-0.5">
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <MapPin className="h-2.5 w-2.5 text-secondary/70" />
                <span>{item.section[lang]}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5 text-muted-foreground/50" />
                <span>{item.time[lang]}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/map?target=${item.mapTarget}`)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-black shadow-[0_4px_15px_rgba(0,243,255,0.2)]"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Navigation className="h-3 w-3 fill-current" />
              وجّهني
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyLive;
