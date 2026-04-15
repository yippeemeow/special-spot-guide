import { Search, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const SearchBar = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    // هنا يمكنك إضافة منطق البحث المحلي في القائمة أو تصفية الفعاليات
    console.log("Searching for:", query);
  };

  return (
    <div className="-mt-5 px-5">
      <div className="flex items-center gap-3 rounded-2xl border border-secondary/20 bg-card/80 px-4 py-3 shadow-lg backdrop-blur-md transition-all focus-within:border-secondary/50">
        <Search className="h-5 w-5 text-muted-foreground" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder={t("searchPlaceholder") || "ابحث عن فعاليات، بوثات..."}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        <button className="text-secondary/60 hover:text-secondary transition-colors">
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
