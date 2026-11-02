"use client";

import { useState } from "react";
import { AskPanel } from "./AskPanel";

// Ask about Will while the AI Gateway has credit; the card pile when it does not, or if a
// question is refused mid-visit (out of credit or rate-limited). The swap has no error message.
export function HeroStage({ askAvailable, fallback }: { askAvailable: boolean; fallback: React.ReactNode }) {
  const [ask, setAsk] = useState(askAvailable);
  return (
    <div className="hero-stage m-in" style={{ "--i": 2 } as React.CSSProperties}>
      {ask ? <AskPanel onUnavailable={() => setAsk(false)} /> : fallback}
    </div>
  );
}
