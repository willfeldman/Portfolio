import { gateway } from "ai";
import { unstable_cache } from "next/cache";

// Ask about Will runs on the AI Gateway's free monthly credit. Two limits keep it from being
// spent in one burst: a floor on the remaining balance, and a cap on what a single day may use
// (measured from the gateway's running total at the first check of each UTC day).
const DAILY_BUDGET_USD = Number(process.env.ASK_DAILY_BUDGET_USD ?? 0.25);
const MIN_BALANCE_USD = Number(process.env.ASK_MIN_BALANCE_USD ?? 0.05);

async function readCredits() {
  const c = await gateway.getCredits();
  return { balance: Number(c.balance), used: Number(c.totalUsed) };
}

const creditsNow = unstable_cache(readCredits, ["ask-credits"], { revalidate: 60 });

const usedAtStartOf = (day: string) =>
  unstable_cache(async () => (await readCredits()).used, ["ask-used-at-start", day], { revalidate: 60 * 60 * 26 })();

export type AskStatus = { available: boolean; reason?: "disabled" | "balance" | "daily" | "unreachable" };

export async function askStatus(): Promise<AskStatus> {
  if (process.env.ASK_DISABLED === "1") return { available: false, reason: "disabled" };
  // Local UI work without gateway credentials: `ASK_ASSUME_AVAILABLE=1 npm run dev`.
  if (process.env.NODE_ENV === "development" && process.env.ASK_ASSUME_AVAILABLE === "1") return { available: true };
  try {
    const day = new Date().toISOString().slice(0, 10);
    const [now, start] = await Promise.all([creditsNow(), usedAtStartOf(day)]);
    if (!(now.balance > MIN_BALANCE_USD)) return { available: false, reason: "balance" };
    if (now.used - start >= DAILY_BUDGET_USD) return { available: false, reason: "daily" };
    return { available: true };
  } catch {
    // No gateway credentials (local dev without `vercel env pull`) or the gateway is down.
    return { available: false, reason: "unreachable" };
  }
}

// A few questions per visitor per window. In memory, so it is per server instance: a speed bump
// in front of the daily cap, not the cap itself.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const recent = new Map<string, number[]>();

export function allowQuestion(visitor: string) {
  const now = Date.now();
  const times = (recent.get(visitor) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) return false;
  times.push(now);
  recent.set(visitor, times);
  if (recent.size > 5000) recent.clear();
  return true;
}
