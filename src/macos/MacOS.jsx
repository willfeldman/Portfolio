import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon, AppIcon } from "./Icons";
import {
  apps,
  sections,
  projects,
  experiences,
  organizations,
  awards,
} from "./content";
import {
  Finder,
  Detail,
  Photos,
  Preview,
  About,
  Contact,
  Resume,
  Terminal,
  Settings,
} from "./Apps";
import {
  fitWindow,
  initialRect,
  activateWindow,
  activeWindow,
} from "./windowState";
import "./macos.css";

const viewportSize = () => ({ w: window.innerWidth, h: window.innerHeight });
function getPreference(key, fallback) {
  try {
    return localStorage.getItem(`will-desktop-${key}`) || fallback;
  } catch {
    return fallback;
  }
}
function routeWindow() {
  const [, kind, id] = window.location.pathname.split("/");
  const data = {
    project: projects,
    experience: experiences,
    organization: organizations,
    award: awards,
  };
  const item = data[kind]?.find((i) => String(i.id) === id);
  return item ? { kind, item } : null;
}
function windowTitle(win) {
  return win.id === "detail"
    ? win.data.item.title || win.data.item.company || win.data.item.name
    : win.id === "preview"
    ? win.data.title
    : win.id === "help"
    ? "Welcome to the desktop"
    : apps.find((a) => a.id === win.id)?.name || "Finder";
}

function Wallpaper({ wallpaper }) {
  return (
    <div
      className={`desktop-wallpaper wallpaper-${wallpaper}`}
      aria-hidden="true"
    >
      {wallpaper !== "studio" && (
        <svg viewBox="0 0 1800 1100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2=".8" y2="1">
              <stop stopColor="#6594b9" />
              <stop offset=".55" stopColor="#c9bfd0" />
              <stop offset="1" stopColor="#ffdfb2" />
            </linearGradient>
            <linearGradient id="far" x1="0" y1="0" x2=".6" y2="1">
              <stop stopColor="#efd2c3" />
              <stop offset=".5" stopColor="#d59485" />
              <stop offset="1" stopColor="#91698e" />
            </linearGradient>
            <linearGradient id="orange" x1="0" y1="0" x2=".8" y2="1">
              <stop stopColor="#f4b776" />
              <stop offset=".45" stopColor="#e57647" />
              <stop offset="1" stopColor="#a94236" />
            </linearGradient>
            <linearGradient id="red" x1="0" y1="0" x2=".8" y2="1">
              <stop stopColor="#ea8654" />
              <stop offset=".3" stopColor="#cb513c" />
              <stop offset="1" stopColor="#702b42" />
            </linearGradient>
            <linearGradient id="front" x1="0" y1="0" x2=".5" y2="1">
              <stop stopColor="#a44352" />
              <stop offset=".6" stopColor="#592849" />
              <stop offset="1" stopColor="#302347" />
            </linearGradient>
            <linearGradient id="shadow" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#2f3159" />
              <stop offset="1" stopColor="#151f3c" />
            </linearGradient>
          </defs>
          <path fill="url(#sky)" d="M0 0h1800v1100H0Z" />
          <path
            fill="url(#far)"
            d="M0 720C340 730 500 310 905 338s505 460 895-60v822H0Z"
          />
          <path
            fill="url(#orange)"
            d="M0 800C250 850 470 620 730 490c200-100 264-390 570-292 244 78 306 111 500-68v970H0Z"
          />
          <path
            fill="url(#red)"
            d="M0 1080C360 918 700 872 900 614c212-274 493-176 900-547v1033H0Z"
          />
          <path
            fill="url(#front)"
            d="M0 330c187 68 177 379 466 502 295 126 560 58 810 268H0Z"
          />
          <path
            fill="url(#shadow)"
            d="M0 625c195 50 270 300 545 358 209 44 386 50 482 117H0Z"
          />
        </svg>
      )}
    </div>
  );
}

