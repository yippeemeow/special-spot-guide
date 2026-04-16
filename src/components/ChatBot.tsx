import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X, Navigation } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلاً بك في مسارك.. أنا نهى، محللتك الذكية لفعالية علم. كيف أقدر أخدمك؟",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      eventsTimeline.forEach((event) => {
        const [h, m] = event.time.split(":").map(Number);
        const eventMinutes = h * 60 + m;
        if (eventMinutes - currentMinutes === 5) {
          const alertMessage = `نهى هنا! ذكرتكم بأن "${event.title}" بتبدأ بعد 5 دقائق في ${event.location}.`;
          setMessages((prev) => {
            if (prev[prev.length - 1].content !== alertMessage) {
              return [...prev, { role: "assistant", content: alertMessage }];
            }
            return prev;
          });
        }
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // ميزة ASR - التعرف على الصوت
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.start();
  };

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    const userQuery = query;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setQuery("");
    setIsLoading(true);

    const exhibitionContext = `
      أنتِ "نهى"، المحللة الذكية لفعالية علم. ردي بلهجة سعودية بيضاء.
      مهم جداً: إذا طلب المستخدم "توجيه" أو قال "وجهني" أو "وين المكان"، تأكدي من ذكر اسم الموقع (مثل: المسرح، البوث، منطقة الأطفال) بوضوح في ردك.
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
          messages: [{ role: "system", content: exhibitionContext }, { role: "user", content: userQuery }],
          stream: false,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً، لم أفهمك." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "حدث خطأ في الاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (content: string) => {
    setIsOpen(false);
    // إرسال حدث للخريطة لبدء تتبع المسار فوراً
    const event = new CustomEvent("map-navigate", { detail: { location: content, action: "track_path" } });
    window.dispatchEvent(event);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center font-sans w-full px-4" dir="rtl">
      {isOpen && (
        <div className="mb-3 w-full max-w-[340px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: "420px" }}>
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <span className="font-bold text-sm">نهى - المحللة الذكية</span>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border border-border"}`}>
                  {msg.content}
                  {msg.role === "assistant" && (msg.content.includes("مسرح") || msg.content.includes("ورشة") || msg.content.includes("منطقة") || msg.content.includes("بوث")) && (
                    <button onClick={() => handleNavigate(msg.content)} className="mt-2 flex items-center gap-1 text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      <Navigation className="h-3 w-3" />
                      اتبع المسار في الخريطة
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-card border border-border rounded-2xl px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
          <div className="p-2 border-t border-border bg-background flex items-center gap-2">
            <button onClick={startRecording} className={`p-2 rounded-full ${isRecording ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}`}>
              <Mic className="h-4 w-4" />
            </button>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اكتب رسالتك..."
              className="flex-1 bg-muted rounded-full px-3 py-2 text-xs outline-none text-foreground"
            />
            <button onClick={handleSendMessage} disabled={isLoading} className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-105 transition-transform"
        aria-label="فتح المحادثة"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default ChatBot;