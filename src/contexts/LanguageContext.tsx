import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  [key: string]: { ar: string; en: string };
}

const translations: Translations = {
  appName: { ar: "مسارك", en: "MASARK" },
  eventSubtitle: { ar: "فعالية شركة علم للابتكار الرقمي", en: "Elm Digital Innovation Event" },
  welcome: { ar: "مرحبًا بك في فعالية علم · ٤:٠٠ م – ١١:٠٠ م", en: "Welcome to Elm Event · 4:00 PM – 11:00 PM" },
  searchPlaceholder: { ar: "ابحث عن فعالية، بوث، خدمة، أو موقع...", en: "Search events, booths, services, or locations..." },
  all: { ar: "الكل", en: "All" },
  stage: { ar: "المسرح", en: "Stage" },
  booths: { ar: "البوثات", en: "Booths" },
  kids: { ar: "الأطفال", en: "Kids" },
  restaurants: { ar: "المطاعم", en: "Restaurants" },
  services: { ar: "الخدمات", en: "Services" },
  venueMap: { ar: "خريطة الفعالية", en: "Venue Map" },
  exploreLocations: { ar: "استكشف المواقع والمسارات", en: "Explore locations and routes" },
  currentAndUpcoming: { ar: "الفعاليات الجارية والقادمة", en: "Current & Upcoming Events" },
  viewAll: { ar: "عرض الكل", en: "View All" },
  startRoute: { ar: "ابدأ المسار", en: "Start Route" },
  discoverAreas: { ar: "اكتشف المناطق", en: "Discover Areas" },
  now: { ar: "الآن", en: "Live" },
  soon: { ar: "قريبًا", en: "Soon" },
  home: { ar: "الرئيسية", en: "Home" },
  events: { ar: "الفعاليات", en: "Events" },
  map: { ar: "الخريطة", en: "Map" },
  settings: { ar: "الإعدادات", en: "Settings" },
  myLocation: { ar: "موقعي", en: "My Location" },
  event: { ar: "فعالية", en: "Event" },
  service: { ar: "خدمة", en: "Service" },
  information: { ar: "الاستعلامات", en: "Information" },
  placesToVisit: { ar: "أماكن تريد زيارتها", en: "Places to Visit" },
  nearbyEvents: { ar: "فعاليات قريبة منك", en: "Nearby Events" },
  mainStage: { ar: "المسرح الرئيسي", en: "Main Stage" },
  childrenArea: { ar: "منطقة الأطفال", en: "Children's Area" },
  restaurantArea: { ar: "منطقة المطاعم", en: "Restaurant Area" },
  openingCeremony: { ar: "الافتتاح الرسمي", en: "Opening Ceremony" },
  openingDesc: { ar: "حفل الافتتاح الرسمي لفعالية علم للابتكار الرقمي", en: "Official opening ceremony of Elm Digital Innovation Event" },
  techColoring: { ar: "فعالية التلوين التقني", en: "Tech Coloring Activity" },
  techColoringDesc: { ar: "نشاط تلوين بأدوات تقنية مبتكرة", en: "Coloring activity with innovative tech tools" },
  digitalFuture: { ar: "مستقبل الحلول الرقمية في السعودية", en: "Future of Digital Solutions in KSA" },
  digitalFutureDesc: { ar: "جلسة حوارية عن مستقبل الحلول الرقمية", en: "Panel discussion on the future of digital solutions" },
  digitalServices: { ar: "كيف تسهّل الخدمات الرقمية حياة الأفراد؟", en: "How Digital Services Simplify Lives?" },
  digitalServicesDesc: { ar: "عرض تفاعلي عن أثر الرقمنة", en: "Interactive presentation on digitization impact" },
  youAreHere: { ar: "أنت هنا", en: "You are here" },
  mainEntrance: { ar: "المدخل الرئيسي", en: "Main Entrance" },
  reception: { ar: "الاستقبال", en: "Reception" },
  digitalSolutions: { ar: "بوث الحلول الرقمية", en: "Digital Solutions" },
  dataSecurity: { ar: "بوث البيانات والأمن", en: "Data & Security" },
  innovationUX: { ar: "بوث الابتكار والتجربة", en: "Innovation & UX" },
  techFuture: { ar: "بوث المستقبل التقني", en: "Tech Future" },
  firstAid: { ar: "الإسعافات الأولية", en: "First Aid" },
  menRestroom: { ar: "دورة مياه رجال", en: "Men's Restroom" },
  womenRestroom: { ar: "دورة مياه نساء", en: "Women's Restroom" },
  menPrayer: { ar: "مصلى رجال", en: "Men's Prayer" },
  womenPrayer: { ar: "مصلى نساء", en: "Women's Prayer" },
};

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("ar");

  const toggleLang = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));
  const t = (key: string) => translations[key]?.[lang] || key;
  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
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