function DesktopWindow({
  win,
  index,
  active,
  mobile,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onRect,
  children,
}) {
  const gesture = useRef(null);
  const start = (event, type) => {
    if (
      mobile ||
      win.maximized ||
      event.button !== 0 ||
      event.target.closest("button,a,input,select")
    )
      return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      type,
      x: event.clientX,
      y: event.clientY,
      rect: win.rect,
    };
    onFocus();
  };
  const move = (event) => {
    const g = gesture.current;
    if (!g) return;
    const dx = event.clientX - g.x,
      dy = event.clientY - g.y;
    onRect(
      fitWindow(
        g.type === "drag"
          ? { ...g.rect, x: g.rect.x + dx, y: g.rect.y + dy }
          : { ...g.rect, w: g.rect.w + dx, h: g.rect.h + dy },
        viewportSize()
      )
    );
  };
  const stop = () => {
    gesture.current = null;
  };
  return (
    <section
      className={`desktop-window ${active ? "active" : ""} ${
        win.maximized ? "maximized" : ""
      } window-${win.id}`}
      aria-label={`${windowTitle(win)} window`}
      tabIndex={-1}
      style={{
        left: win.rect.x,
        top: win.rect.y,
        width: win.rect.w,
        height: win.rect.h,
        zIndex: 20 + index,
        display: win.minimized || (mobile && !active) ? "none" : undefined,
      }}
      onPointerDown={onFocus}
    >
      <header
        className="window-titlebar"
        onPointerDown={(e) => start(e, "drag")}
        onPointerMove={move}
        onPointerUp={stop}
        onPointerCancel={stop}
        onDoubleClick={(e) => {
          if (!e.target.closest("button")) onMaximize();
        }}
      >
        <div className="traffic-lights">
          <button
            className="traffic close"
            aria-label={`Close ${windowTitle(win)}`}
            title="Close"
            onClick={onClose}
          >
            <span>×</span>
          </button>
          <button
            className="traffic minimize"
            aria-label={`Minimize ${windowTitle(win)}`}
            title="Minimize"
            onClick={onMinimize}
          >
            <span>−</span>
          </button>
          <button
            className="traffic maximize"
            aria-label={`${
              win.maximized ? "Restore" : "Maximize"
            } ${windowTitle(win)}`}
            title={win.maximized ? "Restore" : "Maximize"}
            onClick={onMaximize}
          >
            <span>↗</span>
          </button>
        </div>
        <button className="mobile-window-back" onClick={onClose}>
          <Icon name="back" size={17} />
          Back
        </button>
        <div className="window-title">
          {win.id === "finder" && <Icon name="folder" size={15} />}
          <span>{win.id === "finder" ? "Will Feldman" : windowTitle(win)}</span>
        </div>
        <span className="titlebar-label">
          {win.id === "finder" ? "Personal portfolio" : ""}
        </span>
      </header>
      <div className="window-content">{children}</div>
      <div
        className="resize-handle"
        aria-hidden="true"
        onPointerDown={(e) => start(e, "resize")}
        onPointerMove={move}
        onPointerUp={stop}
        onPointerCancel={stop}
      />
    </section>
  );
}

