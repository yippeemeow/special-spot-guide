import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ChatBot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً بك! أنا نهى، كيف أساعدك اليوم في معرض علم؟" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // دالة تحويل الصوت إلى نص (ASR) باستخدام مفتاحك الخاص
  const handleVoiceInput = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

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
          if (data.text) setQuery(data.text);
        } catch (err) {
          console.error("ASR Error:", err);
        } finally {
          setIsRecording(false);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000); // تسجيل لمدة 3 ثوانٍ
    } catch (err) {
      console.error(err);
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
      أنتِ "نهى"، المساعدة الذكية الرسمية لمعرض "علم للابتكار". 
      مهمتك: مساعدة الزوار في معرفة مواقع البوثات والجدول الزمني فقط.
      البيانات: المسرح الرئيسي، بوث البيانات والأمن، بوث الحلول الرقمية، منطقة الأطفال، والمطاعم.
      القواعد: ردي باللهجة السعودية البيضاء، وإذا كان السؤال خارج المعرض اعتذري بلباقة.
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
        { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً، لم أفهم." },
      ]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "خطأ في الاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start font-sans" dir="rtl">
      {isOpen && (
        <div className="mb-3 w-[300px] bg-card/95 backdrop-blur-2xl border border-secondary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-secondary p-3 flex justify-between items-center">
            <span className="text-black font-bold text-xs">نهى الذكية</span>
            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="p-4 h-[250px] overflow-y-auto space-y-3 bg-black/10 no-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`p-2.5 rounded-2xl text-[11px] max-w-[90%] ${msg.role === "user" ? "bg-secondary text-black font-bold" : "bg-white/10 text-white"}`}
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
            {/* إضافة زر المايك (ASR) هنا بجانب حقل الإدخال */}
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
              className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none"
              disabled={isLoading}
            />

            <button onClick={handleSendMessage} disabled={isLoading} className="bg-secondary p-2 rounded-xl text-black">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X className="text-black h-6 w-6" /> : <MessageCircle className="text-black h-6 w-6" />}
      </button>
    </div>
  );
};

export default ChatBot;
