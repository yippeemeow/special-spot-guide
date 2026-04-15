import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X, Navigation } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", content: "أهلاً بك! أنا نهى، كيف أساعدك اليوم؟" }]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          Authorization: "Bearer sk-UIlD4_Pf5iOO8o6_eHNYyg",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          model: "nuha-2.0",
          messages: [{ role: "user", content: userQuery }],
          stream: false,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً، لم أفهم ذلك." },
      ]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: "حدث خطأ في الاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start">
      {/* نافذة المحادثة - تم تنزيلها لتكون فوق الأيقونة مباشرة */}
      {isOpen && (
        <div className="mb-3 w-[300px] bg-card/95 backdrop-blur-2xl border border-secondary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-secondary p-3 flex justify-between items-center">
            <span className="text-black font-bold text-xs">نهى الذكية</span>
            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* تقليل الارتفاع هنا لتبدو أنزل في الشاشة */}
          <div ref={scrollRef} className="p-4 h-[250px] overflow-y-auto space-y-3 bg-black/10 no-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-2.5 rounded-2xl text-[11px] max-w-[90%] ${
                    msg.role === "user" ? "bg-secondary text-black font-bold" : "bg-white/10 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-white/5 flex gap-2 items-center bg-card">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اسأل نهى..."
              className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none"
            />
            <button onClick={handleSendMessage} className="bg-secondary p-2 rounded-xl text-black">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* الأيقونة العائمة بمكانها الصحيح أسفل يسار */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="text-black h-6 w-6" /> : <MessageCircle className="text-black h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatBot;
