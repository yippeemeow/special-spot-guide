import { useState, useRef, useEffect } from "react";
import { Accessibility, Plus, Minus, RotateCcw, X, Eye } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize, colorBlindMode, setColorBlindMode } = useAccessibility();
  const { lang } = useLanguage();

  const isAr = lang === "ar";

  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const computeInitial = () => {
      const root = document.getElementById("root");
      const rect = root?.getBoundingClientRect();
      const right = rect?.right ?? window.innerWidth;
      const bottom = rect?.bottom ?? window.innerHeight;
      const left = rect?.left ?? 0;
      const size = 48;
      // Place above bottom nav (~64px) + chatbot area, on the right side
      setPosition({
        x: Math.max(left + 16, right - size - 16),
        y: Math.max(16, bottom - size - 160),
      });
    };
    computeInitial();
    window.addEventListener("resize", computeInitial);
    return () => window.removeEventListener("resize", computeInitial);
  }, []);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (clientX: number, clientY: number) => {
      if (!draggingRef.current) return;
      movedRef.current = true;
      const size = 48;
      const root = document.getElementById("root");
      const rect = root?.getBoundingClientRect();
      const minX = rect?.left ?? 0;
      const minY = rect?.top ?? 0;
      const maxX = (rect?.right ?? window.innerWidth) - size;
      const maxY = (rect?.bottom ?? window.innerHeight) - size;
      const x = Math.min(Math.max(minX, clientX - offsetRef.current.x), maxX);
      const y = Math.min(Math.max(minY, clientY - offsetRef.current.y), maxY);
      setPosition({ x, y });
    };
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleEnd = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    if (!position) return;
    draggingRef.current = true;
    movedRef.current = false;
    offsetRef.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const colorModes = [
    { key: "none" as const, label: isAr ? "عادي" : "Normal", color: "bg-primary" },
    { key: "protanopia" as const, label: isAr ? "بروتانوبيا" : "Protanopia", color: "bg-red-400" },
    { key: "deuteranopia" as const, label: isAr ? "ديوتيرانوبيا" : "Deuteranopia", color: "bg-green-400" },
    { key: "tritanopia" as const, label: isAr ? "تريتانوبيا" : "Tritanopia", color: "bg-blue-400" },
  ];

  return (
    <>
      {/* Floating draggable button */}
      <button
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onClick={() => {
          if (movedRef.current) return;
          setIsOpen(true);
        }}
        style={{
          left: position?.x ?? 16,
          top: position?.y ?? 16,
          touchAction: "none",
          zIndex: 9999,
          visibility: position ? "visible" : "hidden",
        }}
        className="fixed flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing"
        aria-label={isAr ? "إعدادات إمكانية الوصول" : "Accessibility settings"}
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {/* Panel overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/40" onClick={() => setIsOpen(false)}>
          <div
            className="w-full max-w-md rounded-t-3xl bg-card p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-card-foreground">
                {isAr ? "إمكانية الوصول" : "Accessibility"}
              </h2>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold text-card-foreground">
                {isAr ? "حجم الخط" : "Font Size"}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseFontSize}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-card-foreground transition-colors hover:bg-accent"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-card-foreground">{fontSize}%</span>
                </div>
                <button
                  onClick={increaseFontSize}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-card-foreground transition-colors hover:bg-accent"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  onClick={resetFontSize}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-accent"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Color Blind Mode */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-card-foreground" />
                <p className="text-sm font-semibold text-card-foreground">
                  {isAr ? "وضع عمى الألوان" : "Color Blind Mode"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {colorModes.map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setColorBlindMode(mode.key)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      colorBlindMode === mode.key
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card"
                        : "bg-muted text-card-foreground hover:bg-accent"
                    }`}
                  >
                    <span className={`h-3 w-3 rounded-full ${mode.color}`} />
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;
