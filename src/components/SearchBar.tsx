import { Search, Mic, Loader2, Navigation, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  title_ar: string;
  title_en: string;
  section: string;
  mapTarget: string;
  type: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doAISearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke("smart-search", {
        body: { query: q },
      });

      if (error) {
        console.error("Search error:", error);
        setResults([]);
      } else {
        setResults(data?.results || []);
        setShowResults(true);
      }
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);

    // Debounce AI search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doAISearch(value);
    }, 600);
  };

  const handleNavigate = (target: string) => {
    setShowResults(false);
    setQuery("");
    onSearch?.("");
    navigate(`/map?target=${target}`);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    onSearch?.("");
  };

  const sectionEmojis: Record<string, string> = {
    "المسرح": "🎤",
    "الأطفال": "👶",
    "البوثات": "🏢",
    "المطاعم": "🍽️",
    "الخدمات": "🔧",
    "مواقع": "📍",
  };

  const handleASR = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("model", "whisper-1");

        try {
          const res = await fetch("https://elmodels.ngrok.app/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: "Bearer sk-FEAw1F9QdZbtn3RJnR5yfA",
              "ngrok-skip-browser-warning": "69420",
            },
            body: formData,
          });

          const data = await res.json();
          if (data.text) {
            setQuery(data.text);
            onSearch?.(data.text);
            doAISearch(data.text);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsRecording(false);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000);
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  return (
    <div className="-mt-5 px-5 relative z-30" ref={containerRef}>
      <div className="flex items-center gap-3 rounded-2xl border border-secondary/20 bg-card/80 px-4 py-3 shadow-lg backdrop-blur-md">
        {isSearching ? (
          <Loader2 className="h-5 w-5 text-secondary animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-muted-foreground" />
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="ابحث... مثال: وين أصلي؟ أو جوعان"
          className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
        />

        {query && (
          <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={handleASR}
          disabled={isRecording}
          className={`transition-all ${isRecording ? "text-red-500 animate-pulse" : "text-secondary"}`}
        >
          {isRecording ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}
        </button>
      </div>

      {/* AI Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute left-5 right-5 mt-2 rounded-2xl border border-secondary/20 bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-4 py-2 border-b border-white/5">
            <span className="text-[10px] text-muted-foreground font-medium">✨ نتائج البحث الذكي</span>
          </div>
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => handleNavigate(r.mapTarget)}
              className="flex w-full items-center gap-3 px-4 py-3 text-end hover:bg-secondary/10 transition-colors border-b border-white/5 last:border-0"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-black"
                style={{ background: "var(--gradient-cta)" }}>
                <Navigation className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{r.title_ar}</p>
                <p className="text-[11px] text-muted-foreground">{sectionEmojis[r.section] || "📌"} {r.section}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && query.length >= 2 && !isSearching && (
        <div className="absolute left-5 right-5 mt-2 rounded-2xl border border-secondary/20 bg-card shadow-2xl p-4 text-center animate-in fade-in z-50">
          <p className="text-sm text-muted-foreground">لا توجد نتائج مطابقة</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
