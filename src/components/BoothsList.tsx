import { useState } from "react";
import { Navigation, Clock, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface Workshop {
  id: string;
  title: { ar: string; en: string; zh: string; es: string };
  time: { ar: string; en: string; zh: string; es: string };
  status: { ar: string; en: string; zh: string; es: string };
  desc: { ar: string; en: string; zh: string; es: string };
  capacity: number;
  registered: number;
}

interface Booth {
  id: number;
  title: { ar: string; en: string; zh: string; es: string };
  time: { ar: string; en: string; zh: string; es: string };
  desc: { ar: string; en: string; zh: string; es: string };
  mapTarget: string;
  workshops: Workshop[];
}

const boothsData: Booth[] = [
  {
    id: 1,
    title: { ar: "بوث الحلول الرقمية", en: "Digital Solutions Booth", zh: "数字解决方案展位", es: "Stand de soluciones digitales" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    desc: { ar: "يعرّف الزوار بالحلول الرقمية الذكية التي تساعد في تسهيل الإجراءات والخدمات.", en: "Introduces visitors to smart digital solutions that simplify procedures and services.", zh: "向访客介绍简化流程和服务的智能数字解决方案。", es: "Presenta soluciones digitales inteligentes que simplifican procedimientos y servicios." },
    mapTarget: "digitalSolutions",
    workshops: [
      { id: "w1", title: { ar: "ورشة التحول الرقمي", en: "Digital Transformation Workshop", zh: "数字化转型工作坊", es: "Taller de transformación digital" }, time: { ar: "٥:٣٠ م – ٦:٠٠ م", en: "5:30 PM – 6:00 PM", zh: "下午5:30 – 6:00", es: "5:30 PM – 6:00 PM" }, status: { ar: "بعد 30 دقيقة", en: "In 30 min", zh: "30分钟后", es: "En 30 min" }, desc: { ar: "ورشة قصيرة تشرح كيف تسهّل الحلول الرقمية الإجراءات والخدمات.", en: "Short workshop explaining how digital solutions simplify procedures.", zh: "简短工作坊，讲解数字解决方案如何简化流程。", es: "Taller corto sobre cómo las soluciones digitales simplifican procedimientos." } },
      { id: "w2", title: { ar: "ورشة الخدمات الذكية", en: "Smart Services Workshop", zh: "智能服务工作坊", es: "Taller de servicios inteligentes" }, time: { ar: "٧:٠٠ م – ٧:٣٠ م", en: "7:00 PM – 7:30 PM", zh: "下午7:00 – 7:30", es: "7:00 PM – 7:30 PM" }, status: { ar: "بعد ساعتين", en: "In 2h", zh: "2小时后", es: "En 2h" }, desc: { ar: "شرح مبسط للخدمات الذكية وكيفية الاستفادة منها.", en: "Simple explanation of smart services and how to benefit from them.", zh: "简单讲解智能服务及其使用方法。", es: "Explicación sencilla de servicios inteligentes y cómo aprovecharlos." } },
    ],
  },
  {
    id: 2,
    title: { ar: "بوث البيانات والأمن الرقمي", en: "Data & Digital Security Booth", zh: "数据与数字安全展位", es: "Stand de datos y seguridad digital" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    desc: { ar: "يركز على حماية البيانات، الأمن السيبراني، والخصوصية الرقمية.", en: "Focuses on data protection, cybersecurity, and digital privacy.", zh: "专注于数据保护、网络安全和数字隐私。", es: "Se enfoca en protección de datos, ciberseguridad y privacidad digital." },
    mapTarget: "dataSecurity",
    workshops: [
      { id: "w3", title: { ar: "ورشة الأمن السيبراني", en: "Cybersecurity Workshop", zh: "网络安全工作坊", es: "Taller de ciberseguridad" }, time: { ar: "٦:٠٠ م – ٦:٣٠ م", en: "6:00 PM – 6:30 PM", zh: "下午6:00 – 6:30", es: "6:00 PM – 6:30 PM" }, status: { ar: "بعد ساعة", en: "In 1h", zh: "1小时后", es: "En 1h" }, desc: { ar: "ورشة تعريفية عن الأمن السيبراني وأساسيات حماية البيانات.", en: "Introductory workshop on cybersecurity and data protection basics.", zh: "网络安全和数据保护基础介绍工作坊。", es: "Taller introductorio sobre ciberseguridad y protección de datos." } },
      { id: "w4", title: { ar: "ورشة الخصوصية الرقمية", en: "Digital Privacy Workshop", zh: "数字隐私工作坊", es: "Taller de privacidad digital" }, time: { ar: "٨:٠٠ م – ٨:٣٠ م", en: "8:00 PM – 8:30 PM", zh: "下午8:00 – 8:30", es: "8:00 PM – 8:30 PM" }, status: { ar: "بعد 3 ساعات", en: "In 3h", zh: "3小时后", es: "En 3h" }, desc: { ar: "توعية الزوار بأهمية الخصوصية الرقمية والاستخدام الآمن للتقنية.", en: "Raising visitors' awareness about digital privacy and safe technology use.", zh: "提高访客对数字隐私和安全使用技术的意识。", es: "Concienciar a los visitantes sobre la privacidad digital y el uso seguro de la tecnología." } },
    ],
  },
  {
    id: 3,
    title: { ar: "بوث الابتكار وتجربة المستخدم", en: "Innovation & UX Booth", zh: "创新与用户体验展位", es: "Stand de innovación y UX" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    desc: { ar: "يوضح كيف يتم تصميم خدمات رقمية سهلة ومناسبة لاحتياجات المستخدمين.", en: "Shows how to design easy digital services that meet user needs.", zh: "展示如何设计满足用户需求的简便数字服务。", es: "Muestra cómo diseñar servicios digitales fáciles que satisfagan las necesidades del usuario." },
    mapTarget: "innovationUX",
    workshops: [
      { id: "w5", title: { ar: "ورشة تصميم تجربة المستخدم", en: "UX Design Workshop", zh: "用户体验设计工作坊", es: "Taller de diseño UX" }, time: { ar: "٥:٤٥ م – ٦:١٥ م", en: "5:45 PM – 6:15 PM", zh: "下午5:45 – 6:15", es: "5:45 PM – 6:15 PM" }, status: { ar: "بعد 45 دقيقة", en: "In 45 min", zh: "45分钟后", es: "En 45 min" }, desc: { ar: "ورشة عن تصميم الخدمات الرقمية بطريقة سهلة وواضحة للمستخدم.", en: "Workshop on designing digital services in a simple and clear way.", zh: "关于以简单清晰方式设计数字服务的工作坊。", es: "Taller sobre diseño de servicios digitales de forma clara y sencilla." } },
      { id: "w6", title: { ar: "ورشة الابتكار في الواجهات", en: "Interface Innovation Workshop", zh: "界面创新工作坊", es: "Taller de innovación en interfaces" }, time: { ar: "٧:٤٥ م – ٨:١٥ م", en: "7:45 PM – 8:15 PM", zh: "下午7:45 – 8:15", es: "7:45 PM – 8:15 PM" }, status: { ar: "بعد ساعتين و45 دقيقة", en: "In 2h 45min", zh: "2小时45分钟后", es: "En 2h 45min" }, desc: { ar: "عرض عملي لأفكار مبتكرة في تصميم الواجهات الرقمية.", en: "Practical showcase of innovative ideas in digital interface design.", zh: "数字界面设计中创新理念的实践展示。", es: "Muestra práctica de ideas innovadoras en diseño de interfaces digitales." } },
    ],
  },
  {
    id: 4,
    title: { ar: "بوث المستقبل التقني", en: "Tech Future Booth", zh: "技术未来展位", es: "Stand del futuro tecnológico" },
    time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" },
    desc: { ar: "يستعرض تقنيات مستقبلية مثل الذكاء الاصطناعي والأنظمة الذكية.", en: "Showcases future technologies like AI and smart systems.", zh: "展示人工智能和智能系统等未来技术。", es: "Muestra tecnologías futuras como IA y sistemas inteligentes." },
    mapTarget: "techFuture",
    workshops: [
      { id: "w7", title: { ar: "ورشة الذكاء الاصطناعي", en: "AI Workshop", zh: "人工智能工作坊", es: "Taller de inteligencia artificial" }, time: { ar: "٥:١٥ م – ٥:٤٥ م", en: "5:15 PM – 5:45 PM", zh: "下午5:15 – 5:45", es: "5:15 PM – 5:45 PM" }, status: { ar: "بعد 15 دقيقة", en: "In 15 min", zh: "15分钟后", es: "En 15 min" }, desc: { ar: "ورشة تعريفية عن الذكاء الاصطناعي واستخداماته في الخدمات الرقمية.", en: "Introductory workshop on AI and its uses in digital services.", zh: "关于人工智能及其在数字服务中应用的介绍工作坊。", es: "Taller introductorio sobre IA y sus usos en servicios digitales." } },
      { id: "w8", title: { ar: "ورشة الأنظمة الذكية", en: "Smart Systems Workshop", zh: "智能系统工作坊", es: "Taller de sistemas inteligentes" }, time: { ar: "٨:٣٠ م – ٩:٠٠ م", en: "8:30 PM – 9:00 PM", zh: "下午8:30 – 9:00", es: "8:30 PM – 9:00 PM" }, status: { ar: "بعد 3 ساعات و30 دقيقة", en: "In 3h 30min", zh: "3小时30分钟后", es: "En 3h 30min" }, desc: { ar: "شرح مبسط للأنظمة الذكية ودورها في تحسين الخدمات.", en: "Simple explanation of smart systems and their role in improving services.", zh: "简单讲解智能系统及其在改善服务中的作用。", es: "Explicación sencilla de sistemas inteligentes y su papel en mejorar servicios." } },
    ],
  },
];

const BoothsList = ({ searchQuery }: { searchQuery?: string }) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [expandedBooth, setExpandedBooth] = useState<number | null>(null);
  const q = (searchQuery || "").toLowerCase();

  const filtered = boothsData.filter((b) => {
    if (!q) return true;
    const boothMatch = b.title[lang].toLowerCase().includes(q) || b.desc[lang].toLowerCase().includes(q);
    const workshopMatch = b.workshops.some((w) => w.title[lang].toLowerCase().includes(q) || w.desc[lang].toLowerCase().includes(q));
    return boothMatch || workshopMatch;
  });

  const handleNavigate = (target: string) => {
    navigate(`/map?target=${target}`);
  };

  return (
    <div className="mt-4 px-4">
      <h2 className="mb-2 text-sm font-bold text-foreground text-end">البوثات</h2>
      <div className="space-y-3">
        {filtered.map((booth) => (
          <div key={booth.id} className="rounded-2xl border border-secondary/20 bg-card/40 backdrop-blur-sm p-3 shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="rounded-full px-2 py-0.5 text-[8px] font-bold bg-secondary text-secondary-foreground glow-cyan">
                <span className="inline-block h-1 w-1 rounded-full bg-secondary-foreground animate-pulse me-1" />
                الآن
              </span>
            </div>
            <h3 className="text-xs font-bold text-foreground">{booth.title[lang]}</h3>
            <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{booth.desc[lang]}</p>
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3 text-muted-foreground/50" />
              <span>{booth.time[lang]}</span>
            </div>

            <button
              onClick={() => handleNavigate(booth.mapTarget)}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-black shadow-[0_4px_15px_rgba(0,243,255,0.2)]"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Navigation className="h-3.5 w-3.5 fill-current" />
              وجّهني
            </button>

            {booth.workshops.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => setExpandedBooth(expandedBooth === booth.id ? null : booth.id)}
                  className="flex w-full items-center justify-between text-[11px] font-semibold text-secondary"
                >
                  <span>{expandedBooth === booth.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</span>
                  <span>الورش التابعة ({booth.workshops.length})</span>
                </button>

                {expandedBooth === booth.id && (
                  <div className="mt-2 space-y-2">
                    {booth.workshops.map((w) => (
                      <div key={w.id} className="rounded-xl border border-secondary/10 bg-background/50 p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold bg-secondary/20 text-secondary">
                            {w.status[lang]}
                          </span>
                          <h4 className="text-[11px] font-bold text-foreground">{w.title[lang]}</h4>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-end">{w.desc[lang]}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[9px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          <span>{w.time[lang]}</span>
                        </div>
                        <button
                          onClick={() => handleNavigate(booth.mapTarget)}
                          className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold text-black"
                          style={{ background: "var(--gradient-cta)" }}
                        >
                          <Navigation className="h-3 w-3 fill-current" />
                          وجّهني
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoothsList;
