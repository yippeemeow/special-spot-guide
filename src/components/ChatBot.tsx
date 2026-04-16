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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // دالة الـ ASR باستخدام الـ API المخصص والكي
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");
        formData.append("model", "whisper-1");

        setIsLoading(true);
        try {
          const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              // الكي الخاص بك المذكور سابقاً
              Authorization: "Bearer sk-UIlD4_Pf5iOO8o6_eHNYyg",
            },
            body: formData,
          });
          const data = await res.json();
          if (data.text) setQuery(data.text);
        } catch (error) {
          console.error("خطأ في تحويل الصوت:", error);
        } finally {
          setIsLoading(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("تعذر الوصول للميكروفون:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    const userQuery = query;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setQuery("");
    setIsLoading(true);

    const exhibitionContext = `أنتِ "نهى"، محللة ذكية بلهجة سعودية. قاعدة الزر: لا يظهر زر "اتبع المسار" إلا إذا طلب المستخدم "توجيه" أو "وين" وذكرتِ أنتِ موقعاً محدداً.`;

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
        { role: "assistant", content: data.choices?.[0]?.message?.content || "عذراً.." },
      ]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "خطأ بالاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (content: string) => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("map-navigate", { detail: { location: content } }));
  };

  return (
    <div className="absolute bottom-20 left-4 z-[100] flex flex-col items-start font-sans" dir="rtl">
      {isOpen && (
        <div className="mb-4 w-[320px] bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#00B4D8]/30 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-[#00B4D8] p-4 flex justify-between items-center text-[#1A1A2E]">
            <span className="font-bold text-sm">نهى | المحللة الفورية</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="p-4 h-[350px] overflow-y-auto space-y-4 no-scrollbar">
            {messages.map((msg, index) => {
              // شرط ذكي: يظهر الزر فقط إذا كان المستخدم يطلب توجيه ونهى ردت بمكان
              const userAskedToGuide =
                messages[index - 1]?.content.includes("وجهني") || messages[index - 1]?.content.includes("وين");
              const isLocationMentioned = msg.content.match(/مسرح|بوث|منطقة|موقع|البيك|كودو/);

              return (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`p-3 rounded-xl text-[13px] max-w-[85%] ${msg.role === "user" ? "bg-[#00B4D8] text-[#1A1A2E]" : "bg-[#252545] text-white border border-white/10"}`}
                  >
                    {msg.content}
                    {msg.role === "assistant" && userAskedToGuide && isLocationMentioned && (
                      <button
                        onClick={() => handleNavigate(msg.content)}
                        className="mt-3 w-full bg-[#00B4D8] text-[#1A1A2E] py-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-2"
                      >
                        <Navigation className="h-3 w-3" /> اتبع المسار في الخريطة
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-end p-2">
                <Loader2 className="h-4 w-4 text-[#00B4D8] animate-spin" />
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2 items-center bg-[#1A1A2E]">
            <button
              onClick={toggleRecording}
              className={`p-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse text-white" : "bg-white/5 text-[#00B4D8]"}`}
            >
              <Mic className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اسأل نهى..."
              className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-[13px] text-white focus:outline-none"
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
        className="w-14 h-14 bg-[#00B4D8] rounded-full flex items-center justify-center border-2 border-white/20"
      >
        {isOpen ? <X className="text-[#1A1A2E] h-6 w-6" /> : <MessageCircle className="text-[#1A1A2E] h-7 w-7" />}
      </button>
    </div>
  );
};

export default ChatBot;
