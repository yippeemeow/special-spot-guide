import { useState } from "react";
import { LayoutGrid, Mic2, Grid3X3, Baby, UtensilsCrossed, Wrench } from "lucide-react";

const categories = [
  { id: "all", label: "الكل", icon: LayoutGrid },
  { id: "stage", label: "المسرح", icon: Mic2 },
  { id: "booths", label: "البوثات", icon: Grid3X3 },
  { id: "kids", label: "الأطفال", icon: Baby },
  { id: "restaurants", label: "المطاعم", icon: UtensilsCrossed },
  { id: "services", label: "الخدمات", icon: Wrench },
];

const CategoryTabs = () => {
  const [active, setActive] = useState("all");

  return (
    <div className="mt-4 px-5">
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ direction: "rtl" }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:bg-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
