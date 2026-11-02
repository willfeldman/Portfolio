import { markdownFor, notFoundMarkdown } from "@/lib/markdown";

// Markdown twins of every page. Reached at /<path>.md, or at /<path> with Accept: text/markdown
// (see proxy.ts).
export const dynamic = "force-static";

const headers = { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" };

export async function GET(_req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const md = markdownFor(path.join("/"));
  return md ? new Response(md + "\n", { headers }) : new Response(notFoundMarkdown + "\n", { status: 404, headers });
}
