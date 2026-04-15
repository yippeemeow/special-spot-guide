import { useState } from "react";
import { LayoutGrid, Mic2, Grid3X3, Baby, Wrench, Utensils } from "lucide-react";
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
    { id: "restaurants", label: t("restaurants"), icon: Utensils },
    { id: "kids", label: t("kids"), icon: Baby },
    { id: "services", label: t("services"), icon: Wrench },
  ];

  const handleClick = (id: string) => {
    setActive(id);
    onCategoryChange?.(id);
  };

  return (
    <div className="mt-2 px-3">
      <div className="flex gap-1.5 pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex flex-1 items-center justify-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium ${
                isActive
                  ? "text-secondary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border"
              }`}
              style={isActive ? { background: "var(--gradient-cta)" } : undefined}
            >
              <Icon className="h-3 w-3" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
