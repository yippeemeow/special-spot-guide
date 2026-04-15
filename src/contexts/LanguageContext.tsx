import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en" | "zh" | "es";

interface Translations {
  [key: string]: Record<Language, string>;
}

const translations: Translations = {
  appName: { ar: "مسارك", en: "MASARK", zh: "玛萨克", es: "MASARK" },
  appTagline: { ar: "دليلك للفعاليات", en: "Your Event Guide", zh: "您的活动指南", es: "Tu guía de eventos" },
  eventSubtitle: { ar: "فعالية علم للابتكار الرقمي", en: "Elm Digital Innovation Event", zh: "Elm数字创新活动", es: "Evento de Innovación Digital Elm" },
  welcome: { ar: "مرحبًا بك في فعالية علم · ٤:٠٠ م – ١١:٠٠ م", en: "Welcome to Elm Event · 4:00 PM – 11:00 PM", zh: "欢迎参加Elm活动 · 下午4:00 – 晚上11:00", es: "Bienvenido al evento Elm · 4:00 PM – 11:00 PM" },
  searchPlaceholder: { ar: "ابحث عن فعالية، بوث، خدمة، أو موقع...", en: "Search events, booths, services, or locations...", zh: "搜索活动、展位、服务或地点...", es: "Buscar eventos, stands, servicios o ubicaciones..." },
  all: { ar: "الكل", en: "All", zh: "全部", es: "Todo" },
  stage: { ar: "المسرح", en: "Stage", zh: "舞台", es: "Escenario" },
  booths: { ar: "البوثات", en: "Booths", zh: "展位", es: "Stands" },
  kids: { ar: "الأطفال", en: "Kids", zh: "儿童", es: "Niños" },
  restaurants: { ar: "المطاعم", en: "Restaurants", zh: "餐厅", es: "Restaurantes" },
  services: { ar: "الخدمات", en: "Services", zh: "服务", es: "Servicios" },
  venueMap: { ar: "خريطة الفعالية", en: "Venue Map", zh: "场地地图", es: "Mapa del lugar" },
  exploreLocations: { ar: "استكشف المواقع والمسارات", en: "Explore locations and routes", zh: "探索地点和路线", es: "Explorar ubicaciones y rutas" },
  currentEvents: { ar: "الفعاليات الجارية الآن", en: "Current Events", zh: "当前活动", es: "Eventos actuales" },
  nearbyEventsSubtitle: { ar: "الفعاليات القريبة لك", en: "Events near you", zh: "您附近的活动", es: "Eventos cerca de ti" },
  viewAll: { ar: "عرض الكل", en: "View All", zh: "查看全部", es: "Ver todo" },
  startRoute: { ar: "وجّهني", en: "Navigate", zh: "导航", es: "Navegar" },
  navigate: { ar: "وجّهني", en: "Navigate", zh: "导航", es: "Navegar" },
  now: { ar: "الآن", en: "Now", zh: "现在", es: "Ahora" },
  ended: { ar: "خلصت", en: "Ended", zh: "已结束", es: "Finalizado" },
  home: { ar: "الرئيسية", en: "Home", zh: "首页", es: "Inicio" },
  map: { ar: "الخريطة", en: "Map", zh: "地图", es: "Mapa" },
  settings: { ar: "الإعدادات", en: "Settings", zh: "设置", es: "Ajustes" },
  myLocation: { ar: "موقعي", en: "My Location", zh: "我的位置", es: "Mi ubicación" },
  information: { ar: "الاستعلامات", en: "Information", zh: "咨询处", es: "Información" },
  mainStage: { ar: "المسرح الرئيسي", en: "Main Stage", zh: "主舞台", es: "Escenario principal" },
  childrenArea: { ar: "منطقة الأطفال", en: "Children's Area", zh: "儿童区", es: "Área infantil" },
  restaurantArea: { ar: "منطقة المطاعم", en: "Restaurant Area", zh: "餐饮区", es: "Zona de restaurantes" },
  youAreHere: { ar: "أنت هنا", en: "You are here", zh: "您在这里", es: "Estás aquí" },
  mainEntrance: { ar: "المدخل الرئيسي", en: "Main Entrance", zh: "主入口", es: "Entrada principal" },
  digitalSolutions: { ar: "بوث الحلول الرقمية", en: "Digital Solutions", zh: "数字解决方案", es: "Soluciones digitales" },
  dataSecurity: { ar: "بوث البيانات والأمن", en: "Data & Security", zh: "数据与安全", es: "Datos y seguridad" },
  innovationUX: { ar: "بوث الابتكار والتجربة", en: "Innovation & UX", zh: "创新与用户体验", es: "Innovación y UX" },
  techFuture: { ar: "بوث المستقبل التقني", en: "Tech Future", zh: "技术未来", es: "Futuro tecnológico" },
  firstAid: { ar: "الإسعافات الأولية", en: "First Aid", zh: "急救站", es: "Primeros auxilios" },
  menRestroom: { ar: "دورة مياه رجال", en: "Men's Restroom", zh: "男洗手间", es: "Baño de hombres" },
  womenRestroom: { ar: "دورة مياه نساء", en: "Women's Restroom", zh: "女洗手间", es: "Baño de mujeres" },
  menPrayer: { ar: "مصلى رجال", en: "Men's Prayer", zh: "男祈祷室", es: "Sala de oración hombres" },
  womenPrayer: { ar: "مصلى نساء", en: "Women's Prayer", zh: "女祈祷室", es: "Sala de oración mujeres" },
  childrenActivities: { ar: "فعاليات الأطفال", en: "Children's Activities", zh: "儿童活动", es: "Actividades infantiles" },
  open: { ar: "مفتوح", en: "Open", zh: "营业中", es: "Abierto" },
  crowdRadar: { ar: "📡 رادار الحشود", en: "📡 Crowd Radar", zh: "📡 人群雷达", es: "📡 Radar de multitud" },
  crowdLegend: { ar: "مستوى الازدحام", en: "Crowd Level", zh: "拥挤程度", es: "Nivel de multitud" },
  crowdLow: { ar: "غير مزدحم", en: "Low", zh: "低", es: "Bajo" },
  crowdMedium: { ar: "متوسط", en: "Medium", zh: "中等", es: "Medio" },
  crowdHigh: { ar: "مزدحم جدًا", en: "Crowded", zh: "拥挤", es: "Lleno" },
  chatAssistant: { ar: "المساعد الذكي", en: "Smart Assistant", zh: "智能助手", es: "Asistente inteligente" },
  chatPlaceholder: { ar: "اكتب سؤالك هنا...", en: "Type your question...", zh: "在这里输入您的问题...", es: "Escribe tu pregunta..." },
  allEvents: { ar: "جميع الفعاليات", en: "All Events", zh: "所有活动", es: "Todos los eventos" },
  language: { ar: "اللغة", en: "Language", zh: "语言", es: "Idioma" },
  ageRange: { ar: "العمر", en: "Age", zh: "年龄", es: "Edad" },
  reception: { ar: "الاستقبال", en: "Reception", zh: "接待处", es: "Recepción" },
  navigating: { ar: "جاري التوجيه...", en: "Navigating...", zh: "导航中...", es: "Navegando..." },
  howFar: { ar: "كم تبعد عني", en: "How far", zh: "距离多远", es: "Qué tan lejos" },
  boothArea: { ar: "منطقة البوثات", en: "Booths Area", zh: "展位区", es: "Zona de stands" },
  serviceArea: { ar: "منطقة الخدمات", en: "Services Area", zh: "服务区", es: "Zona de servicios" },
  workshops: { ar: "الورش", en: "Workshops", zh: "工作坊", es: "Talleres" },
  pathToDestination: { ar: "مسار الوصول", en: "Route path", zh: "到达路线", es: "Ruta" },
  noResults: { ar: "لا توجد نتائج", en: "No results", zh: "没有结果", es: "Sin resultados" },
};

const langLabels: Record<Language, string> = {
  ar: "العربية",
  en: "English",
  zh: "中文",
  es: "Español",
};

const rtlLangs: Language[] = ["ar"];

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  langLabels: Record<Language, string>;
  allLangs: Language[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("ar");

  const toggleLang = () => {
    const langs: Language[] = ["ar", "en", "zh", "es"];
    const idx = langs.indexOf(lang);
    setLang(langs[(idx + 1) % langs.length]);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[key]?.[lang] || translations[key]?.["ar"] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
  const isRTL = rtlLangs.includes(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL, langLabels, allLangs: ["ar", "en", "zh", "es"] }}>
      <div dir={isRTL ? "rtl" : "ltr"} className="font-cairo">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
