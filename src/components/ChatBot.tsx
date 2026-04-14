import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const getAnswer = (question: string, lang: string): string => {
  const q = question.toLowerCase();

  const answers: { keywords: string[]; ar: string; en: string }[] = [
    {
      keywords: ["مسرح", "stage", "المسرح"],
      ar: "المسرح الرئيسي يقع في منتصف الفعالية، على بعد 50 متر من موقعك الحالي. يُقدَّم فيه حفل الافتتاح والجلسات الحوارية.",
      en: "The Main Stage is located in the center of the venue, 50m from your current location. It hosts the opening ceremony and panel discussions.",
    },
    {
      keywords: ["مطعم", "مطاعم", "restaurant", "اكل", "أكل", "food", "بيك", "كودو", "shawarmer", "شاورم"],
      ar: "منطقة المطاعم تبعد 80 متر وتضم: البيك (دجاج مقلي وبروستد)، كودو (برجر وساندويتشات)، شاورمر (شاورما وفلافل)، ومايسترو بيتزا (بيتزا وباستا).",
      en: "The restaurant area is 80m away and includes: Al Baik (fried chicken), Kudu (burgers & sandwiches), Shawarmer (shawarma & falafel), and Maestro Pizza.",
    },
    {
      keywords: ["دورة مياه", "حمام", "restroom", "bathroom", "toilet"],
      ar: "دورات المياه متوفرة للرجال والنساء، وتقع في المنطقة الوسطى على بعد حوالي 30-35 متر من موقعك.",
      en: "Restrooms are available for both men and women, located in the middle area about 30-35m from your location.",
    },
    {
      keywords: ["مصلى", "صلاة", "prayer", "pray"],
      ar: "المصليات متوفرة للرجال (45م) والنساء (50م) في المنطقة الوسطى بالقرب من دورات المياه.",
      en: "Prayer rooms are available for men (45m) and women (50m) in the middle area near the restrooms.",
    },
    {
      keywords: ["طفل", "أطفال", "اطفال", "children", "kids", "child"],
      ar: "منطقة الأطفال تبعد 120 متر وتقدم فعاليات مثل التلوين التقني وركن الروبوتات ومسابقة الألغاز الرقمية.",
      en: "The children's area is 120m away and offers activities like tech coloring, robot corner, and digital puzzle contests.",
    },
    {
      keywords: ["وقت", "موعد", "مواعيد", "time", "schedule", "متى"],
      ar: "الفعالية تبدأ الساعة 4:00 م وتنتهي 11:00 م. الافتتاح 4:30-5:00 م، التلوين التقني 4:00-5:00 م، مستقبل الحلول الرقمية 5:15-6:00 م.",
      en: "The event runs from 4:00 PM to 11:00 PM. Opening: 4:30-5:00 PM, Tech Coloring: 4:00-5:00 PM, Digital Future: 5:15-6:00 PM.",
    },
    {
      keywords: ["بوث", "بوثات", "booth", "حلول رقمية", "أمن", "ابتكار"],
      ar: "البوثات تضم: الحلول الرقمية (30م)، البيانات والأمن (45م)، الابتكار والتجربة (60م)، والمستقبل التقني. كلها في المنطقة الوسطى.",
      en: "Booths include: Digital Solutions (30m), Data & Security (45m), Innovation & UX (60m), and Tech Future. All in the middle area.",
    },
    {
      keywords: ["إسعاف", "اسعاف", "first aid", "طوارئ", "emergency"],
      ar: "الإسعافات الأولية موجودة على بعد 60 متر في المنطقة الوسطى من الخريطة.",
      en: "First Aid is located 60m away in the middle area of the map.",
    },
    {
      keywords: ["استعلام", "معلومات", "information", "info", "استقبال", "reception"],
      ar: "مكتب الاستعلامات والاستقبال يقعان عند المدخل الرئيسي، على بعد أمتار قليلة من موقعك.",
      en: "The information desk and reception are at the main entrance, just a few meters from your location.",
    },
    {
      keywords: ["زحمة", "ازدحام", "crowd", "مزدحم", "فاضي"],
      ar: "يمكنك استخدام خاصية 'رادار الحشود' في أعلى صفحة الخريطة لمعرفة الأماكن المزدحمة والهادئة بالألوان مباشرة.",
      en: "You can use the 'Crowd Radar' feature at the top of the map page to see crowded and quiet areas with color coding.",
    },
  ];

  for (const a of answers) {
    if (a.keywords.some((k) => q.includes(k))) {
      return lang === "ar" || lang === "ur" ? a.ar : a.en;
    }
  }

  return lang === "ar" || lang === "ur"
    ? "مرحبًا! أنا مساعدك الذكي في فعالية علم. يمكنك سؤالي عن المواقع، المواعيد، المطاعم، دورات المياه، البوثات، أو أي شيء يخص الفعالية! 😊"
    : "Hi! I'm your smart assistant at the Elm event. Ask me about locations, schedules, restaurants, restrooms, booths, or anything about the event! 😊";
};

