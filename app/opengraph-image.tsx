import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const memoji = await readFile(join(process.cwd(), "public", site.memoji));
  const src = `data:image/png;base64,${memoji.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: 96, background: "#ffffff", color: "#0d0d0d" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3 }}>Hi, I’m Will.</div>
          <div style={{ fontSize: 44, color: "#5d5d5d", lineHeight: 1.2 }}>{site.tagline}</div>
          <div style={{ fontSize: 30, color: "#8f8f8f", marginTop: 24 }}>willfeldman.com</div>
        </div>
        <img src={src} width={300} height={300} alt="" />
      </div>
    ),
    size,
  );
}
