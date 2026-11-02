"use client";

import Link from "next/link";
import { useRef } from "react";
import { featuredPhotos, photo, photoCount } from "@/content/site";
import { Icon } from "./Icon";

const tilts = ["pol-a", "pol-b", "pol-c", "pol-d"];

// A full-bleed row of polaroids that scrolls sideways, with buttons for pointer users.
export function PhotoStrip({ showAllLink = true }: { showAllLink?: boolean }) {
  const strip = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: dir * Math.max(268, el.clientWidth * 0.8) });
  };
  return (
    <section className="photos" aria-labelledby="photos-title">
      <div className="photos__head">
        <h2 id="photos-title" className="heading">
          Through the lens
        </h2>
        <div className="row-wrap row-wrap--tight">
          <button className="gr-btn gr-btn--secondary gr-btn--icon" type="button" aria-label="Scroll photos left" onClick={() => scroll(-1)}>
            <Icon name="chevronLeft" />
          </button>
          <button className="gr-btn gr-btn--secondary gr-btn--icon" type="button" aria-label="Scroll photos right" onClick={() => scroll(1)}>
            <Icon name="chevronRight" />
          </button>
          {showAllLink && (
            <Link className="gr-btn gr-btn--ghost" href="/photos" style={{ marginLeft: 4 }}>
              <span>All {photoCount} photos</span>
              <Icon name="chevronRight" size={16} />
            </Link>
          )}
        </div>
      </div>
      <div ref={strip} className="photo-strip m-reveal" tabIndex={0} aria-label="Photos, scroll sideways">
        {featuredPhotos.map((n, i) => (
          <figure key={n} className={`polaroid ${tilts[i % tilts.length]}`}>
            <img src={photo(n)} alt="Photo by Will Feldman" loading="lazy" width={216} height={216} />
          </figure>
        ))}
      </div>
    </section>
  );
}
