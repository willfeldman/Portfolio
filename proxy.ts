import { NextResponse, type NextRequest } from "next/server";
import { markdownFor, notFoundMarkdown } from "@/lib/markdown";

// Weight of a media type in an Accept header ("text/markdown, text/html;q=0.9" → 1 and 0.9).
function weight(accept: string, type: string) {
  for (const part of accept.split(",")) {
    const [media, ...params] = part.trim().split(";");
    if (media.trim().toLowerCase() !== type) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    return q ? Number(q.slice(2)) || 0 : 1;
  }
  return 0;
}

// Agents that prefer Markdown get each page's Markdown twin at the same URL. The proxy answers
// those requests itself, so both answers can say they vary by Accept (Next.js replaces Vary on
// responses it renders).
export function proxy(req: NextRequest) {
  const accept = req.headers.get("accept") ?? "";
  const md = weight(accept, "text/markdown");
  if (md === 0 || md < weight(accept, "text/html")) {
    const res = NextResponse.next();
    res.headers.set("Vary", "Accept, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch");
    return res;
  }
  const body = markdownFor(req.nextUrl.pathname);
  return new NextResponse((body ?? notFoundMarkdown) + "\n", {
    status: body ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export const config = {
  matcher: ["/((?!api|md|_next|src|img|icons|llms|favicon|robots|sitemap|opengraph-image).*)"],
};
