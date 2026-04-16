import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ChatBot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلاً بك! أنا نهى، مساعِدتك الذكية في فعالية علم للابتكار الرقمي. كيف أقدر أساعدك اليوم؟",
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
    { title: "ورشة الأطفال: التقنية ببساطة", location: "منطقة الأطفال", time: "18:15" },
    { title: "مسابقة أطفال", location: "منطقة الأطفال", time: "19:15" },
    { title: "ركن الرسم الحر", location: "منطقة الأطفال", time: "20:15" },
    { title: "نشاط تفاعلي ختامي", location: "منطقة الأطفال", time: "21:15" },
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
          const alert = `📢 بطلنا! باقي 5 دقائق وتبدأ "${event.title}" في ${event.location}. لا تفوتك!`;
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

  const handleVoiceInput = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: any[] = [];
      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("model", "whisper-1");
        const res = await fetch("https://elmodels.ngrok.app/audio/transcriptions", {
          method: "POST",
          headers: {
            Authorization: "Bearer sk-FEAw1F9QdZbtn3RJnR5yfA",
            "ngrok-skip-browser-warning": "69420",
          },
          body: formData,
        });
        const data = await res.json();
        if (data.text) setQuery(data.text);
        setIsRecording(false);
      };
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000);
    } catch (err) {
      setIsRecording(false);
    }
  };

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    const userQuery = query;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setQuery("");
    setIsLoading(true);

    const exhibitionContext = `
      أنتِ "نهى"، المساعدة الذكية لمعرض "علم للابتكار". ردي بلهجة سعودية بيضاء خفيفة.
      المسرح: 4:30م افتتاح، 5:15م مستقبل الحلول، 6:15م خدمات رقمية، 7:15م ورشة ابتكار، 8:15م ذكاء اصطناعي، 9:15م مسابقة، 10:15م ختام.
      منطقة الأطفال: 4م تلوين، 5:15م تركيب، 6:15م ورشة تقنية، 7:15م مسابقة، 8:15م رسم، 9:15م ختامي.
      البوثات: الحلول الرقمية، البيانات والأمن، الابتكار، المستقبل التقني (4م-11م).
      المطاعم: كودو، البيك، كوفي شوب، تموينات.
      المرافق: إسعافات، استعلامات، مصليات، دورات مياه.
      عند السؤال عن مكان وجهيهم للخريطة.
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
        { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً، ما فهمت عليك." },
      ]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "حصل خطأ بالاتصال، جرب ثاني مرة." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[4.5rem] left-4 z-[100] flex flex-col items-start font-sans" dir="rtl">
      {isOpen && (
        <div className="mb-3 w-[300px] bg-card/95 backdrop-blur-2xl border border-secondary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-secondary p-3 flex justify-between items-center">
            <span className="text-black font-bold text-xs text-right">نهى الذكية</span>
            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="p-4 h-[250px] overflow-y-auto space-y-3 bg-black/10 no-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`p-2.5 rounded-2xl text-[11px] max-w-[90%] ${msg.role === "user" ? "bg-secondary text-black font-bold rounded-tl-none" : "bg-white/10 text-white rounded-tr-none"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <Loader2 className="h-3 w-3 text-secondary animate-spin" />
              </div>
            )}
          </div>

          <div className="p-2 border-t border-white/5 flex gap-2 items-center bg-card">
            <button
              onClick={handleVoiceInput}
              disabled={isRecording || isLoading}
              className={`${isRecording ? "text-red-500 animate-pulse" : "text-secondary/60 hover:text-secondary"}`}
            >
              <Mic className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اسأل نهى..."
              className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none border border-transparent focus:border-secondary/30"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-secondary p-2 rounded-xl text-black shadow-inner"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white/20"
      >
        {isOpen ? <X className="text-black h-6 w-6" /> : <MessageCircle className="text-black h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatBot;
