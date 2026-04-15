import { Navigation, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface KidsActivity {
  id: number;
  title: { ar: string; en: string; zh: string; es: string };
  age: { ar: string; en: string; zh: string; es: string };
  time: { ar: string; en: string; zh: string; es: string };
  status: { ar: string; en: string; zh: string; es: string };
  statusType: "ended" | "soon" | "later";
  desc: { ar: string; en: string; zh: string; es: string };
}

const activities: KidsActivity[] = [
  {
    id: 1,
    title: { ar: "فعالية التلوين التقني", en: "Tech Coloring Activity", zh: "科技涂色活动", es: "Actividad de colorear tecnológica" },
    age: { ar: "٤–٨ سنوات", en: "4–8 years", zh: "4–8岁", es: "4–8 años" },
    time: { ar: "٤:٠٠ م – ٥:٠٠ م", en: "4:00 PM – 5:00 PM", zh: "下午4:00 – 5:00", es: "4:00 PM – 5:00 PM" },
    status: { ar: "خلصت", en: "Ended", zh: "已结束", es: "Finalizado" },
    statusType: "ended",
    desc: { ar: "نشاط تلوين للأطفال برسومات مرتبطة بالروبوتات والتقنية.", en: "Coloring activity for kids with robot and tech-themed drawings.", zh: "以机器人和科技为主题的儿童涂色活动。", es: "Actividad de colorear para niños con dibujos de robots y tecnología." },
  },
  {
    id: 2,
    title: { ar: "نشاط تركيب وبناء", en: "Building & Assembly", zh: "搭建与组装活动", es: "Actividad de construcción" },
    age: { ar: "٦–١٠ سنوات", en: "6–10 years", zh: "6–10岁", es: "6–10 años" },
    time: { ar: "٥:١٥ م – ٦:٠٠ م", en: "5:15 PM – 6:00 PM", zh: "下午5:15 – 6:00", es: "5:15 PM – 6:00 PM" },
    status: { ar: "بعد 15 دقيقة", en: "In 15 min", zh: "15分钟后", es: "En 15 min" },
    statusType: "soon",
    desc: { ar: "نشاط تفاعلي يعتمد على ألعاب التركيب والتحديات البسيطة لتنمية التفكير.", en: "Interactive activity with building games and simple challenges to develop thinking.", zh: "互动活动，通过搭建游戏和简单挑战培养思维能力。", es: "Actividad interactiva con juegos de construcción y desafíos simples." },
  },
  {
    id: 3,
    title: { ar: "ورشة الأطفال: التقنية ببساطة", en: "Kids Workshop: Tech Simply", zh: "儿童工作坊：简单技术", es: "Taller infantil: Tecnología simple" },
    age: { ar: "٧–١٢ سنة", en: "7–12 years", zh: "7–12岁", es: "7–12 años" },
    time: { ar: "٦:١٥ م – ٧:٠٠ م", en: "6:15 PM – 7:00 PM", zh: "下午6:15 – 7:00", es: "6:15 PM – 7:00 PM" },
    status: { ar: "بعد ساعة و15 دقيقة", en: "In 1h 15min", zh: "1小时15分钟后", es: "En 1h 15min" },
    statusType: "later",
    desc: { ar: "ورشة مبسطة تعرّف الأطفال بمفهوم التقنية من خلال أنشطة وأسئلة تفاعلية.", en: "Simple workshop introducing kids to technology concepts through activities and interactive questions.", zh: "通过活动和互动问题向儿童介绍技术概念的简单工作坊。", es: "Taller sencillo que introduce a los niños a conceptos tecnológicos con actividades interactivas." },
  },
  {
    id: 4,
    title: { ar: "مسابقة أطفال", en: "Kids Contest", zh: "儿童比赛", es: "Concurso infantil" },
    age: { ar: "٤–٨ سنوات", en: "4–8 years", zh: "4–8岁", es: "4–8 años" },
    time: { ar: "٧:١٥ م – ٨:٠٠ م", en: "7:15 PM – 8:00 PM", zh: "下午7:15 – 8:00", es: "7:15 PM – 8:00 PM" },
    status: { ar: "بعد ساعتين و15 دقيقة", en: "In 2h 15min", zh: "2小时15分钟后", es: "En 2h 15min" },
    statusType: "later",
    desc: { ar: "مسابقة خفيفة تضم أسئلة وألعاب جماعية مناسبة للأطفال.", en: "Light contest with questions and group games suitable for kids.", zh: "轻松的比赛，包含适合儿童的问题和团体游戏。", es: "Concurso ligero con preguntas y juegos grupales para niños." },
  },
  {
    id: 5,
    title: { ar: "ركن الرسم الحر", en: "Free Drawing Corner", zh: "自由绘画角", es: "Rincón de dibujo libre" },
    age: { ar: "٤–١٠ سنوات", en: "4–10 years", zh: "4–10岁", es: "4–10 años" },
    time: { ar: "٨:١٥ م – ٩:٠٠ م", en: "8:15 PM – 9:00 PM", zh: "下午8:15 – 9:00", es: "8:15 PM – 9:00 PM" },
    status: { ar: "بعد 3 ساعات و15 دقيقة", en: "In 3h 15min", zh: "3小时15分钟后", es: "En 3h 15min" },
    statusType: "later",
    desc: { ar: "مساحة مفتوحة للرسم والتلوين باستخدام أدوات ولوحات مخصصة للأطفال.", en: "Open space for drawing and coloring with tools and boards for kids.", zh: "为儿童提供绘画和涂色工具及画板的开放空间。", es: "Espacio abierto para dibujar y colorear con herramientas para niños." },
  },
  {
    id: 6,
    title: { ar: "النشاط التفاعلي الختامي للأطفال", en: "Kids Closing Activity", zh: "儿童闭幕互动活动", es: "Actividad de cierre infantil" },
    age: { ar: "٤–١٠ سنوات", en: "4–10 years", zh: "4–10岁", es: "4–10 años" },
    time: { ar: "٩:١٥ م – ١٠:٠٠ م", en: "9:15 PM – 10:00 PM", zh: "下午9:15 – 10:00", es: "9:15 PM – 10:00 PM" },
    status: { ar: "بعد 4 ساعات و15 دقيقة", en: "In 4h 15min", zh: "4小时15分钟后", es: "En 4h 15min" },
    statusType: "later",
    desc: { ar: "نشاط ختامي جماعي يتضمن ألعابًا خفيفة وصورًا تذكارية للأطفال.", en: "Group closing activity with light games and souvenir photos for kids.", zh: "集体闭幕活动，包含轻松游戏和儿童纪念照片。", es: "Actividad grupal de cierre con juegos ligeros y fotos de recuerdo." },
  },
];

const statusStyles = {
  ended: "bg-muted text-muted-foreground",
  soon: "bg-event-soon text-primary-foreground",
  later: "bg-secondary/20 text-secondary",
};

const ChildrenActivities = ({ searchQuery }: { searchQuery?: string }) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const q = (searchQuery || "").toLowerCase();

  const filtered = activities.filter((a) => {
    if (!q) return true;
    return a.title[lang].toLowerCase().includes(q) || a.desc[lang].toLowerCase().includes(q);
  });

  const handleNavigate = () => {
    navigate("/map?target=childrenArea");
  };

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-3 text-lg font-bold text-foreground text-end">فعاليات الأطفال</h2>
      <div className="space-y-3">
        {filtered.map((a) => (
          <div key={a.id} className={`rounded-2xl border border-secondary/20 bg-card p-4 shadow-sm ${a.statusType === "ended" ? "opacity-50" : ""}`}>
            <div className="flex items-start justify-between">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[a.statusType]}`}>
                {a.statusType !== "ended" && <span className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse me-1" />}
                {a.status[lang]}
              </span>
              <h3 className="text-sm font-bold text-foreground">{a.title[lang]}</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground text-end">{a.desc[lang]}</p>
            <div className="mt-2 flex justify-end">
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-event-soon/15 text-event-soon border border-event-soon/20">
                👶 {a.age[lang]}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-end gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{a.time[lang]}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{activities[0].title[lang] ? "منطقة الأطفال" : "Children's Area"}</span>
              </div>
            </div>
            {a.statusType !== "ended" && (
              <button
                onClick={handleNavigate}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-black transition-all hover:opacity-90"
                style={{ background: "var(--gradient-cta)" }}
              >
                <Navigation className="h-4 w-4" />
                وجّهني
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildrenActivities;
