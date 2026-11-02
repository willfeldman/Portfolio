import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import { CopyEmail } from "./CopyEmail";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__cta m-reveal">
          <div className="site-footer__copy">
            <h2 className="display-md">Let’s talk.</h2>
            <p className="lede">Have something in mind, or just want to connect? My inbox is open.</p>
          </div>
          <div className="row-wrap">
            <a className="gr-btn gr-btn--primary gr-btn--lg" href={`mailto:${site.email}`}>
              <Icon name="mail" />
              <span>{site.email}</span>
            </a>
            <CopyEmail />
          </div>
        </div>
        <div className="site-footer__bar">
          <div className="row-wrap row-wrap--tight">
            <a className="gr-btn gr-btn--ghost" href={site.github}>
              <Icon name="github" />
              <span>GitHub</span>
            </a>
            <a className="gr-btn gr-btn--ghost" href={site.linkedin}>
              <Icon name="linkedin" />
              <span>LinkedIn</span>
            </a>
            <a className="gr-btn gr-btn--ghost" href={site.resume}>
              <Icon name="file" />
              <span>Resume</span>
            </a>
            <Link className="gr-btn gr-btn--ghost" href="/privacy">
              <span>Privacy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
