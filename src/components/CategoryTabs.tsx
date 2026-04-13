import { useState } from "react";
import { LayoutGrid, Mic2, Grid3X3, Baby, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryTabsProps {
  onCategoryChange?: (category: string) => void;
}

const CategoryTabs = ({ onCategoryChange }: CategoryTabsProps) => {
  const [active, setActive] = useState("all");
  const { t } = useLanguage();

  const categories = [
    { id: "all", label: t("all"), icon: LayoutGrid },
    { id: "stage", label: t("stage"), icon: Mic2 },
    { id: "booths", label: t("booths"), icon: Grid3X3 },
    { id: "kids", label: t("kids"), icon: Baby },
    { id: "services", label: t("services"), icon: Wrench },
  ];

  const handleClick = (id: string) => {
    setActive(id);
    onCategoryChange?.(id);
  };

  return (
    <div className="mt-4 px-5">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "text-secondary-foreground shadow-md glow-cyan"
                  : "bg-card text-muted-foreground border border-border hover:border-secondary/30"
              }`}
              style={isActive ? { background: "var(--gradient-cta)" } : undefined}
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
