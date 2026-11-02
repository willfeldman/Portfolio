import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd, personLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import "./styles/tokens.css";
import "./styles/graphite.css";
import "./styles/motion.css";
import "./styles/site.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Product and builder`, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }, { url: "/icons/favicon-32x32.png", sizes: "32x32" }],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
  other: { "is-agentic-site-type": "content" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#212121" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <JsonLd data={personLd()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
