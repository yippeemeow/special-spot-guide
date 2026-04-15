import { Navigation, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  id: number;
  name: { ar: string; en: string; zh: string; es: string };
  time: { ar: string; en: string; zh: string; es: string };
  emoji: string;
}

const restaurantsData: Restaurant[] = [
  { id: 1, name: { ar: "منطقة المطاعم", en: "Restaurant Area", zh: "餐饮区", es: "Zona de restaurantes" }, time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" }, emoji: "🍽️" },
  { id: 2, name: { ar: "مطعم كودو", en: "Kudu Restaurant", zh: "Kudu餐厅", es: "Restaurante Kudu" }, time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" }, emoji: "🍔" },
  { id: 3, name: { ar: "كوفي شوب", en: "Coffee Shop", zh: "咖啡店", es: "Cafetería" }, time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" }, emoji: "☕" },
  { id: 4, name: { ar: "مطعم البيك", en: "Al Baik Restaurant", zh: "Al Baik餐厅", es: "Restaurante Al Baik" }, time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" }, emoji: "🍗" },
  { id: 5, name: { ar: "التموينات", en: "Convenience Store", zh: "便利店", es: "Tienda de conveniencia" }, time: { ar: "٤:٠٠ م – ١١:٠٠ م", en: "4:00 PM – 11:00 PM", zh: "下午4:00 – 11:00", es: "4:00 PM – 11:00 PM" }, emoji: "🛒" },
];

const RestaurantsList = ({ searchQuery }: { searchQuery?: string }) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const q = (searchQuery || "").toLowerCase();
  const filtered = restaurantsData.filter((r) => !q || r.name[lang].toLowerCase().includes(q));

  const handleNavigate = () => {
    navigate("/map?target=restaurantArea");
  };

  return (
    <div className="mt-6 px-5">
      <h2 className="mb-3 text-lg font-bold text-foreground text-end">المطاعم</h2>
      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-card p-4 shadow-sm transition-all hover:border-primary/30">
            <button
              onClick={handleNavigate}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-foreground"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Navigation className="h-4 w-4" />
            </button>
            <div className="flex flex-1 flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-xl">{r.emoji}</span>
                <h3 className="text-sm font-bold text-foreground">{r.name[lang]}</h3>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{r.time[lang]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{restaurantsData[0].name[lang]}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
