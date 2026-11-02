"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "./Icon";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(site.email).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      className="gr-btn gr-btn--secondary gr-btn--lg"
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <Icon name={copied ? "check" : "copy"} />
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
