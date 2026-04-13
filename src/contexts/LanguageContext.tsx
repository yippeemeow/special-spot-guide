import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en" | "es" | "it" | "ur";

interface Translations {
  [key: string]: { ar: string; en: string; es: string; it: string; ur: string };
}

const translations: Translations = {
  appName: { ar: "مسارك", en: "MASARK", es: "MASARK", it: "MASARK", ur: "مسارک" },
  appTagline: { ar: "دليلك للفعاليات", en: "Your Event Guide", es: "Tu guía de eventos", it: "La tua guida agli eventi", ur: "آپ کا ایونٹ گائیڈ" },
  eventSubtitle: { ar: "فعالية علم للابتكار الرقمي", en: "Elm Digital Innovation Event", es: "Evento de Innovación Digital Elm", it: "Evento di Innovazione Digitale Elm", ur: "ایلم ڈیجیٹل انوویشن ایونٹ" },
  welcome: { ar: "مرحبًا بك في فعالية علم · ٤:٠٠ م – ١١:٠٠ م", en: "Welcome to Elm Event · 4:00 PM – 11:00 PM", es: "Bienvenido al evento Elm · 4:00 PM – 11:00 PM", it: "Benvenuto all'evento Elm · 4:00 PM – 11:00 PM", ur: "ایلم ایونٹ میں خوش آمدید · 4:00 PM – 11:00 PM" },
  searchPlaceholder: { ar: "ابحث عن فعالية، بوث، خدمة، أو موقع...", en: "Search events, booths, services, or locations...", es: "Buscar eventos, stands, servicios o ubicaciones...", it: "Cerca eventi, stand, servizi o luoghi...", ur: "ایونٹس، بوتھ، سروسز، یا مقامات تلاش کریں..." },
  all: { ar: "الكل", en: "All", es: "Todo", it: "Tutto", ur: "سب" },
  stage: { ar: "المسرح", en: "Stage", es: "Escenario", it: "Palco", ur: "اسٹیج" },
  booths: { ar: "البوثات", en: "Booths", es: "Stands", it: "Stand", ur: "بوتھ" },
  kids: { ar: "الأطفال", en: "Kids", es: "Niños", it: "Bambini", ur: "بچے" },
  restaurants: { ar: "المطاعم", en: "Restaurants", es: "Restaurantes", it: "Ristoranti", ur: "ریستوران" },
  services: { ar: "الخدمات", en: "Services", es: "Servicios", it: "Servizi", ur: "خدمات" },
  venueMap: { ar: "خريطة الفعالية", en: "Venue Map", es: "Mapa del lugar", it: "Mappa del luogo", ur: "مقام کا نقشہ" },
  exploreLocations: { ar: "استكشف المواقع والمسارات", en: "Explore locations and routes", es: "Explorar ubicaciones y rutas", it: "Esplora luoghi e percorsi", ur: "مقامات اور راستے دریافت کریں" },
  currentAndUpcoming: { ar: "الفعاليات الجارية والقادمة", en: "Current & Upcoming Events", es: "Eventos actuales y próximos", it: "Eventi attuali e prossimi", ur: "موجودہ اور آنے والے ایونٹس" },
  viewAll: { ar: "عرض الكل", en: "View All", es: "Ver todo", it: "Vedi tutto", ur: "سب دیکھیں" },
  startRoute: { ar: "ابدأ المسار", en: "Start Route", es: "Iniciar ruta", it: "Inizia percorso", ur: "راستہ شروع کریں" },
  navigate: { ar: "توجّه", en: "Navigate", es: "Navegar", it: "Naviga", ur: "نیویگیٹ" },
  discoverAreas: { ar: "اكتشف المناطق", en: "Discover Areas", es: "Descubrir áreas", it: "Scopri le aree", ur: "علاقے دریافت کریں" },
  now: { ar: "الآن", en: "Live", es: "En vivo", it: "In diretta", ur: "لائیو" },
  soon: { ar: "قريبًا", en: "Soon", es: "Pronto", it: "Presto", ur: "جلد" },
  ended: { ar: "انتهى", en: "Ended", es: "Finalizado", it: "Terminato", ur: "ختم" },
  home: { ar: "الرئيسية", en: "Home", es: "Inicio", it: "Home", ur: "ہوم" },
  events: { ar: "الفعاليات", en: "Events", es: "Eventos", it: "Eventi", ur: "ایونٹس" },
  map: { ar: "الخريطة", en: "Map", es: "Mapa", it: "Mappa", ur: "نقشہ" },
  settings: { ar: "الإعدادات", en: "Settings", es: "Ajustes", it: "Impostazioni", ur: "ترتیبات" },
  myLocation: { ar: "موقعي", en: "My Location", es: "Mi ubicación", it: "La mia posizione", ur: "میرا مقام" },
  event: { ar: "فعالية", en: "Event", es: "Evento", it: "Evento", ur: "ایونٹ" },
  service: { ar: "خدمة", en: "Service", es: "Servicio", it: "Servizio", ur: "سروس" },
  information: { ar: "الاستعلامات", en: "Information", es: "Información", it: "Informazioni", ur: "معلومات" },
  nearbyEvents: { ar: "الفعاليات القريبة", en: "Nearby Events", es: "Eventos cercanos", it: "Eventi vicini", ur: "قریبی ایونٹس" },
  mainStage: { ar: "المسرح الرئيسي", en: "Main Stage", es: "Escenario principal", it: "Palco principale", ur: "مین اسٹیج" },
  childrenArea: { ar: "منطقة الأطفال", en: "Children's Area", es: "Área infantil", it: "Area bambini", ur: "بچوں کا علاقہ" },
  restaurantArea: { ar: "منطقة المطاعم", en: "Restaurant Area", es: "Zona de restaurantes", it: "Area ristoranti", ur: "ریستوران ایریا" },
  openingCeremony: { ar: "الافتتاح الرسمي", en: "Opening Ceremony", es: "Ceremonia de apertura", it: "Cerimonia di apertura", ur: "افتتاحی تقریب" },
  openingDesc: { ar: "حفل الافتتاح الرسمي لفعالية علم للابتكار الرقمي", en: "Official opening ceremony of Elm Digital Innovation Event", es: "Ceremonia oficial de apertura del evento de innovación digital Elm", it: "Cerimonia ufficiale di apertura dell'evento di innovazione digitale Elm", ur: "ایلم ڈیجیٹل انوویشن ایونٹ کی سرکاری افتتاحی تقریب" },
  techColoring: { ar: "فعالية التلوين التقني", en: "Tech Coloring Activity", es: "Actividad de colorear tecnológica", it: "Attività di colorazione tecnologica", ur: "ٹیک کلرنگ سرگرمی" },
  techColoringDesc: { ar: "نشاط تلوين بأدوات تقنية مبتكرة", en: "Coloring activity with innovative tech tools", es: "Actividad de colorear con herramientas tecnológicas innovadoras", it: "Attività di colorazione con strumenti tecnologici innovativi", ur: "جدید ٹیکنالوجی ٹولز کے ساتھ کلرنگ سرگرمی" },
  digitalFuture: { ar: "مستقبل الحلول الرقمية في السعودية", en: "Future of Digital Solutions in KSA", es: "Futuro de las soluciones digitales en Arabia Saudita", it: "Futuro delle soluzioni digitali in Arabia Saudita", ur: "سعودی عرب میں ڈیجیٹل حل کا مستقبل" },
  digitalFutureDesc: { ar: "جلسة حوارية عن مستقبل الحلول الرقمية", en: "Panel discussion on the future of digital solutions", es: "Mesa redonda sobre el futuro de las soluciones digitales", it: "Tavola rotonda sul futuro delle soluzioni digitali", ur: "ڈیجیٹل حل کے مستقبل پر پینل ڈسکشن" },
  digitalServices: { ar: "كيف تسهّل الخدمات الرقمية حياة الأفراد؟", en: "How Digital Services Simplify Lives?", es: "¿Cómo simplifican la vida los servicios digitales?", it: "Come i servizi digitali semplificano la vita?", ur: "ڈیجیٹل خدمات زندگی کو کیسے آسان بناتی ہیں؟" },
  digitalServicesDesc: { ar: "عرض تفاعلي عن أثر الرقمنة", en: "Interactive presentation on digitization impact", es: "Presentación interactiva sobre el impacto de la digitalización", it: "Presentazione interattiva sull'impatto della digitalizzazione", ur: "ڈیجیٹائزیشن کے اثرات پر انٹرایکٹو پریزنٹیشن" },
  youAreHere: { ar: "أنت هنا", en: "You are here", es: "Estás aquí", it: "Sei qui", ur: "آپ یہاں ہیں" },
  mainEntrance: { ar: "المدخل الرئيسي", en: "Main Entrance", es: "Entrada principal", it: "Ingresso principale", ur: "مین داخلہ" },
  reception: { ar: "الاستقبال", en: "Reception", es: "Recepción", it: "Reception", ur: "استقبالیہ" },
  digitalSolutions: { ar: "بوث الحلول الرقمية", en: "Digital Solutions", es: "Soluciones digitales", it: "Soluzioni digitali", ur: "ڈیجیٹل سلوشنز" },
  dataSecurity: { ar: "بوث البيانات والأمن", en: "Data & Security", es: "Datos y seguridad", it: "Dati e sicurezza", ur: "ڈیٹا اور سیکیورٹی" },
  innovationUX: { ar: "بوث الابتكار والتجربة", en: "Innovation & UX", es: "Innovación y UX", it: "Innovazione e UX", ur: "انوویشن اور UX" },
  techFuture: { ar: "بوث المستقبل التقني", en: "Tech Future", es: "Futuro tecnológico", it: "Futuro tecnologico", ur: "ٹیک فیوچر" },
  firstAid: { ar: "الإسعافات الأولية", en: "First Aid", es: "Primeros auxilios", it: "Primo soccorso", ur: "ابتدائی طبی امداد" },
  menRestroom: { ar: "دورة مياه رجال", en: "Men's Restroom", es: "Baño de hombres", it: "Bagno uomini", ur: "مردانہ بیت الخلاء" },
  womenRestroom: { ar: "دورة مياه نساء", en: "Women's Restroom", es: "Baño de mujeres", it: "Bagno donne", ur: "خواتین بیت الخلاء" },
  menPrayer: { ar: "مصلى رجال", en: "Men's Prayer", es: "Sala de oración hombres", it: "Sala preghiera uomini", ur: "مردانہ نماز گاہ" },
  womenPrayer: { ar: "مصلى نساء", en: "Women's Prayer", es: "Sala de oración mujeres", it: "Sala preghiera donne", ur: "خواتین نماز گاہ" },
  inMinutes: { ar: "بعد {n} دقيقة", en: "In {n} min", es: "En {n} min", it: "Tra {n} min", ur: "{n} منٹ میں" },
  showEnded: { ar: "انتهى العرض", en: "Show Ended", es: "Show finalizado", it: "Spettacolo terminato", ur: "شو ختم" },
  navigateToLocation: { ar: "التوجه للموقع", en: "Navigate to location", es: "Navegar a la ubicación", it: "Naviga alla posizione", ur: "مقام پر جائیں" },
  alBaik: { ar: "البيك", en: "Al Baik", es: "Al Baik", it: "Al Baik", ur: "البیک" },
  alBaikDesc: { ar: "دجاج مقلي · بروستد · وجبات عائلية", en: "Fried chicken · Broasted · Family meals", es: "Pollo frito · Broasted · Comidas familiares", it: "Pollo fritto · Broasted · Pasti familiari", ur: "فرائیڈ چکن · بروسٹڈ · فیملی میلز" },
  kudu: { ar: "كودو", en: "Kudu", es: "Kudu", it: "Kudu", ur: "کودو" },
  kuduDesc: { ar: "برجر · ساندويتشات · مشروبات", en: "Burgers · Sandwiches · Drinks", es: "Hamburguesas · Sándwiches · Bebidas", it: "Hamburger · Panini · Bevande", ur: "برگر · سینڈوچ · مشروبات" },
  shawarmer: { ar: "شاورمر", en: "Shawarmer", es: "Shawarmer", it: "Shawarmer", ur: "شاورمر" },
  shawarmerDesc: { ar: "شاورما · فلافل · عصائر طازجة", en: "Shawarma · Falafel · Fresh juices", es: "Shawarma · Falafel · Jugos frescos", it: "Shawarma · Falafel · Succhi freschi", ur: "شاورما · فلافل · تازہ جوس" },
  maestro: { ar: "مايسترو بيتزا", en: "Maestro Pizza", es: "Maestro Pizza", it: "Maestro Pizza", ur: "مایسٹرو پیزا" },
  maestroDesc: { ar: "بيتزا · باستا · مقبلات", en: "Pizza · Pasta · Appetizers", es: "Pizza · Pasta · Aperitivos", it: "Pizza · Pasta · Antipasti", ur: "پیزا · پاستا · اپیٹائزرز" },
  restrooms: { ar: "دورات المياه", en: "Restrooms", es: "Baños", it: "Bagni", ur: "بیت الخلاء" },
  childrenActivities: { ar: "فعاليات الأطفال", en: "Children's Activities", es: "Actividades infantiles", it: "Attività per bambini", ur: "بچوں کی سرگرمیاں" },
  navigating: { ar: "جاري التوجيه...", en: "Navigating...", es: "Navegando...", it: "Navigazione...", ur: "نیویگیٹ ہو رہا ہے..." },
  open: { ar: "مفتوح", en: "Open", es: "Abierto", it: "Aperto", ur: "کھلا" },
  menu: { ar: "القائمة", en: "Menu", es: "Menú", it: "Menu", ur: "مینو" },
  crowdRadar: { ar: "📡 رادار الحشود", en: "📡 Crowd Radar", es: "📡 Radar de multitud", it: "📡 Radar folla", ur: "📡 ہجوم ریڈار" },
  crowdLegend: { ar: "مستوى الازدحام", en: "Crowd Level", es: "Nivel de multitud", it: "Livello di affollamento", ur: "ہجوم کی سطح" },
  crowdLow: { ar: "غير مزدحم", en: "Low", es: "Bajo", it: "Basso", ur: "کم" },
  crowdMedium: { ar: "متوسط", en: "Medium", es: "Medio", it: "Medio", ur: "درمیانہ" },
  crowdHigh: { ar: "مزدحم جدًا", en: "Crowded", es: "Lleno", it: "Affollato", ur: "بہت زیادہ" },
  chatAssistant: { ar: "المساعد الذكي", en: "Smart Assistant", es: "Asistente inteligente", it: "Assistente intelligente", ur: "سمارٹ اسسٹنٹ" },
  chatPlaceholder: { ar: "اكتب سؤالك هنا...", en: "Type your question...", es: "Escribe tu pregunta...", it: "Scrivi la tua domanda...", ur: "اپنا سوال یہاں لکھیں..." },
  allEvents: { ar: "جميع الفعاليات", en: "All Events", es: "Todos los eventos", it: "Tutti gli eventi", ur: "تمام ایونٹس" },
  language: { ar: "اللغة", en: "Language", es: "Idioma", it: "Lingua", ur: "زبان" },
  ageRange: { ar: "العمر", en: "Age", es: "Edad", it: "Età", ur: "عمر" },
};

const langLabels: Record<Language, string> = {
  ar: "عربي",
  en: "English",
  es: "Español",
  it: "Italiano",
  ur: "اردو",
};

const rtlLangs: Language[] = ["ar", "ur"];

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
    const langs: Language[] = ["ar", "en", "es", "it", "ur"];
    const idx = langs.indexOf(lang);
    setLang(langs[(idx + 1) % langs.length]);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[key]?.[lang] || translations[key]?.["en"] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
  const isRTL = rtlLangs.includes(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL, langLabels, allLangs: ["ar", "en", "es", "it", "ur"] }}>
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
