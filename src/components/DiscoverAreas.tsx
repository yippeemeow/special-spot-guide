import { Baby, Mic2, UtensilsCrossed, Wrench, Grid3X3, Info } from "lucide-react";

const areas = [
  { id: 1, label: "المسرح", icon: Mic2, color: "bg-accent text-accent-foreground" },
  { id: 2, label: "الأطفال", icon: Baby, color: "bg-accent text-accent-foreground" },
  { id: 3, label: "البوثات", icon: Grid3X3, color: "bg-accent text-accent-foreground" },
  { id: 4, label: "المطاعم", icon: UtensilsCrossed, color: "bg-accent text-accent-foreground" },
  { id: 5, label: "الخدمات", icon: Wrench, color: "bg-accent text-accent-foreground" },
  { id: 6, label: "الاستعلامات", icon: Info, color: "bg-accent text-accent-foreground" },
];

const DiscoverAreas = () => {
  return (
    <div className="mt-6 px-5 pb-28">
      <h2 className="mb-3 text-lg font-bold text-foreground text-right">اكتشف المناطق</h2>
      <div className="grid grid-cols-3 gap-3">
        {areas.map((area) => {
          const Icon = area.icon;
          return (
            <button
              key={area.id}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${area.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-foreground">{area.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverAreas;
