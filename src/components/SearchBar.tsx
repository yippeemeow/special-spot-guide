import { Search, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const SearchBar = () => {
  const { t } = useLanguage();

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch("https://elmodels.ngrok.app/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        model: "nuha-2.0",
        messages: [
          {
            role: "system",
            content: "اقترح فعاليات في السعودية بشكل مختصر",
          },
          {
            role: "user",
            content: query,
          },
        ],
      }),
    });

    const data = await res.json();
    console.log("🤖 AI:", data.choices[0].message.content);
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
