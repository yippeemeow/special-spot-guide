import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// All searchable content in the app with their map targets
const appContent = [
  // Stage events
  { section: "المسرح", title_ar: "الافتتاح الرسمي", title_en: "Official Opening", desc_ar: "ترحيب بالحضور، تقديم عن فعالية علم، وعرض مرئي افتتاحي", mapTarget: "mainStage", type: "stage" },
  { section: "المسرح", title_ar: "مستقبل الحلول الرقمية في السعودية", title_en: "Future of Digital Solutions in KSA", desc_ar: "جلسة عن التحول الرقمي، ودور التقنية في تطوير الخدمات", mapTarget: "mainStage", type: "stage" },
  { section: "المسرح", title_ar: "كيف تسهّل الخدمات الرقمية حياة الأفراد؟", title_en: "How Digital Services Simplify Lives?", desc_ar: "عرض يوضح أمثلة تطبيقية للخدمات الرقمية", mapTarget: "mainStage", type: "stage" },
  { section: "المسرح", title_ar: "الابتكار في تجربة المستخدم", title_en: "Innovation in User Experience", desc_ar: "ورشة مصغرة عن بناء الخدمات الرقمية", mapTarget: "mainStage", type: "stage" },
  { section: "المسرح", title_ar: "التقنية والذكاء الاصطناعي في الخدمات", title_en: "Technology and AI in Services", desc_ar: "جلسة حوارية عن استخدام الذكاء الاصطناعي", mapTarget: "mainStage", type: "stage" },
  { section: "المسرح", title_ar: "مسابقة تفاعلية مباشرة", title_en: "Live Interactive Contest", desc_ar: "مسابقة مباشرة تتضمن أسئلة تقنية", mapTarget: "mainStage", type: "stage" },
  { section: "المسرح", title_ar: "الختام والتكريم", title_en: "Closing & Awards", desc_ar: "ختام الفعالية مع شكر المشاركين", mapTarget: "mainStage", type: "stage" },

  // Kids activities
  { section: "الأطفال", title_ar: "فعالية التلوين التقني", title_en: "Tech Coloring Activity", desc_ar: "نشاط تلوين للأطفال برسومات مرتبطة بالروبوتات والتقنية", mapTarget: "childrenArea", type: "kids" },
  { section: "الأطفال", title_ar: "نشاط تركيب وبناء", title_en: "Building & Assembly", desc_ar: "نشاط تفاعلي يعتمد على ألعاب التركيب والتحديات", mapTarget: "childrenArea", type: "kids" },
  { section: "الأطفال", title_ar: "ورشة الأطفال: التقنية ببساطة", title_en: "Kids Workshop: Tech Simply", desc_ar: "ورشة مبسطة تعرّف الأطفال بمفهوم التقنية", mapTarget: "childrenArea", type: "kids" },
  { section: "الأطفال", title_ar: "مسابقة أطفال", title_en: "Kids Contest", desc_ar: "مسابقة خفيفة تضم أسئلة وألعاب جماعية", mapTarget: "childrenArea", type: "kids" },
  { section: "الأطفال", title_ar: "ركن الرسم الحر", title_en: "Free Drawing Corner", desc_ar: "مساحة مفتوحة للرسم والتلوين", mapTarget: "childrenArea", type: "kids" },
  { section: "الأطفال", title_ar: "النشاط التفاعلي الختامي للأطفال", title_en: "Kids Closing Activity", desc_ar: "نشاط ختامي جماعي يتضمن ألعابًا خفيفة", mapTarget: "childrenArea", type: "kids" },

  // Booths
  { section: "البوثات", title_ar: "بوث الحلول الرقمية", title_en: "Digital Solutions Booth", desc_ar: "يعرّف الزوار بالحلول الرقمية الذكية", mapTarget: "digitalSolutions", type: "booth" },
  { section: "البوثات", title_ar: "بوث البيانات والأمن الرقمي", title_en: "Data & Digital Security Booth", desc_ar: "يركز على حماية البيانات والأمن السيبراني والخصوصية الرقمية", mapTarget: "dataSecurity", type: "booth" },
  { section: "البوثات", title_ar: "بوث الابتكار وتجربة المستخدم", title_en: "Innovation & UX Booth", desc_ar: "يوضح كيف يتم تصميم خدمات رقمية سهلة", mapTarget: "innovationUX", type: "booth" },
  { section: "البوثات", title_ar: "بوث المستقبل التقني", title_en: "Tech Future Booth", desc_ar: "يستعرض تقنيات مستقبلية مثل الذكاء الاصطناعي", mapTarget: "techFuture", type: "booth" },

  // Booth workshops
  { section: "البوثات", title_ar: "ورشة التحول الرقمي", title_en: "Digital Transformation Workshop", desc_ar: "ورشة قصيرة تشرح كيف تسهّل الحلول الرقمية الإجراءات", mapTarget: "digitalSolutions", type: "workshop", parent: "بوث الحلول الرقمية" },
  { section: "البوثات", title_ar: "ورشة الخدمات الذكية", title_en: "Smart Services Workshop", desc_ar: "شرح مبسط للخدمات الذكية", mapTarget: "digitalSolutions", type: "workshop", parent: "بوث الحلول الرقمية" },
  { section: "البوثات", title_ar: "ورشة الأمن السيبراني", title_en: "Cybersecurity Workshop", desc_ar: "ورشة تعريفية عن الأمن السيبراني وأساسيات حماية البيانات", mapTarget: "dataSecurity", type: "workshop", parent: "بوث البيانات والأمن الرقمي" },
  { section: "البوثات", title_ar: "ورشة الخصوصية الرقمية", title_en: "Digital Privacy Workshop", desc_ar: "توعية الزوار بأهمية الخصوصية الرقمية", mapTarget: "dataSecurity", type: "workshop", parent: "بوث البيانات والأمن الرقمي" },
  { section: "البوثات", title_ar: "ورشة تصميم تجربة المستخدم", title_en: "UX Design Workshop", desc_ar: "ورشة عن تصميم الخدمات الرقمية بطريقة سهلة", mapTarget: "innovationUX", type: "workshop", parent: "بوث الابتكار وتجربة المستخدم" },
  { section: "البوثات", title_ar: "ورشة الابتكار في الواجهات", title_en: "Interface Innovation Workshop", desc_ar: "عرض عملي لأفكار مبتكرة في تصميم الواجهات", mapTarget: "innovationUX", type: "workshop", parent: "بوث الابتكار وتجربة المستخدم" },
  { section: "البوثات", title_ar: "ورشة الذكاء الاصطناعي", title_en: "AI Workshop", desc_ar: "ورشة تعريفية عن الذكاء الاصطناعي واستخداماته", mapTarget: "techFuture", type: "workshop", parent: "بوث المستقبل التقني" },
  { section: "البوثات", title_ar: "ورشة الأنظمة الذكية", title_en: "Smart Systems Workshop", desc_ar: "شرح مبسط للأنظمة الذكية ودورها في تحسين الخدمات", mapTarget: "techFuture", type: "workshop", parent: "بوث المستقبل التقني" },

  // Restaurants
  { section: "المطاعم", title_ar: "منطقة المطاعم", title_en: "Restaurant Area", desc_ar: "منطقة المطاعم والمأكولات", mapTarget: "restaurantArea", type: "restaurant" },
  { section: "المطاعم", title_ar: "مطعم كودو", title_en: "Kudu Restaurant", desc_ar: "برجر وساندويتشات ومشروبات", mapTarget: "restaurantArea", type: "restaurant" },
  { section: "المطاعم", title_ar: "كوفي شوب", title_en: "Coffee Shop", desc_ar: "قهوة ومشروبات ساخنة وباردة", mapTarget: "restaurantArea", type: "restaurant" },
  { section: "المطاعم", title_ar: "مطعم البيك", title_en: "Al Baik Restaurant", desc_ar: "دجاج مقلي وبروستد ووجبات عائلية", mapTarget: "restaurantArea", type: "restaurant" },
  { section: "المطاعم", title_ar: "التموينات", title_en: "Convenience Store", desc_ar: "مواد غذائية ومشروبات ووجبات خفيفة", mapTarget: "restaurantArea", type: "restaurant" },

  // Services
  { section: "الخدمات", title_ar: "مصلى نساء", title_en: "Women's Prayer Room", desc_ar: "مصلى مخصص للنساء للصلاة", mapTarget: "womenPrayer", type: "service", keywords: "صلاة نساء مسجد عبادة" },
  { section: "الخدمات", title_ar: "مصلى رجال", title_en: "Men's Prayer Room", desc_ar: "مصلى مخصص للرجال للصلاة", mapTarget: "menPrayer", type: "service", keywords: "صلاة رجال مسجد عبادة" },
  { section: "الخدمات", title_ar: "دورة مياه نساء", title_en: "Women's Restroom", desc_ar: "دورة مياه مخصصة للنساء", mapTarget: "womenRestroom", type: "service", keywords: "حمام تواليت نساء" },
  { section: "الخدمات", title_ar: "دورة مياه رجال", title_en: "Men's Restroom", desc_ar: "دورة مياه مخصصة للرجال", mapTarget: "menRestroom", type: "service", keywords: "حمام تواليت رجال" },
  { section: "الخدمات", title_ar: "الإسعافات الأولية", title_en: "First Aid", desc_ar: "نقطة إسعافات أولية وطبية", mapTarget: "firstAid", type: "service", keywords: "طبيب مستشفى صحة إصابة دكتور علاج" },
  { section: "الخدمات", title_ar: "الاستعلامات", title_en: "Information Desk", desc_ar: "مكتب استعلامات ومعلومات", mapTarget: "information", type: "service", keywords: "سؤال مساعدة معلومات استفسار" },

  // Locations
  { section: "مواقع", title_ar: "المسرح الرئيسي", title_en: "Main Stage", desc_ar: "المسرح الرئيسي للفعاليات والعروض", mapTarget: "mainStage", type: "location" },
  { section: "مواقع", title_ar: "منطقة الأطفال", title_en: "Children's Area", desc_ar: "منطقة مخصصة لفعاليات وأنشطة الأطفال", mapTarget: "childrenArea", type: "location" },
  { section: "مواقع", title_ar: "المدخل الرئيسي", title_en: "Main Entrance", desc_ar: "المدخل الرئيسي للفعالية", mapTarget: "reception", type: "location" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return new Response(JSON.stringify({ results: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build a compact content index for the AI
    const contentIndex = appContent.map((item, i) => 
      `[${i}] ${item.title_ar} | ${item.title_en} | ${item.desc_ar} | قسم: ${item.section}${item.keywords ? " | " + item.keywords : ""}${item.parent ? " | تابع لـ: " + item.parent : ""}`
    ).join("\n");

    const systemPrompt = `أنت محرك بحث ذكي لتطبيق فعالية "علم للابتكار الرقمي".
مهمتك: فهم نية المستخدم وإرجاع النتائج الأكثر صلة من فهرس المحتوى.

قواعد:
- افهم المعنى وليس فقط الكلمات المطابقة
- إذا كتب المستخدم "وين أصلي" أو "أبي أصلي" → أرجع المصليات
- إذا كتب "جوعان" أو "أبي آكل" → أرجع المطاعم
- إذا كتب "حمام" أو "دورة مياه" → أرجع دورات المياه
- إذا كتب "ورشة" → أرجع الورش ذات الصلة
- إذا كتب بالعامية السعودية، افهم المقصود
- إذا كتب بالإنجليزية، ابحث في العناوين الإنجليزية
- أرجع أرقام الفهرس فقط (أرقام العناصر) مرتبة حسب الأكثر صلة
- أرجع 1-5 نتائج كحد أقصى
- أرجع النتائج كـ JSON array فقط: [0, 3, 5]

فهرس المحتوى:
${contentIndex}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "[]";
    
    // Extract array from AI response
    const match = aiResponse.match(/\[[\d,\s]*\]/);
    const indices: number[] = match ? JSON.parse(match[0]) : [];
    
    const results = indices
      .filter((i: number) => i >= 0 && i < appContent.length)
      .map((i: number) => ({
        title_ar: appContent[i].title_ar,
        title_en: appContent[i].title_en,
        section: appContent[i].section,
        mapTarget: appContent[i].mapTarget,
        type: appContent[i].type,
      }));

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("search error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", results: [] }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
