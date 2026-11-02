import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { photo, photoCount, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Photos",
  description: `${photoCount} photos taken by ${site.name}.`,
  alternates: { canonical: "/photos", types: { "text/markdown": "/photos.md" } },
};

const tilts = ["pol-a", "pol-b", "pol-c", "pol-d"];
// Newest first: the files are numbered in the order they were taken.
const numbers = Array.from({ length: photoCount }, (_, i) => photoCount - i);

export default function Photos() {
  return (
    <main id="main" className="page page--tight">
      <Link className="gr-btn gr-btn--ghost back-link" href="/about">
        <Icon name="arrowLeft" size={16} />
        <span>About</span>
      </Link>
      <header className="page-head m-in" style={{ marginTop: -16 }}>
        <h1 className="display-lg">Through the lens</h1>
        <p className="lede">{photoCount} photos from along the way.</p>
      </header>
      <div className="photo-grid">
        {numbers.map((n, i) => (
          <figure key={n} className={`polaroid ${tilts[i % tilts.length]}`}>
            <img src={photo(n)} alt="Photo by Will Feldman" loading={i < 8 ? "eager" : "lazy"} width={216} height={216} />
          </figure>
        ))}
      </div>
    </main>
  );
}
