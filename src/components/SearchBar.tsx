import { Search, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const SearchBar = () => {
  const { t } = useLanguage();

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("🔥 البحث شغال:", query);
  };

  return (
    <div className="-mt-5 px-5">
      <div className="flex items-center gap-3 rounded-2xl border border-secondary/20 bg-card px-4 py-3 shadow-lg glow-cyan backdrop-blur-sm">
        <Search className="h-5 w-5 text-muted-foreground" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        {/* زر البحث */}
        <button onClick={handleSearch} className="text-secondary">
          🔍
        </button>

        <button className="text-secondary">
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
