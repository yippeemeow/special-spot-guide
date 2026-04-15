import { useState } from "react";
import { Navigation, Clock, MapPin, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface StageEvent {
  id: number;
  title: { ar: string; en: string; zh: string; es: string };
  location: { ar: string; en: string; zh: string; es: string };
  time: { ar: string; en: string; zh: string; es: string };
  status: { ar: string; en: string; zh: string; es: string };
  statusType: "ended" | "soon" | "later";
  desc: { ar: string; en: string; zh: string; es: string };
  mapTarget: string;
}

const stageEvents: StageEvent[] = [
  {
    id: 1,
    title: { ar: "الافتتاح الرسمي", en: "Official Opening", zh: "正式开幕", es: "Inauguración oficial" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٤:٣٠ م – ٥:٠٠ م", en: "4:30 PM – 5:00 PM", zh: "下午4:30 – 5:00", es: "4:30 PM – 5:00 PM" },
    status: { ar: "خلصت", en: "Ended", zh: "已结束", es: "Finalizado" },
    statusType: "ended",
    desc: { ar: "ترحيب بالحضور، تقديم عن فعالية علم، وعرض مرئي افتتاحي.", en: "Welcome ceremony, introduction to Elm event, and opening visual show.", zh: "欢迎致辞，Elm活动介绍和开幕视觉表演。", es: "Bienvenida, presentación del evento Elm y show visual de apertura." },
    mapTarget: "mainStage",
  },
  {
    id: 2,
    title: { ar: "مستقبل الحلول الرقمية في السعودية", en: "Future of Digital Solutions in KSA", zh: "沙特数字解决方案的未来", es: "Futuro de las soluciones digitales en KSA" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٥:١٥ م – ٦:٠٠ م", en: "5:15 PM – 6:00 PM", zh: "下午5:15 – 6:00", es: "5:15 PM – 6:00 PM" },
    status: { ar: "بعد 15 دقيقة", en: "In 15 min", zh: "15分钟后", es: "En 15 min" },
    statusType: "soon",
    desc: { ar: "جلسة عن التحول الرقمي، ودور التقنية في تطوير الخدمات، وأثر الحلول الذكية على الحياة اليومية.", en: "Session on digital transformation, technology's role in service development, and smart solutions' impact on daily life.", zh: "关于数字化转型、技术在服务发展中的作用以及智能解决方案对日常生活影响的会议。", es: "Sesión sobre transformación digital, el rol de la tecnología y el impacto de soluciones inteligentes." },
    mapTarget: "mainStage",
  },
  {
    id: 3,
    title: { ar: "كيف تسهّل الخدمات الرقمية حياة الأفراد؟", en: "How Digital Services Simplify Lives?", zh: "数字服务如何简化生活？", es: "¿Cómo simplifican la vida los servicios digitales?" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٦:١٥ م – ٧:٠٠ م", en: "6:15 PM – 7:00 PM", zh: "下午6:15 – 7:00", es: "6:15 PM – 7:00 PM" },
    status: { ar: "بعد ساعة و15 دقيقة", en: "In 1h 15min", zh: "1小时15分钟后", es: "En 1h 15min" },
    statusType: "later",
    desc: { ar: "عرض يوضح أمثلة تطبيقية للخدمات الرقمية مع شرح مبسط وتفاعل مع الجمهور.", en: "Presentation showing practical examples of digital services with simplified explanation and audience interaction.", zh: "展示数字服务的实际案例，简单讲解并与观众互动。", es: "Presentación con ejemplos prácticos de servicios digitales e interacción con el público." },
    mapTarget: "mainStage",
  },
  {
    id: 4,
    title: { ar: "الابتكار في تجربة المستخدم", en: "Innovation in User Experience", zh: "用户体验创新", es: "Innovación en experiencia de usuario" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٧:١٥ م – ٨:٠٠ م", en: "7:15 PM – 8:00 PM", zh: "下午7:15 – 8:00", es: "7:15 PM – 8:00 PM" },
    status: { ar: "بعد ساعتين و15 دقيقة", en: "In 2h 15min", zh: "2小时15分钟后", es: "En 2h 15min" },
    statusType: "later",
    desc: { ar: "ورشة مصغرة عن بناء الخدمات الرقمية بطريقة سهلة وواضحة.", en: "Mini workshop on building digital services in a simple and clear way.", zh: "关于以简单清晰方式构建数字服务的迷你工作坊。", es: "Mini taller sobre construcción de servicios digitales de forma clara." },
    mapTarget: "mainStage",
  },
  {
    id: 5,
    title: { ar: "التقنية والذكاء الاصطناعي في الخدمات", en: "Technology and AI in Services", zh: "技术与人工智能在服务中的应用", es: "Tecnología e IA en los servicios" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٨:١٥ م – ٩:٠٠ م", en: "8:15 PM – 9:00 PM", zh: "下午8:15 – 9:00", es: "8:15 PM – 9:00 PM" },
    status: { ar: "بعد 3 ساعات و15 دقيقة", en: "In 3h 15min", zh: "3小时15分钟后", es: "En 3h 15min" },
    statusType: "later",
    desc: { ar: "جلسة حوارية عن استخدام الذكاء الاصطناعي ومستقبل التقنية في الجهات والشركات.", en: "Panel discussion on AI usage and the future of technology in organizations.", zh: "关于人工智能使用和组织中技术未来的小组讨论。", es: "Panel sobre el uso de IA y el futuro de la tecnología en organizaciones." },
    mapTarget: "mainStage",
  },
  {
    id: 6,
    title: { ar: "مسابقة تفاعلية مباشرة", en: "Live Interactive Contest", zh: "现场互动比赛", es: "Concurso interactivo en vivo" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "٩:١٥ م – ١٠:٠٠ م", en: "9:15 PM – 10:00 PM", zh: "下午9:15 – 10:00", es: "9:15 PM – 10:00 PM" },
    status: { ar: "بعد 4 ساعات و15 دقيقة", en: "In 4h 15min", zh: "4小时15分钟后", es: "En 4h 15min" },
    statusType: "later",
    desc: { ar: "مسابقة مباشرة تتضمن أسئلة تقنية بسيطة ومشاركة من الجمهور.", en: "Live contest with simple tech questions and audience participation.", zh: "包含简单技术问题和观众参与的现场比赛。", es: "Concurso en vivo con preguntas técnicas simples y participación del público." },
    mapTarget: "mainStage",
  },
  {
    id: 7,
    title: { ar: "الختام والتكريم", en: "Closing & Awards", zh: "闭幕与颁奖", es: "Clausura y premios" },
    location: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
    time: { ar: "١٠:١٥ م – ١٠:٤٥ م", en: "10:15 PM – 10:45 PM", zh: "下午10:15 – 10:45", es: "10:15 PM – 10:45 PM" },
    status: { ar: "بعد 5 ساعات و15 دقيقة", en: "In 5h 15min", zh: "5小时15分钟后", es: "En 5h 15min" },
    statusType: "later",
    desc: { ar: "ختام الفعالية مع شكر المشاركين وتكريم الضيوف.", en: "Event closing with thanking participants and honoring guests.", zh: "活动闭幕，感谢参与者并表彰嘉宾。", es: "Clausura del evento con agradecimiento a participantes y honores a invitados." },
    mapTarget: "mainStage",
  },
];

const statusStyles = {
  ended: "bg-muted text-muted-foreground",
  soon: "bg-event-soon text-primary-foreground",
  later: "bg-secondary/20 text-secondary",
};

interface EventsListProps {
  searchQuery?: string;
}

const EventsList = ({ searchQuery }: EventsListProps) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleNavigate = (target: string) => {
    navigate(`/map?target=${target}`);
  };

  const q = (searchQuery || "").toLowerCase();
  const filtered = stageEvents.filter((e) => {
    if (!q) return true;
    return e.title[lang].toLowerCase().includes(q) || e.desc[lang].toLowerCase().includes(q) || e.location[lang].toLowerCase().includes(q);
  }).sort((a, b) => {
    const order = { soon: 0, later: 1, ended: 2 };
    return order[a.statusType] - order[b.statusType];
  });

  const renderCard = (event: StageEvent, full = false) => (
    <div
      key={event.id}
      className={`${full ? "" : "w-[200px] shrink-0"} flex flex-col rounded-2xl border bg-card/40 backdrop-blur-sm p-3 shadow-md transition-all ${
        event.statusType === "ended" ? "opacity-50 border-border" : "border-secondary/20"
      }`}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${statusStyles[event.statusType]}`}>
          {event.statusType !== "ended" && (
            <span className="inline-block h-1 w-1 rounded-full bg-current animate-pulse me-1" />
          )}
          {event.status[lang]}
        </span>
      </div>
      <h3 className="text-xs font-bold text-foreground leading-tight min-h-[2rem] line-clamp-2">{event.title[lang]}</h3>
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3 text-secondary/70" />
          <span className="truncate">{event.location[lang]}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3 text-muted-foreground/50" />
          <span>{event.time[lang]}</span>
        </div>
      </div>
      {full && <p className="mt-1.5 text-[11px] text-muted-foreground line-clamp-2">{event.desc[lang]}</p>}
      {event.statusType !== "ended" ? (
        <button
          onClick={() => handleNavigate(event.mapTarget)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-black shadow-[0_4px_15px_rgba(0,243,255,0.2)]"
          style={{ background: "var(--gradient-cta)" }}
        >
          <Navigation className="h-3.5 w-3.5 fill-current" />
          وجّهني
        </button>
      ) : (
        <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-muted/50 py-2 text-xs font-bold text-muted-foreground">
          {event.status[lang]}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setShowAll(true)} className="text-xs font-semibold text-secondary hover:underline">
            {filtered.length > 0 ? `عرض الكل (${filtered.length})` : ""}
          </button>
          <div className="text-end">
            <h2 className="text-sm font-bold text-foreground">فعاليات المسرح</h2>
            <p className="text-[10px] text-muted-foreground">الجدول الزمني للمسرح الرئيسي</p>
          </div>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-3 no-scrollbar scroll-smooth">
          {filtered.map((e) => renderCard(e))}
        </div>
      </div>

      {showAll && (
        <div className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-xl overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 pt-10 pb-4 bg-background/80 backdrop-blur-md border-b border-border/30">
            <button onClick={() => setShowAll(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
              <X className="h-4 w-4" />
            </button>
            <h1 className="text-base font-bold text-foreground">جميع فعاليات المسرح</h1>
            <div className="w-8" />
          </div>
          <div className="px-4 py-4 space-y-3 pb-20">
            {filtered.map((e) => renderCard(e, true))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsList;
