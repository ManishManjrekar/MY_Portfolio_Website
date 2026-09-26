"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Mode = "recruiter" | "architect";
type Ctx = { mode: Mode; setMode: (m: Mode) => void };

const ModeContext = createContext<Ctx>({ mode: "recruiter", setMode: () => {} });

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("recruiter");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("mode");
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem("mode");
    } catch {}
    const initial = fromUrl ?? stored;
    if (initial === "architect" || initial === "recruiter") setModeState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    try {
      window.localStorage.setItem("mode", m);
    } catch {}
  }, []);

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);

export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode();
  return (
    <div className={`mode-toggle${compact ? " compact" : ""}`} role="group" aria-label="Choose how much detail to show">
      <button type="button" aria-pressed={mode === "recruiter"} onClick={() => setMode("recruiter")}>
        Recruiter
      </button>
      <button type="button" aria-pressed={mode === "architect"} onClick={() => setMode("architect")}>
        Architect
      </button>
    </div>
  );
}
