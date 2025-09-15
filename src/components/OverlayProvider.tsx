import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type OverlayState = {
  ui: string | null;
  close: () => void;
  open: (ui: string) => void;
};

const OverlayContext = createContext<OverlayState | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [ui, setUi] = useState<string | null>(null);

  function open(name: string) {
    setUi(name);
  }

  function close() {
    setUi(null);
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
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay(name: string) {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("Must be inside OverlayProvider");
  return ctx.ui === name;
}
