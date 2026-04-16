import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلاً بك في منصة مسارك. أنا نهى، مساعدتك الذكية لفعالية علم للابتكار الرقمي. كيف يمكنني خدمتك الآن؟",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const eventsTimeline = [
    { title: "الافتتاح الرسمي", location: "المسرح الرئيسي", time: "16:30" },
    { title: "مستقبل الحلول الرقمية", location: "المسرح الرئيسي", time: "17:15" },
    { title: "عرض الخدمات الرقمية", location: "المسرح الرئيسي", time: "18:15" },
    { title: "ورشة الابتكار في تجربة المستخدم", location: "المسرح الرئيسي", time: "19:15" },
    { title: "جلسة الذكاء الاصطناعي", location: "المسرح الرئيسي", time: "20:15" },
    { title: "المسابقة التفاعلية", location: "المسرح الرئيسي", time: "21:15" },
    { title: "الختام والتكريم", location: "المسرح الرئيسي", time: "22:15" },
    { title: "فعالية التلوين التقني", location: "منطقة الأطفال", time: "16:00" },
    { title: "نشاط تركيب وبناء للأطفال", location: "منطقة الأطفال", time: "17:15" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      eventsTimeline.forEach((event) => {
        const [h, m] = event.time.split(":").map(Number);
        const eventMinutes = h * 60 + m;
        if (eventMinutes - currentMinutes === 5) {
          const alert = `تنويه: ستبدأ فعالية "${event.title}" خلال 5 دقائق في ${event.location}. يمكنكم التوجه للموقع عبر الخريطة.`;
          setMessages((prev) => {
            if (prev[prev.length - 1].content !== alert) {
              return [...prev, { role: "assistant", content: alert }];
            }
            return prev;
          });
        }
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [messages]);

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    const userQuery = query;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setQuery("");
    setIsLoading(true);

    const exhibitionContext = `
      أنتِ "نهى"، المساعدة الذكية الرسمية لفعالية "علم للابتكار". ردي بلهجة سعودية بيضاء مهذبة ومهنية.
      التنسيق: استخدمي القوائم النقطية والأسطر الواضحة. قللي من الإيموجي واجعلي الردود عملية ومباشرة.
      المسرح: 4:30م افتتاح، 5:15م مستقبل الحلول، 6:15م خدمات رقمية، 7:15م ورشة ابتكار، 8:15م ذكاء اصطناعي، 9:15م مسابقة، 10:15م ختام.
      البوثات: الحلول الرقمية، البيانات والأمن، الابتكار، المستقبل التقني.
      المطاعم: كودو، البيك، كوفي شوب.
      عند السؤال عن المواقع، قولي: "يمكنكم تتبع المسار الموضح على الخريطة للوصول السريع".
    `;

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
          messages: [
            { role: "system", content: exhibitionContext },
            { role: "user", content: userQuery },
          ],
          stream: false,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً، لم أتمكن من فهم الطلب." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "نعتذر، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[72px] left-3 right-3 z-[100] flex flex-col items-stretch font-sans" dir="rtl">
      <div className="w-full bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#00B4D8]/30 rounded-2xl shadow-[0_0_20px_rgba(0,180,216,0.2)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-[#00B4D8] p-3 flex justify-between items-center">
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
          className="p-4 h-[280px] overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-black/20 no-scrollbar"
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
          {isLoading && (
            <div className="flex justify-end">
              <div className="bg-[#252545] p-2 rounded-lg border border-white/10">
                <Loader2 className="h-4 w-4 text-[#00B4D8] animate-spin" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 flex gap-2 items-center bg-[#1A1A2E]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-[13px] text-white focus:outline-none border border-white/10 focus:border-[#00B4D8]/50 transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !query.trim()}
            className="bg-[#00B4D8] p-2.5 rounded-lg text-[#1A1A2E] transition-transform active:scale-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
