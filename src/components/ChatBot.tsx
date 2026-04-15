import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X, Navigation } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً بك! أنا نهى، مساعدتك الذكية في المعرض. كيف أساعدك اليوم؟" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // سكرول تلقائي لآخر رسالة
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;

    const userQuery = query;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("https://elmodels.ngrok.app/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-UIlD4_Pf5iOO8o6_eHNYyg", // الكي الخاص بك
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          model: "nuha-2.0",
          messages: [{ role: "user", content: userQuery }],
          stream: false,
        }),
      });

      if (!res.ok) throw new Error(`خطأ من السيرفر: ${res.status}`);

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || "عذراً، لم أستطع معالجة طلبك.";

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `عذراً، حدث خطأ: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 left-6 z-[100] flex flex-col items-start">
      {/* نافذة المحادثة */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[350px] bg-card/95 backdrop-blur-2xl border border-secondary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* رأس الشات */}
          <div className="bg-secondary p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span className="text-black font-extrabold text-sm">نهى Nuha-2.0</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black/70 hover:text-black">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* منطقة الرسائل */}
          <div
            ref={scrollRef}
            className="p-4 h-[350px] overflow-y-auto space-y-4 flex flex-col no-scrollbar bg-black/20"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-secondary text-black font-bold rounded-tr-none"
                      : "bg-white/10 border border-white/10 text-white rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <Loader2 className="h-4 w-4 text-secondary animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* منطقة الإدخال */}
          <div className="p-3 border-t border-white/5 bg-card flex gap-2 items-center">
            <button className="text-secondary/60 hover:text-secondary">
              <Mic className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اسأل نهى عن المعرض..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary/50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-secondary p-2 rounded-xl text-black disabled:opacity-50 transition-all active:scale-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* الأيقونة العائمة (المشغل) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-secondary rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 group relative"
      >
        {isOpen ? (
          <X className="text-black h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="text-black h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
