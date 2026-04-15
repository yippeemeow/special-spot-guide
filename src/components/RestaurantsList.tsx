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
    <div className="mt-4 px-4">
      <h2 className="mb-2 text-sm font-bold text-foreground text-end">المطاعم</h2>
      <div className="space-y-2">
        {filtered.map((r) => (
          <div key={r.id} className="flex items-center gap-2.5 rounded-xl border border-primary/15 bg-card p-3 shadow-sm">
            <button
              onClick={handleNavigate}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary-foreground"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Navigation className="h-3.5 w-3.5" />
            </button>
            <div className="flex flex-1 flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{r.emoji}</span>
                <h3 className="text-xs font-bold text-foreground">{r.name[lang]}</h3>
              </div>
              <div className="flex items-center gap-2.5 mt-0.5 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  <span>{r.time[lang]}</span>
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
