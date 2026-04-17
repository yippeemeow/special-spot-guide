import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X, Navigation } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "أهلاً بك في فعالية علم.. أنا نهى، محللتك الذكية من تطبيق مسارك. وش حاب تعرف عن جدول المسرح، منطقة الأطفال، أو حتى خيارات الأكل؟",
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
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.webm");
        formData.append("model", "whisper-1");

        setIsLoading(true);
        try {
          const res = await fetch("https://elmodels.ngrok.app/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: "Bearer sk-3EsiB0rLSmv19OoyJ2AJlQ",
              "ngrok-skip-browser-warning": "69420",
            },
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            if (data.text) {
              setQuery(data.text);
              handleSendMessage(data.text);
            }
          } else {
            const errorData = await res.json();
            console.error("Error:", errorData);
          }
        } catch (error) {
          console.error("Network Error:", error);
        } finally {
          setIsLoading(false);
          if (stream) stream.getTracks().forEach((track) => track.stop());
        }
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("الميكروفون غير متاح", err);
    }
  };

  const handleSendMessage = async (textOverride = null) => {
    // 1. تحديد النص: إما القادم من التسجيل أو من المربع
    const messageToSend = typeof textOverride === "string" ? textOverride : query;

    if (!messageToSend.trim() || isLoading) return;

    // 2. تحديث الرسائل في الشاشة
    setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);
    setQuery(""); // تصفير المربع
    setIsLoading(true);

    const exhibitionContext = `
أنتِ "نهى"، المحللة الذكية لفعالية شركة علم للابتكار الرقمي في تطبيق "مسارك".
شخصيتك: سعودية، ذكية، مرحبة، وتساعدين الزوار بدقة.

معلومات الفعالية (قاعدة بياناتك):
1. المسرح الرئيسي: 
- 4:30م: الافتتاح الرسمي.
- 5:15م: جلسة مستقبل الحلول الرقمية.
- 6:15م: عرض تسهيل الخدمات الرقمية.
- 7:15م: ورشة الابتكار في تجربة المستخدم.
- 8:15م: جلسة التقنية والذكاء الاصطناعي.
- 9:15م: مسابقة تفاعلية.
- 10:15م: الختام.

2. منطقة الأطفال: تلوين تقني (4م)، تركيب وبناء (5:15م)، ورشة التقنية ببساطة (6:15م)، مسابقة أطفال (7:15م)، رسم حر (8:15م).

3. البوثات (4م-11م):
- بوث 1: الحلول الرقمية.
- بوث 2: البيانات والأمن الرقمي.
- بوث 3: الابتكار وتجربة المستخدم.
- بوث 4: المستقبل التقني (ذكاء اصطناعي).

4. منطقة المطاعم:
- البيك (بروست، مسحب، برغر).
- كودو (ساندويتشات، وجبات أطفال).
- كوفي شوب (قهوة مختصة، حلى، كرواسون).
- التموينات (سناكس، مشروبات).

5. المرافق: الاستعلامات، الإسعافات الأولية، دورات مياه ومصليات (رجال/نساء). جميعها تعمل من 4م إلى 11م.

قاعدة الزر: إذا سأل المستخدم عن مكان (وين، كيف أروح، وين مكان الـ...) وذكرتِ أنتِ اسماً لمكان موجود أعلاه، سيظهر له زر التوجيه تلقائياً.
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
            { role: "user", content: messageToSend },
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
      setMessages((prev) => [...prev, { role: "assistant", content: "خطأ في الاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (content: string) => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("map-navigate", { detail: { location: content } }));
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col items-end font-sans" dir="rtl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#00B4D8] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 border-2 border-white/20"
      >
        {isOpen ? <X className="text-[#1A1A2E] h-6 w-6" /> : <MessageCircle className="text-[#1A1A2E] h-7 w-7" />}
      </button>
      {isOpen && (
        <div className="mt-4 w-[320px] bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#00B4D8]/30 rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#00B4D8] p-4 flex justify-between items-center text-[#1A1A2E]">
            <span className="font-bold text-sm">نهى | محللة مسارك</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="p-4 h-[350px] overflow-y-auto space-y-4 no-scrollbar text-right">
            {messages.map((msg, index) => {
              // 1. أولاً: نحدد هل "نهى" ذكرت مكان في ردها؟
              const isLocationMentioned = msg.content.match(/مسرح|بوث|منطقة|البيك|كودو|مصلى|إسعاف/);

              // 2. ثانياً: نحدد هل اليوزر أصلاً سأل عن "توجيه" في الرسالة اللي قبلها؟
              // (index - 1) يجلب لنا رسالة المستخدم اللي خلت نهى ترد هذا الرد
              const lastUserMsg = messages[index - 1]?.content || "";
              const userAskedForDirection = lastUserMsg.match(/وين|كيف|وجهني|طريق|موقع/);

              // 3. ثالثاً: نجمع الشروط مع بعض
              // الزر يظهر فقط إذا: (الرسالة من نهى) و (اليوزر سأل عن اتجاه) و (نهى ذكرت مكان)
              const shouldShowButton = msg.role === "assistant" && userAskedForDirection && isLocationMentioned;

              return (
                <div
                  key={index}
                  className={`flex flex-col gap-2 max-w-[85%] rounded-2xl px-4 py-2 text-[13px] ${
                    msg.role === "user"
                      ? "bg-[#00B4D8] text-[#1A1A2E] self-end ml-auto"
                      : "bg-white/10 text-white self-start mr-auto"
                  }`}
                >
                  <span>{msg.content}</span>
                  {shouldShowButton && (
                    <button
                      onClick={() => handleNavigate(msg.content)}
                      className="flex items-center gap-1 mt-1 px-3 py-1.5 bg-[#00B4D8]/20 border border-[#00B4D8]/40 rounded-lg text-[#00B4D8] text-[11px] font-semibold hover:bg-[#00B4D8]/30 transition"
                    >
                      <Navigation className="h-3 w-3" />
                      اتبع المسار في الخريطة
                    </button>
                  )}
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
              placeholder="اسأل نهى عن الفعالية..."
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

    </div>
  );
};

export default ChatBot;
