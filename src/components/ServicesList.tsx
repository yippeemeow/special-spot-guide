import { Navigation, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface ServiceItem {
  id: number;
  name: { ar: string; en: string; zh: string; es: string };
  icon: string;
  distance: string;
  mapTarget: string;
}

const services: ServiceItem[] = [
  { id: 1, name: { ar: "مصلى نساء", en: "Women's Prayer", zh: "女祈祷室", es: "Sala de oración mujeres" }, icon: "🕌", distance: "50م", mapTarget: "womenPrayer" },
  { id: 2, name: { ar: "مصلى رجال", en: "Men's Prayer", zh: "男祈祷室", es: "Sala de oración hombres" }, icon: "🕌", distance: "45م", mapTarget: "menPrayer" },
  { id: 3, name: { ar: "دورة مياه نساء", en: "Women's Restroom", zh: "女洗手间", es: "Baño de mujeres" }, icon: "🚺", distance: "35م", mapTarget: "womenRestroom" },
  { id: 4, name: { ar: "دورة مياه رجال", en: "Men's Restroom", zh: "男洗手间", es: "Baño de hombres" }, icon: "🚹", distance: "30م", mapTarget: "menRestroom" },
  { id: 5, name: { ar: "الإسعافات الأولية", en: "First Aid", zh: "急救站", es: "Primeros auxilios" }, icon: "🏥", distance: "60م", mapTarget: "firstAid" },
  { id: 6, name: { ar: "الاستعلامات", en: "Information", zh: "咨询处", es: "Información" }, icon: "ℹ️", distance: "20م", mapTarget: "information" },
];

const ServicesList = ({ searchQuery }: { searchQuery?: string }) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const q = (searchQuery || "").toLowerCase();
  const filtered = services.filter((s) => !q || s.name[lang].toLowerCase().includes(q));

  const handleNavigate = (target: string) => {
    navigate(`/map?target=${target}`);
  };

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-3 text-lg font-bold text-foreground text-end">الخدمات</h2>
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => handleNavigate(s.mapTarget)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-primary/15 bg-card p-4 shadow-sm transition-all hover:border-primary/30"
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-xs font-semibold text-foreground text-center">{s.name[lang]}</span>
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-secondary text-secondary-foreground">الآن</span>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{s.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-primary">
              <Navigation className="h-3 w-3" />
              <span>وجّهني</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
