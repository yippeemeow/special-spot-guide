import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X, Navigation } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "أهلاً بك في مسارك.. أنا نهى، محللتك الذكية لفعالية علم. عيني على الجدول دائماً لأي تحديث، كيف أقدر أخدمك؟",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // جدول الفعاليات للمحرك الذكي
  const eventsTimeline = [
    { title: "الافتتاح الرسمي", location: "المسرح الرئيسي", time: "16:30" },
    { title: "مستقبل الحلول الرقمية", location: "المسرح الرئيسي", time: "17:15" },
    { title: "ورشة الابتكار", location: "المسرح الرئيسي", time: "19:15" },
    { title: "جلسة الذكاء الاصطناعي", location: "المسرح الرئيسي", time: "20:15" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // محرك التوقيت (Interval Timer) - يجعل نهى تتفاعل تلقائياً
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      eventsTimeline.forEach((event) => {
        const [h, m] = event.time.split(":").map(Number);
        const eventMinutes = h * 60 + m;

        // تنبيه قبل الفعالية بـ 5 دقائق
        if (eventMinutes - currentMinutes === 5) {
          const alertMessage = `نهى هنا! ذكرتكم بأن "${event.title}" بتبدأ بعد 5 دقائق في ${event.location}. لا تفوتكم!`;

          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1].content;
            if (lastMsg !== alertMessage) {
              return [...prev, { role: "assistant", content: alertMessage }];
            }
            return prev;
          });
        }
      });
    }, 60000); // تحقق كل دقيقة
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = (content: string) => {
    setIsOpen(false);
    console.log("تفعيل المسار إلى:", content);
  };

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    const userQuery = query;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setQuery("");
    setIsLoading(true);

    const exhibitionContext = `
      أنتِ "نهى"، المحللة الذكية لفعالية علم.
      شخصيتك: ذكية، سريعة البديهة، وتتحدثين بلهجة سعودية بيضاء مهنية.
      مهمتك: الربط بين استفسار المستخدم والواقع (الوقت، المكان، والفعالية).
      قاعدة الزر: إذا كان ردك يتضمن توجيهاً لمكان (مسرح، بوث، مطعم، منطقة)، صياغة الرد يجب أن تشمل اسم المكان بوضوح ليظهر زر المسار تلقائياً.
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
        { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً، تعثرت في التحليل قليلاً." },
      ]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "حدث خطأ في الاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-20 left-4 z-[100] flex flex-col items-start font-sans" dir="rtl">
      {isOpen && (
        <div className="mb-4 w-[320px] bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#00B4D8]/30 rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#00B4D8] p-4 flex justify-between items-center text-[#1A1A2E]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="font-bold text-sm">نهى | المحللة الفورية</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="p-4 h-[350px] overflow-y-auto space-y-4 no-scrollbar">
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

                  {/* الزر يظهر بذكاء بناءً على محتوى الرد */}
                  {msg.role === "assistant" &&
                    (msg.content.includes("المسرح") ||
                      msg.content.includes("بوث") ||
                      msg.content.includes("منطقة") ||
                      msg.content.includes("موقع")) && (
                      <button
                        onClick={() => handleNavigate(msg.content)}
                        className="mt-3 w-full bg-[#00B4D8] text-[#1A1A2E] py-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-[#0096B4] transition-all"
                      >
                        <Navigation className="h-3 w-3" />
                        اتبع المسار في الخريطة
                      </button>
                    )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end p-2">
                <Loader2 className="h-4 w-4 text-[#00B4D8] animate-spin" />
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2 items-center bg-[#1A1A2E]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="نهى تحلل استفسارك الآن..."
              className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-[13px] text-white focus:outline-none border border-white/10"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !query.trim()}
              className="bg-[#00B4D8] p-2.5 rounded-lg text-[#1A1A2E]"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#00B4D8] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 border-2 border-white/20"
      >
        {isOpen ? <X className="text-[#1A1A2E] h-6 w-6" /> : <MessageCircle className="text-[#1A1A2E] h-7 w-7" />}
      </button>
    </div>
  );
};

export default ChatBot;
