"use client";

import { useEffect, useRef, useState } from "react";
import { cannedAnswers, sourceFor, type Source } from "@/lib/ask-answers";
import { Icon } from "./Icon";

const loopLines = ["ho-l1", "ho-l2", "ho-l3"];
const MAX_QUESTION = 280;

type Live = { question: string; answer: string; sources: Source[]; status: "thinking" | "streaming" | "done" };

// The model ends its answer with [[sources: /work /projects]]. Hide that marker while it streams.
function splitAnswer(raw: string): { text: string; sources: Source[] } {
  const at = raw.indexOf("[[");
  if (at === -1) return { text: raw.replace(/\[$/, ""), sources: [] };
  const tail = raw.slice(at).match(/^\[\[\s*sources:\s*([^\]]*)\]\]/i);
  const sources = (tail?.[1] ?? "")
    .split(/[\s,]+/)
    .map(sourceFor)
    .filter((s, i, all): s is Source => !!s && all.findIndex((o) => o?.href === s.href) === i)
    .slice(0, 3);
  return { text: raw.slice(0, at).trimEnd(), sources };
}

export function AskPanel({ onUnavailable }: { onUnavailable: () => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [live, setLive] = useState<Live | null>(null);
  const [flip, setFlip] = useState(false);
  const [draft, setDraft] = useState("");
  const [full, setFull] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const fullButton = useRef<HTMLButtonElement>(null);

  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [full]);

  const arrive = flip ? "m-in-b" : "m-in";
  const looping = picked === null && live === null;

  const pick = (i: number) => {
    abort.current?.abort();
    setLive(null);
    setPicked(i);
    setFlip((f) => !f);
  };

  const send = async () => {
    const question = draft.trim().slice(0, MAX_QUESTION);
    if (!question || live?.status === "thinking" || live?.status === "streaming") return;
    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;
    setDraft("");
    setPicked(null);
    setFlip((f) => !f);
    setLive({ question, answer: "", sources: [], status: "thinking" });

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      if (res.status === 429 || res.status === 503) return onUnavailable();
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        const { text } = splitAnswer(raw);
        setLive((l) => l && { ...l, answer: text, status: text ? "streaming" : "thinking" });
      }
      const { text, sources } = splitAnswer(raw);
      setLive((l) => l && { ...l, answer: text || "I couldn’t find that on the site.", sources, status: "done" });
    } catch (err) {
      if (controller.signal.aborted) return;
      setLive((l) => l && { ...l, answer: "That didn’t go through. Try again in a moment.", status: "done" });
    }
  };

  const canned = cannedAnswers[picked ?? 0];
  const question = live ? live.question : canned.question;
  const thinking = looping || live?.status === "thinking";

  return (
    <section className={`ask-panel${full ? " is-full" : ""}`} aria-label="Ask about Will">
      <div className="ask-panel__head">
        <span className="caption" style={{ fontWeight: 500 }}>
          Ask about Will
        </span>
        <button
          ref={fullButton}
          className="gr-btn gr-btn--ghost gr-btn--icon"
          type="button"
          aria-label={full ? "Close full screen" : "Open full screen"}
          aria-expanded={full}
          onClick={() => setFull((f) => !f)}
        >
          <Icon name={full ? "x" : "maximize"} />
        </button>
      </div>

      <div key={`q-${flip}`} className={`ask-q ${looping ? "ho-q" : arrive}`}>
        {question}
      </div>

      <div className="ask-body" aria-live="polite">
        {thinking && (
          <div className={`ask-think${looping ? " ho-think is-loop" : ` ${arrive}`}`} aria-hidden={looping}>
            Thinking <span className="ho-dot">·</span>
            <span className="ho-dot">·</span>
            <span className="ho-dot">·</span>
          </div>
        )}
        {live ? (
          live.answer && <p className="ask-answer">{live.answer}</p>
        ) : (
          <p key={`a-${flip}`} className="ask-answer">
            {canned.chunks.map((text, i) => (
              <span key={i} className={looping ? loopLines[i] : arrive} style={{ "--i": i * 4, display: "inline" } as React.CSSProperties}>
                {text}
              </span>
            ))}
          </p>
        )}
        {(live ? live.sources : canned.sources).length > 0 && (
          <div key={`s-${flip}`} className="ask-sources">
            {(live ? live.sources : canned.sources).map((s, i) => (
              <a
                key={s.href}
                className={`ask-source ${looping ? "ho-src" : arrive}`}
                href={s.href}
                style={{ "--i": (live ? 0 : 14) + i } as React.CSSProperties}
              >
                <img src={s.icon} alt="" />
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="ask-foot">
        <div className="ask-chips">
          {cannedAnswers.map((a, i) => (
            <button
              key={a.chip}
              className="gr-btn gr-btn--outline ask-chip"
              type="button"
              aria-pressed={picked === i}
              onClick={() => pick(i)}
            >
              <span>{a.chip}</span>
            </button>
          ))}
        </div>
        <form
          className="ask-composer"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            className="ask-input"
            type="text"
            aria-label="Ask a question about Will"
            placeholder="Ask about Will"
            value={draft}
            maxLength={MAX_QUESTION}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button className="ask-send" type="submit" aria-label="Send question" disabled={!draft.trim()}>
            <Icon name="arrowUp" />
          </button>
        </form>
      </div>
    </section>
  );
}
