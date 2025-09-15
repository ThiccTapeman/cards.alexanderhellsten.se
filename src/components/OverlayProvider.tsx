import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type OverlayState = {
  ui: string[];
  close: (name: string) => void;
  open: (ui: string) => void;
};

type OverlayAPI = {
  open: ((ui: string) => void) | null;
  close: ((name: string) => void) | null;
};

export const Overlay: OverlayAPI = {
  open: null,
  close: null,
};

const OverlayContext = createContext<OverlayState | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [ui, setUi] = useState<string[]>([]);

  function open(name: string) {
    setUi((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }

  function close(name: string) {
    setUi((prev) => prev.filter((item) => item !== name));
  }

  useEffect(() => {
    Overlay.open = open;
    Overlay.close = close;
    return () => {
      Overlay.open = null;
      Overlay.close = null;
    };
  }, []);

  return (
    <OverlayContext.Provider value={{ ui, open, close }}>
      <div className="fixed top-0 left-0 w-screen h-screen">{children}</div>
    </OverlayContext.Provider>
  );
}

export function useOverlay(name: string, showAlways: boolean = false) {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("Must be inside OverlayProvider");
  return {
    isActive: ctx.ui.includes(name) || showAlways,
    open: (n: string) => ctx.open(n),
    close: () => ctx.close(name),
  };
}
