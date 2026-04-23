import { useState, useRef, useEffect } from "react";
import { Accessibility, Plus, Minus, RotateCcw, X, Eye } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize, colorBlindMode, setColorBlindMode } = useAccessibility();
  const { lang } = useLanguage();

  const isAr = lang === "ar";

  // Draggable state — initial position: right side, middle height
  const [pos, setPos] = useState<{ x: number; y: number }>(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - 60 : 16,
    y: typeof window !== "undefined" ? window.innerHeight - 160 : 600,
  }));
  const dragState = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!dragState.current.dragging) return;
      dragState.current.moved = true;
      const x = Math.max(4, Math.min(window.innerWidth - 48, clientX - dragState.current.offsetX));
      const y = Math.max(4, Math.min(window.innerHeight - 48, clientY - dragState.current.offsetY));
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
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    dragState.current = { dragging: true, moved: false, offsetX: clientX - pos.x, offsetY: clientY - pos.y };
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
          if (!dragState.current.moved) setIsOpen(true);
        }}
        className="fixed flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 touch-none cursor-grab active:cursor-grabbing"
        style={{ left: `${pos.x}px`, top: `${pos.y}px`, zIndex: 10001 }}
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
