import { llmsFull } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFull() + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
