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

  // Draggable position (UI only — does not affect chatbot logic/API)
  // Coordinates are RELATIVE to the mobile frame container, not the viewport
  const getFrame = () => (typeof document !== "undefined" ? document.getElementById("mobile-frame") : null);
  const [pos, setPos] = useState<{ x: number; y: number }>(() => ({ x: 15, y: 500 }));

  useEffect(() => {
    // Initialize position to bottom-left of the mobile frame after mount
    const frame = getFrame();
    if (frame) {
      const rect = frame.getBoundingClientRect();
      setPos({ x: 15, y: Math.max(20, rect.height - 140) });
    }
  }, []);

  const dragState = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!dragState.current.dragging) return;
      const frame = getFrame();
      const rect = frame?.getBoundingClientRect();
      const frameLeft = rect?.left ?? 0;
      const frameTop = rect?.top ?? 0;
      const frameW = rect?.width ?? window.innerWidth;
      const frameH = rect?.height ?? window.innerHeight;

      // Convert viewport coords to frame-relative coords
      const relX = clientX - frameLeft - dragState.current.offsetX;
      const relY = clientY - frameTop - dragState.current.offsetY;

      if (Math.abs(clientX - frameLeft - (dragState.current.offsetX + pos.x)) > 3 ||
          Math.abs(clientY - frameTop - (dragState.current.offsetY + pos.y)) > 3) {
        dragState.current.moved = true;
      }
      const x = Math.max(4, Math.min(frameW - 48, relX));
      const y = Math.max(4, Math.min(frameH - 48, relY));
      setPos({ x, y });
    };
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onUp = () => {
      dragState.current.dragging = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [pos.x, pos.y]);

  const startDrag = (clientX: number, clientY: number) => {
    dragState.current = { dragging: true, moved: false, offsetX: clientX - pos.x, offsetY: clientY - pos.y };
  };

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
    <div
      className="fixed z-[9999] flex flex-col-reverse items-start gap-3 font-sans"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      dir="rtl"
    >
      <button
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onClick={() => {
          if (!dragState.current.moved) setIsOpen(!isOpen);
        }}
        className="w-11 h-11 bg-[#00B4D8] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 border-2 border-white/20 touch-none cursor-grab active:cursor-grabbing"
      >
        {isOpen ? <X className="text-[#1A1A2E] h-5 w-5" /> : <MessageCircle className="text-[#1A1A2E] h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="w-[300px] max-w-[calc(100vw-30px)] max-h-[calc(100vh-180px)] bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#00B4D8]/30 rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
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