function Spotlight({ close, open, setSection }) {
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(0);
  const container = useRef(null);
  const all = [
    ...apps.map((app) => ({
      title: app.name,
      subtitle: "Application",
      icon: app.id,
      action: () => open(app.id),
    })),
    ...sections.slice(1).map((s) => ({
      title: s.name,
      subtitle: "Portfolio folder",
      icon: "projects",
      action: () => {
        setSection(s.id);
        open("finder");
      },
    })),
    ...projects.map((item) => ({
      title: item.title,
      subtitle: "Project",
      icon: "projects",
      action: () => open("detail", { kind: "project", item }),
    })),
    ...experiences.map((item) => ({
      title: item.company,
      subtitle: "Experience",
      icon: "projects",
      action: () => open("detail", { kind: "experience", item }),
    })),
  ];
  const results = all
    .filter((r) =>
      `${r.title} ${r.subtitle}`.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8);
  useEffect(() => {
    const previous = document.activeElement;
    container.current?.querySelector("input")?.focus();
    return () => previous?.focus?.();
  }, []);
  const choose = (result) => {
    close();
    result?.action();
  };
  return (
    <div
      className="spotlight-backdrop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="spotlight"
        ref={container}
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight Search"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelection((i) => Math.min(i + 1, results.length - 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelection((i) => Math.max(0, i - 1));
          }
          if (e.key === "Enter") {
            e.preventDefault();
            choose(results[selection]);
          }
          if (e.key === "Escape") close();
          if (e.key === "Tab") {
            const focusables = [
              ...container.current.querySelectorAll("input,button"),
            ];
            const next =
              focusables.indexOf(document.activeElement) +
              (e.shiftKey ? -1 : 1);
            e.preventDefault();
            focusables[(next + focusables.length) % focusables.length]?.focus();
          }
        }}
      >
        <div className="spotlight-input">
          <Icon name="search" size={25} />
          <input
            aria-label="Spotlight Search"
            placeholder="Search my world…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelection(0);
            }}
          />
          <button onClick={close} aria-label="Close Spotlight">
            <kbd>esc</kbd>
          </button>
        </div>
        <div className="spotlight-results">
          <span className="sidebar-label">
            {query ? "Results" : "Apps & folders"}
          </span>
          {results.map((result, i) => (
            <button
              key={result.title + result.subtitle}
              className={i === selection ? "selected" : ""}
              onMouseEnter={() => setSelection(i)}
              onClick={() => choose(result)}
            >
              <AppIcon app={result.icon} small />
              <span>
                <strong>{result.title}</strong>
                <small>{result.subtitle}</small>
              </span>
              {i === selection && <span className="return-key">↵</span>}
            </button>
          ))}
          {!results.length && (
            <p className="empty-state">No results for “{query}”.</p>
          )}
        </div>
        <footer>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>↵</kbd> to open
          </span>
        </footer>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div className="help-app">
      <AppIcon app="finder" />
      <h1>A desktop worth exploring.</h1>
      <p>This is my portfolio, with a little macOS magic.</p>
      <dl>
        <dt>Open something</dt>
        <dd>Click an app in the Dock or a folder on the desktop.</dd>
        <dt>Make room</dt>
        <dd>
          Drag a window by its title bar. Resize from the bottom-right corner.
          Double-click the title bar to maximize.
        </dd>
        <dt>The little traffic lights</dt>
        <dd>
          Red closes, yellow minimizes, and green fills the screen. Click a Dock
          icon to bring its window back.
        </dd>
        <dt>Find anything</dt>
        <dd>
          Press ⌘K (Ctrl+K on Windows) to search apps, projects, and experience.
        </dd>
        <dt>On your phone</dt>
        <dd>
          Apps open full-screen. Use Back to return, or the Dock to switch apps.
        </dd>
      </dl>
      <p className="muted">
        You can also right-click the desktop. Go ahead, make yourself at home.
      </p>
    </div>
  );
}

