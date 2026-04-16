import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلاً بك في منصة مسارك. أنا نهى، مساعدتك الذكية لفعالية علم للابتكار الرقمي. كيف يمكنني خدمتك الآن؟",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // تم تعديل الحاوية الرئيسية (bottom-24) لترتفع قليلاً عن شريط التنقل السفلي وتكون واضحة
  return (
    <div className="fixed bottom-24 left-6 z-[100] flex flex-col items-start font-sans" dir="rtl">
      {isOpen && (
        <div className="mb-4 w-[320px] bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#00B4D8]/30 rounded-2xl shadow-[0_0_20px_rgba(0,180,216,0.2)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#00B4D8] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[#1A1A2E] font-bold text-sm">نهى - المساعد الذكي</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#1A1A2E]/70 hover:text-[#1A1A2E]">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="p-4 h-[320px] overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-black/20 no-scrollbar"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`p-3 rounded-xl text-[13px] leading-relaxed max-w-[85%] whitespace-pre-line shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#00B4D8] text-[#1A1A2E] font-medium rounded-bl-none"
                      : "bg-[#252545] text-white border border-white/10 rounded-br-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2 items-center bg-[#1A1A2E]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-[13px] text-white focus:outline-none border border-white/10"
            />
            <button className="bg-[#00B4D8] p-2.5 rounded-lg text-[#1A1A2E]">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* زر أيقونة نهى المتموضع أسفل نافذة المحادثة مباشرة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#00B4D8] rounded-full shadow-[0_4px_15px_rgba(0,180,216,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
      >
        {isOpen ? <X className="text-[#1A1A2E] h-6 w-6" /> : <MessageCircle className="text-[#1A1A2E] h-7 w-7" />}
      </button>
    </div>
  );
};

export default ChatBot;
