import { Compass, Maximize2, ZoomIn, ZoomOut } from "lucide-react";

const VenueMap = () => {
  return (
    <div className="mt-6 px-5">
      <h2 className="mb-1 text-lg font-bold text-foreground">خريطة الفعالية</h2>
      <p className="mb-3 text-sm text-muted-foreground">استكشف المواقع والمسارات</p>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Map controls */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
            <Compass className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-border">
            <Maximize2 className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-border">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-card text-foreground shadow-md border border-border">
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>

        {/* SVG Map */}
        <div className="p-4">
          <svg viewBox="0 0 400 300" className="w-full" dir="ltr">
            {/* Background */}
            <rect x="20" y="10" width="360" height="280" rx="8" fill="hsl(220, 20%, 96%)" stroke="hsl(240, 10%, 90%)" strokeWidth="1" />

            {/* Main Stage */}
            <rect x="120" y="30" width="120" height="60" rx="6" fill="hsl(270, 30%, 90%)" stroke="hsl(270, 40%, 80%)" strokeWidth="1" />
            <text x="180" y="55" textAnchor="middle" className="text-[8px] font-bold fill-foreground">المسرح الرئيسي</text>
            <text x="180" y="68" textAnchor="middle" className="text-[6px] fill-muted-foreground">Main Stage</text>

            {/* Children's Area */}
            <rect x="50" y="30" width="60" height="60" rx="6" fill="hsl(45, 40%, 90%)" stroke="hsl(45, 40%, 80%)" strokeWidth="1" />
            <text x="80" y="55" textAnchor="middle" className="text-[7px] font-bold fill-foreground">منطقة الأطفال</text>
            <text x="80" y="68" textAnchor="middle" className="text-[6px] fill-muted-foreground">Children's Area</text>

            {/* Restaurants */}
            <rect x="250" y="30" width="60" height="60" rx="6" fill="hsl(35, 40%, 90%)" stroke="hsl(35, 40%, 80%)" strokeWidth="1" />
            <text x="280" y="55" textAnchor="middle" className="text-[7px] font-bold fill-foreground">منطقة المطاعم</text>
            <text x="280" y="68" textAnchor="middle" className="text-[6px] fill-muted-foreground">Restaurants</text>

            {/* Booths Row */}
            <rect x="50" y="110" width="70" height="40" rx="4" fill="hsl(180, 30%, 90%)" stroke="hsl(180, 30%, 80%)" strokeWidth="1" />
            <text x="85" y="130" textAnchor="middle" className="text-[6px] font-bold fill-foreground">بوث الحلول الرقمية</text>
            <text x="85" y="140" textAnchor="middle" className="text-[5px] fill-muted-foreground">Digital Solutions</text>

            <rect x="130" y="110" width="70" height="40" rx="4" fill="hsl(180, 30%, 90%)" stroke="hsl(180, 30%, 80%)" strokeWidth="1" />
            <text x="165" y="130" textAnchor="middle" className="text-[6px] font-bold fill-foreground">بوث البيانات والأمن</text>
            <text x="165" y="140" textAnchor="middle" className="text-[5px] fill-muted-foreground">Data & Security</text>

            <rect x="210" y="110" width="70" height="40" rx="4" fill="hsl(180, 30%, 90%)" stroke="hsl(180, 30%, 80%)" strokeWidth="1" />
            <text x="245" y="130" textAnchor="middle" className="text-[6px] font-bold fill-foreground">بوث الابتكار والتجربة</text>
            <text x="245" y="140" textAnchor="middle" className="text-[5px] fill-muted-foreground">Innovation & UX</text>

            <rect x="290" y="110" width="70" height="40" rx="4" fill="hsl(180, 30%, 90%)" stroke="hsl(180, 30%, 80%)" strokeWidth="1" />
            <text x="325" y="130" textAnchor="middle" className="text-[6px] font-bold fill-foreground">بوث المستقبل التقني</text>
            <text x="325" y="140" textAnchor="middle" className="text-[5px] fill-muted-foreground">Tech Future</text>

            {/* Services Row */}
            <rect x="50" y="170" width="55" height="30" rx="4" fill="hsl(220, 20%, 88%)" stroke="hsl(220, 20%, 78%)" strokeWidth="1" />
            <text x="77" y="187" textAnchor="middle" className="text-[5px] fill-foreground">الإسعافات الأولية</text>

            <rect x="115" y="170" width="45" height="30" rx="4" fill="hsl(220, 20%, 88%)" stroke="hsl(220, 20%, 78%)" strokeWidth="1" />
            <text x="137" y="187" textAnchor="middle" className="text-[5px] fill-foreground">دورة مياه رجال</text>

            <rect x="170" y="170" width="45" height="30" rx="4" fill="hsl(220, 20%, 88%)" stroke="hsl(220, 20%, 78%)" strokeWidth="1" />
            <text x="192" y="187" textAnchor="middle" className="text-[5px] fill-foreground">دورة مياه نساء</text>

            <rect x="225" y="170" width="45" height="30" rx="4" fill="hsl(220, 20%, 88%)" stroke="hsl(220, 20%, 78%)" strokeWidth="1" />
            <text x="247" y="187" textAnchor="middle" className="text-[5px] fill-foreground">مصلى رجال</text>

            <rect x="280" y="170" width="45" height="30" rx="4" fill="hsl(220, 20%, 88%)" stroke="hsl(220, 20%, 78%)" strokeWidth="1" />
            <text x="302" y="187" textAnchor="middle" className="text-[5px] fill-foreground">مصلى نساء</text>

            {/* You are here */}
            <circle cx="180" cy="235" r="5" fill="hsl(270, 60%, 45%)" className="animate-pulse-live" />
            <text x="180" y="250" textAnchor="middle" className="text-[6px] font-bold fill-primary">أنت هنا</text>

            {/* Reception & Main entrance */}
            <rect x="140" y="255" width="40" height="25" rx="4" fill="hsl(270, 30%, 92%)" stroke="hsl(270, 30%, 82%)" strokeWidth="1" />
            <text x="160" y="268" textAnchor="middle" className="text-[5px] fill-foreground">الاستقبال</text>
            <text x="160" y="276" textAnchor="middle" className="text-[4px] fill-muted-foreground">Reception</text>

            <rect x="200" y="255" width="50" height="25" rx="4" fill="hsl(270, 30%, 92%)" stroke="hsl(270, 30%, 82%)" strokeWidth="1" />
            <text x="225" y="268" textAnchor="middle" className="text-[5px] fill-foreground">الاستعلامات</text>
            <text x="225" y="276" textAnchor="middle" className="text-[4px] fill-muted-foreground">Information</text>

            {/* Main entrance at bottom */}
            <rect x="145" y="282" width="80" height="8" rx="2" fill="hsl(270, 60%, 45%)" />
            <text x="185" y="289" textAnchor="middle" className="text-[5px] font-bold fill-primary-foreground">المدخل الرئيسي</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-4 border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-event-live animate-pulse-live" /> الآن
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-event-soon" /> فعالية
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" /> خدمة
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-event-upcoming" /> مطاعم
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" /> موقعي
          </span>
        </div>
      </div>
    </div>
  );
};

export default VenueMap;
