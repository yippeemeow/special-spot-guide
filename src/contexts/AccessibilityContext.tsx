import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";

interface AccessibilityContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  colorBlindMode: ColorBlindMode;
  setColorBlindMode: (mode: ColorBlindMode) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

const COLOR_BLIND_FILTERS: Record<ColorBlindMode, string> = {
  none: "none",
  protanopia: "url(#protanopia)",
  deuteranopia: "url(#deuteranopia)",
  tritanopia: "url(#tritanopia)",
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState(100);
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>("none");

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    const filter = COLOR_BLIND_FILTERS[colorBlindMode];
    if (filter === "none") {
      document.documentElement.style.filter = "";
    } else {
      document.documentElement.style.filter = filter;
    }
  }, [colorBlindMode]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 150));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 70));
  const resetFontSize = () => setFontSize(100);

  return (
    <AccessibilityContext.Provider
      value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize, colorBlindMode, setColorBlindMode }}
    >
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
          </filter>
        </defs>
      </svg>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};
