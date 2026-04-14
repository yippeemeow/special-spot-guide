import { Search, Mic, Loader2 } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

import { useState } from "react";

const SearchBar = () => {
  const { t } = useLanguage();

  const [query, setQuery] = useState("");

  const [result, setResult] = useState(""); // لتخزين رد الذكاء الاصطناعي

  const [isLoading, setIsLoading] = useState(false); // لحالة التحميل

  const handleSearch = async () => {
    if (!query || isLoading) return;

    setIsLoading(true);

    setResult(""); // مسح النتيجة السابقة

    try {
      const res = await fetch("https://elmodels.ngrok.app/v1/chat/completions", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          // الخيار 1: الطريقة القياسية مع Bearer (تأكد من المسافة)

          Authorization: `Bearer sk-b0899b83-5952-4dd9-8267-7234175a15f8`,

          // الخيار 2: بعض السيرفرات المحلية تطلبه بهذا المسمى

          "api-key": "sk-b0899b83-5952-4dd9-8267-7234175a15f8",

          // الخيار 3: لضمان عدم حجب ngrok للطلب

          "ngrok-skip-browser-warning": "true",
        },

        body: JSON.stringify({
          model: "nuha-2.0",

          messages: [
            {
              role: "system",

              content: "اقترح فعاليات بشكل مختصر",
            },

            {
              role: "user",

              content: query,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices[0]) {
        setResult(data.choices[0].message.content);

        console.log("🤖 AI Response:", data.choices[0].message.content);
      } else {
        setResult("عذراً، لم أتمكن من الحصول على رد.");

        console.error("❌ API Error:", data);
      }
    } catch (error) {
      setResult("فشل الاتصال بالسيرفر. تأكد من تشغيل ngrok.");

      console.error("❌ Connection Error:", error);
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

        {/* زر البحث */}

        <button onClick={handleSearch} className="text-secondary disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "..." : "🔍"}
        </button>

        <button className="text-secondary" disabled={isLoading}>
          <Mic className="h-5 w-5" />
        </button>
      </div>

      {/* صندوق عرض النتائج في حال وجود رد */}

      {result && (
        <div className="p-4 rounded-xl bg-card/80 border border-secondary/10 text-foreground text-sm shadow-inner animate-in fade-in slide-in-from-top-2">
          <p className="leading-relaxed whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