export default function MacOS() {
  const [viewport, setViewport] = useState(viewportSize);
  const previousViewport = useRef(viewportSize());
  const mobile = viewport.w <= 700;
  const [windows, setWindows] = useState(() => {
    const finder = {
      id: "finder",
      rect: initialRect("finder", viewportSize()),
      minimized: false,
    };
    const detail = routeWindow();
    return detail
      ? [
          finder,
          {
            id: "detail",
            data: detail,
            rect: initialRect("detail", viewportSize(), 25),
          },
        ]
      : [finder];
  });
  const [section, setSection] = useState("home");
  const [menu, setMenu] = useState(null);
  const [spotlight, setSpotlight] = useState(false);
  const [context, setContext] = useState(null);
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState(() => getPreference("theme", "light"));
  const [wallpaper, setWallpaper] = useState(() =>
    getPreference("wallpaper", "sunset")
  );
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const isDark = theme === "dark" || (theme === "auto" && systemDark);
  const active = activeWindow(windows);
  useEffect(() => {
    try {
      localStorage.setItem("will-desktop-theme", theme);
      localStorage.setItem("will-desktop-wallpaper", wallpaper);
    } catch {}
  }, [theme, wallpaper]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const change = (e) => setSystemDark(e.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    const resize = () => {
      const size = viewportSize();
      const leavingMobile = previousViewport.current.w <= 700 && size.w > 700;
      previousViewport.current = size;
      setViewport(size);
      if (size.w > 700)
        setWindows((wins) =>
          wins.map((win, i) => ({
            ...win,
            rect: leavingMobile
              ? initialRect(win.id, size, i * 18)
              : fitWindow(win.rect, size),
          }))
        );
    };
    window.addEventListener("resize", resize);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);
  const focus = useCallback(
    (id) => setWindows((wins) => activateWindow(wins, id)),
    []
  );
  const open = useCallback((id, data) => {
    setMenu(null);
    setContext(null);
    if (id === "spotlight") {
      setSpotlight(true);
      return;
    }
    setWindows((wins) => {
      const existing = wins.find((win) => win.id === id);
      if (existing)
        return activateWindow(
          wins.map((win) =>
            win.id === id ? { ...win, data: data || win.data } : win
          ),
          id
        );
      return [
        ...wins,
        {
          id,
          data,
          rect: initialRect(id, viewportSize(), Math.min(wins.length, 4) * 18),
          minimized: false,
        },
      ];
    });
  }, []);
  const close = useCallback((id) => {
    setWindows((wins) => wins.filter((win) => win.id !== id));
    if (
      ["detail", "preview"].includes(id) &&
      window.location.pathname !== "/"
    ) {
      window.history.replaceState(null, "", "/");
    }
  }, []);
  const minimize = useCallback(
    (id) =>
      setWindows((wins) =>
        wins.map((win) => (win.id === id ? { ...win, minimized: true } : win))
      ),
    []
  );
  const maximize = useCallback(
    (id) =>
      setWindows((wins) =>
        wins.map((win) =>
          win.id === id ? { ...win, maximized: !win.maximized } : win
        )
      ),
    []
  );
  const showDesktop = () => {
    setWindows((wins) => wins.map((win) => ({ ...win, minimized: true })));
    setMenu(null);
    setContext(null);
  };
  const allWindows = () => {
    setWindows((wins) =>
      wins.map((win, i) => ({
        ...win,
        minimized: false,
        maximized: false,
        rect: initialRect(win.id, viewportSize(), i * 24),
      }))
    );
    setMenu(null);
  };
  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlight((s) => !s);
      }
      if (e.key === "Escape") {
        setSpotlight(false);
        setMenu(null);
        setContext(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w" && active) {
        e.preventDefault();
        if (spotlight) setSpotlight(false);
        else close(active.id);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "m" && active) {
        e.preventDefault();
        minimize(active.id);
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [active, close, minimize, spotlight]);
  useEffect(() => {
    const dismiss = (e) => {
      if (!e.target.closest(".menubar,.system-popover,.desktop-context")) {
        setMenu(null);
        setContext(null);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  const go = (id) => {
    setSection(id);
    open("finder");
  };
  const menuItems = {
    brand: [
      ["About Will", () => open("about")],
      ["System Settings…", () => open("settings")],
      ["Show Desktop", showDesktop],
    ],
    Finder: [
      ["About this portfolio", () => open("about")],
      ["Open résumé", () => open("resume")],
      ["Contact Will", () => open("contact")],
    ],
    File: [
      ["Open Finder", () => open("finder")],
      ["Open Photos", () => open("photos")],
      ["Open Résumé", () => open("resume")],
      ["Close Window", () => active && close(active.id)],
    ],
    View: [
      ["Show Desktop", showDesktop],
      ["Bring All Windows Forward", allWindows],
      ["Change Appearance…", () => open("settings")],
    ],
    Go: [
      ["Welcome", () => go("home")],
      ["Experience", () => go("experience")],
      ["Projects", () => go("projects")],
      ["Photos", () => open("photos")],
      ["Terminal", () => open("terminal")],
    ],
    Window: [
      ["Minimize", () => active && minimize(active.id)],
      ["Zoom", () => active && maximize(active.id)],
      ["Arrange Windows", allWindows],
      ...windows.map((win) => [windowTitle(win), () => focus(win.id)]),
    ],
    Help: [
      ["How to use this desktop", () => open("help")],
      ["Search portfolio", () => setSpotlight(true)],
    ],
  };
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const monthDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  return (
    <main
      style={{ "--studio-wallpaper": "url(/src/profile_background.jpg)" }}
      className={`macos ${isDark ? "dark" : "light"} ${
        mobile ? "is-mobile" : ""
      }`}
      onContextMenu={(e) => {
        if (e.target.closest(".desktop-surface,.desktop-wallpaper")) {
          e.preventDefault();
          setContext({
            x: Math.min(e.clientX, viewport.w - 240),
            y: Math.min(e.clientY, viewport.h - 180),
          });
        }
      }}
    >
      <Wallpaper wallpaper={wallpaper} />
      <nav className="menubar" aria-label="Desktop menu">
        <div className="menu-left">
          <button
            className="brand-menu"
            aria-label="Will’s desktop menu"
            aria-expanded={menu === "brand"}
            onClick={() => setMenu(menu === "brand" ? null : "brand")}
          >
            <img src="/icons/favicon.svg" alt="" />
          </button>
          {["Finder", "File", "View", "Go", "Window", "Help"].map((label) => (
            <button
              key={label}
              className={`${label === "Finder" ? "app-menu-name" : ""} ${
                menu === label ? "menu-active" : ""
              }`}
              aria-expanded={menu === label}
              onClick={() => setMenu(menu === label ? null : label)}
            >
              {label === "Finder" && active && active.id !== "finder"
                ? windowTitle(active).split(" — ")[0]
                : label}
            </button>
          ))}
        </div>
        <div className="menu-right">
          <span className="portfolio-edition">Portfolio edition</span>
          <span className="battery-status" title="Powered by curiosity">
            <Icon name="battery" size={24} />
          </span>
          <button
            className="wifi-button"
            aria-label="Desktop information"
            onClick={() => setMenu(menu === "control" ? null : "control")}
          >
            <Icon name="wifi" size={17} />
          </button>
          <button
            aria-label="Open Spotlight"
            onClick={() => setSpotlight(true)}
          >
            <Icon name="search" size={16} />
          </button>
          <button
            aria-label="Control Center"
            aria-expanded={menu === "control"}
            onClick={() => setMenu(menu === "control" ? null : "control")}
          >
            <Icon name="settings" size={17} />
          </button>
          <button
            className="menu-clock"
            aria-label="Open calendar"
            aria-expanded={menu === "calendar"}
            onClick={() => setMenu(menu === "calendar" ? null : "calendar")}
          >
            {now.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
            <span>
              {now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </button>
        </div>
      </nav>
      <div className="desktop-surface">
        <div className="desktop-files" aria-label="Desktop shortcuts">
          {[
            ["finder", "My Portfolio", () => go("home")],
            ["projects", "Projects", () => go("projects")],
            ["photos", "Photos", () => open("photos")],
            ["resume", "Résumé", () => open("resume")],
          ].map(([id, title, action]) => (
            <button className="desktop-file" key={id} onClick={action}>
              <AppIcon app={id === "finder" ? "projects" : id} />
              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>
      {windows.map((win, index) => (
        <DesktopWindow
          key={win.id}
          win={win}
          index={index}
          mobile={mobile}
          active={active?.id === win.id}
          onFocus={() => focus(win.id)}
          onClose={() => close(win.id)}
          onMinimize={() => minimize(win.id)}
          onMaximize={() => maximize(win.id)}
          onRect={(rect) =>
            setWindows((wins) =>
              wins.map((w) => (w.id === win.id ? { ...w, rect } : w))
            )
          }
        >
          {win.id === "finder" && (
            <Finder section={section} setSection={setSection} open={open} />
          )}
          {win.id === "detail" && <Detail data={win.data} open={open} />}
          {win.id === "preview" && (
            <Preview
              data={win.data}
              active={active?.id === win.id && !spotlight}
            />
          )}
          {win.id === "photos" && <Photos open={open} />}
          {win.id === "about" && <About open={open} />}
          {win.id === "contact" && <Contact />}
          {win.id === "resume" && <Resume />}
          {win.id === "terminal" && (
            <Terminal open={open} setSection={setSection} />
          )}
          {win.id === "settings" && (
            <Settings
              theme={theme}
              setTheme={setTheme}
              wallpaper={wallpaper}
              setWallpaper={setWallpaper}
            />
          )}
          {win.id === "help" && <Help />}
        </DesktopWindow>
      ))}
      <div className="dock-wrap">
        <nav className="dock" aria-label="Application Dock">
          {apps.map((app, i) => (
            <React.Fragment key={app.id}>
              {i === 5 && <span className="dock-separator" />}
              <button
                className={`dock-item ${
                  active?.id === app.id ? "dock-active" : ""
                }`}
                aria-label={`Open ${app.name}`}
                onClick={() => open(app.id)}
              >
                <span className="dock-tooltip">{app.name}</span>
                <AppIcon app={app.id} />
                <span
                  className={`running-dot ${
                    windows.some((win) => win.id === app.id) ? "running" : ""
                  }`}
                />
              </button>
            </React.Fragment>
          ))}
          <span className="dock-separator" />
          <button
            className="dock-item desktop-dock-button"
            aria-label="Show desktop"
            onClick={showDesktop}
          >
            <span className="dock-tooltip">Show Desktop</span>
            <span className="desktop-dock-icon">
              <Icon name="grid" size={31} />
            </span>
            <span className="running-dot" />
          </button>
        </nav>
      </div>
      {menuItems[menu] && (
        <div
          className={`system-popover menu-dropdown menu-position-${menu}`}
          role="menu"
          aria-label={`${menu} menu`}
        >
          {menuItems[menu].map(([label, action], i) => (
            <button
              key={label + i}
              role="menuitem"
              onClick={() => {
                action();
                setMenu(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {menu === "control" && (
        <div className="system-popover control-center">
          <div className="control-profile">
            <img src="/src/will_emoji.png" alt="" />
            <span>
              <strong>Will’s workspace</strong>
              <small>Personal portfolio</small>
            </span>
          </div>
          <div className="control-grid">
            <button onClick={() => setTheme(isDark ? "light" : "dark")}>
              <span className="control-circle">
                <Icon name={isDark ? "moon" : "sun"} size={20} />
              </span>
              <strong>{isDark ? "Dark" : "Light"} Mode</strong>
              <small>Click to switch</small>
            </button>
            <button
              onClick={() => {
                showDesktop();
              }}
            >
              <span className="control-circle purple">
                <Icon name="grid" size={20} />
              </span>
              <strong>Desktop</strong>
              <small>Make some room</small>
            </button>
          </div>
          <button className="control-settings" onClick={() => open("settings")}>
            Appearance & wallpaper <Icon name="next" size={15} />
          </button>
        </div>
      )}
      {menu === "calendar" && (
        <div className="system-popover calendar-popover">
          <span className="calendar-date">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          <h2>
            {now.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <b key={`d${i}`}>{d}</b>
            ))}
            {Array.from({ length: monthStart }, (_, i) => (
              <span key={`blank${i}`} />
            ))}
            {Array.from({ length: monthDays }, (_, i) => (
              <span key={i} className={now.getDate() === i + 1 ? "today" : ""}>
                {i + 1}
              </span>
            ))}
          </div>
          <p>A good day to make something.</p>
        </div>
      )}
      {context && (
        <div
          className="desktop-context system-popover"
          style={{ left: context.x, top: context.y }}
        >
          <button onClick={() => go("home")}>Open Portfolio</button>
          <button onClick={allWindows}>Arrange Windows</button>
          <button onClick={() => open("settings")}>Change Wallpaper…</button>
          <button onClick={() => open("help")}>Desktop Help</button>
        </div>
      )}
      {spotlight && (
        <Spotlight
          close={() => setSpotlight(false)}
          open={open}
          setSection={setSection}
        />
      )}
      <div className="sr-only" role="status" aria-live="polite">
        {active ? `${windowTitle(active)} is active` : "Desktop"}
      </div>
    </main>
  );
}