const ChatBot = () => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: lang === "ar" || lang === "ur"
            ? "أهلاً! أنا مساعدك الذكي 🤖\nاسألني عن أي شيء يخص الفعالية: المواقع، المواعيد، المطاعم، الخدمات..."
            : "Hello! I'm your smart assistant 🤖\nAsk me about anything: locations, schedules, restaurants, services...",
          sender: "bot",
        },
      ]);
    }
  }, [isOpen, lang]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = lang === "ar" || lang === "ur"
        ? "أنت مساعد ذكي لفعالية شركة علم للابتكار الرقمي. أجب بشكل مختصر ومفيد عن الفعاليات والمواقع والمطاعم والخدمات والمواعيد. الفعالية من 4:00 م إلى 11:00 م. تضم مسرح رئيسي وبوثات تقنية ومنطقة أطفال ومطاعم (البيك، كودو، شاورمر، مايسترو بيتزا) وخدمات (دورات مياه، مصليات، إسعافات أولية، استعلامات)."
        : "You are a smart assistant for the Elm Digital Innovation event. Answer briefly about events, locations, restaurants, services, and schedules. The event runs 4:00 PM to 11:00 PM. It includes a main stage, tech booths, children's area, restaurants (Al Baik, Kudu, Shawarmer, Maestro Pizza), and services (restrooms, prayer rooms, first aid, info desk).";

      const res = await fetch("https://elmodels.ngrok.app/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "sk-UIlD4_Pf5iOO8o6_eHNYyg",
        },
        body: JSON.stringify({
          model: "nuha-2.0",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices[0]?.message?.content) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: data.choices[0].message.content, sender: "bot" },
        ]);
      } else {
        // Fallback to local answers
        const answer = getAnswer(input, lang);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: answer, sender: "bot" },
        ]);
      }
    } catch {
      // Fallback to local answers on network error
      const answer = getAnswer(input, lang);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: answer, sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-xl transition-transform hover:scale-110 glow-neon"
          style={{ background: "var(--gradient-neon)" }}
        >
          <Bot className="h-7 w-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[70vh] flex-col rounded-t-3xl border-t border-primary/20 bg-card shadow-2xl">
          <div className="flex items-center justify-between rounded-t-3xl px-5 py-4" style={{ background: "var(--gradient-header)" }}>
            <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary-foreground">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="text-sm font-bold text-glow">{t("chatAssistant")}</span>
              <Bot className="h-5 w-5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "text-primary-foreground rounded-bl-sm"
                      : "bg-muted text-foreground rounded-br-sm"
                  }`}
                  style={msg.sender === "user" ? { background: "var(--gradient-cta)" } : undefined}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-muted text-foreground rounded-br-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {lang === "ar" || lang === "ur" ? "جاري التفكير..." : "Thinking..."}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-primary/15 px-4 py-3 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-foreground disabled:opacity-50"
                style={{ background: "var(--gradient-cta)" }}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("chatPlaceholder")}
                className="flex-1 rounded-xl border border-primary/20 bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
