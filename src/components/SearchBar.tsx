import { Search, Mic, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const SearchBar = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query || isLoading) return;

    setIsLoading(true);
    setResult("");

    try {
      // تعديل الرابط ليتوافق مع LiteLLM Proxy
      const res = await fetch("https://elmodels.ngrok.app/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // تأكد من نسخ المفتاح "السري" كاملاً من لوحة LiteLLM
          Authorization: "Bearer sk-UIlD4_Pf5iOO8o6_eHNYyg",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          model: "nuha-2.0",
          messages: [{ role: "user", content: query }],
          stream: false,
        }),
      });

      if (res.status === 401) {
        throw new Error("المفتاح مرفوض (Unauthorized). تأكد من نسخ الـ Secret Key الفعلي وليس الـ ID.");
      }

      if (!res.ok) {
        throw new Error(`خطأ من السيرفر: ${res.status}`);
      }

      const data = await res.json();
      setResult(data.choices?.[0]?.message?.content || "وصل رد فارغ من الموديل.");
    } catch (error: any) {
      setResult(`خطأ: ${error.message}`);
      console.error("❌ Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="-mt-5 px-5 flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-secondary/20 bg-card px-4 py-3 shadow-lg glow-cyan backdrop-blur-sm">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-secondary animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-muted-foreground" />
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          disabled={isLoading}
        />

        <button onClick={handleSearch} className="text-secondary disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "..." : "🔍"}
        </button>

        <button className="text-secondary" disabled={isLoading}>
          <Mic className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div
          className="p-4 rounded-xl bg-card/80 border border-secondary/10 text-foreground text-sm shadow-inner animate-in fade-in slide-in-from-top-2 text-right"
          dir="rtl"
        >
          <p className="leading-relaxed whitespace-pre-wrap font-medium text-white/90">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
