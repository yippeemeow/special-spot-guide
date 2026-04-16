import { useState, useRef, useEffect } from "react";
import { Mic, Send, Loader2, MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً بك! أنا نهى، كيف أساعدك اليوم في فعاليات علم للابتكار الرقمي؟" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // مصفوفة الفعاليات بناءً على جدولك (المسرح ومنطقة الأطفال)
  const exhibitionEvents = [
    // فعاليات المسرح
    { title: "الافتتاح الرسمي", location: "المسرح الرئيسي", time: "16:30" },
    { title: "جلسة: مستقبل الحلول الرقمية", location: "المسرح الرئيسي", time: "17:15" },
    { title: "عرض: تسهيل الخدمات الرقمية", location: "المسرح الرئيسي", time: "18:15" },
    { title: "ورشة: الابتكار في تجربة المستخدم", location: "المسرح الرئيسي", time: "19:15" },
    { title: "جلسة حوارية: التقنية والذكاء الاصطناعي", location: "المسرح الرئيسي", time: "20:15" },
    { title: "مسابقة تفاعلية مباشرة", location: "المسرح الرئيسي", time: "21:15" },
    { title: "الختام والتكريم", location: "المسرح الرئيسي", time: "22:15" },
    // فعاليات منطقة الأطفال
    { title: "فعالية التلوين التقني", location: "منطقة الأطفال", time: "16:00" },
    { title: "نشاط تركيب وبناء", location: "منطقة الأطفال", time: "17:15" },
    { title: "ورشة الأطفال: التقنية ببساطة", location: "منطقة الأطفال", time: "18:15" },
    { title: "مسابقة أطفال", location: "منطقة الأطفال", time: "19:15" },
    { title: "ركن الرسم الحر", location: "منطقة الأطفال", time: "20:15" },
    { title: "نشاط تفاعلي ختامي", location: "منطقة الأطفال", time: "21:15" },
  ];

  // محرك التنبيه التلقائي
  useEffect(() => {
    const checkEvents = () => {
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentTimeInMinutes = currentH * 60 + currentM;

      exhibitionEvents.forEach((event) => {
        const [eventH, eventM] = event.time.split(":").map(Number);
        const eventTimeInMinutes = eventH * 60 + eventM;

        const diff = eventTimeInMinutes - currentTimeInMinutes;

        // تنبيه قبل 5 دقائق بالضبط
        if (diff === 5) {
          const alertMsg = `📢 لا يفوتك! بعد 5 دقائق بتبدأ فعالية "${event.title}" في ${event.location}. تحب أرسم لك المسار أسرع؟`;

          setMessages((prev) => {
            // منع تكرار الرسالة في نفس الدقيقة
            if (prev[prev.length - 1].content !== alertMsg) {
              return [...prev, { role: "assistant", content: alertMsg }];
            }
            return prev;
          });
        }
      });
    };

    const timer = setInterval(checkEvents, 60000); // يفحص كل دقيقة
    return () => clearInterval(timer);
  }, []);

  // تحديث السياق الخاص بنهى ليشمل كل تفاصيل الجدول الجديد
  const exhibitionContext = `
    أنتِ "نهى"، مساعدة ذكية لمعرض علم للابتكار.
    معلوماتك المحدثة:
    - المسرح الرئيسي: يبدأ بالافتتاح (4:30م) وينتهي بالتكريم (10:15م).
    - البوثات: الحلول الرقمية، البيانات والأمن، الابتكار، والمستقبل التقني (تعمل من 4:00م إلى 11:00م).
    - المطاعم: متوفر كودو، البيك، وكوفي شوب.
    - منطقة الأطفال: تقدم التلوين التقني وورش التركيب (تبدأ 4:00م).
    القواعد: ردي باللهجة السعودية البيضاء، كوني حماسية، وإذا سألك أحد عن موقع، ذكّريه أنك تقدرين ترسمين له المسار على الخريطة.
  `;

  // ... (بقية دوال الإرسال و ASR كما هي)

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start font-sans" dir="rtl">
      {/* واجهة الشات والتحسينات البصرية */}
      {/* ... (نفس كود التصميم السابق) */}
    </div>
  );
};

export default ChatBot;
