import React from "react";

export function Icon({ name, size = 18, ...props }) {
  const paths = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    list: (
      <>
        <path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01" />
      </>
    ),
    folder: (
      <path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v10H3ZM9 20v-7h6v7" />
      </>
    ),
    work: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V4h8v3M3 12c6 4 12 4 18 0M12 12v4" />
      </>
    ),
    photo: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8" r="1.5" />
        <path d="m3 17 6-6 4 4 3-3 5 5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-5-5 5 5-5 5" />
      </>
    ),
    back: <path d="m14 6-6 6 6 6" />,
    next: <path d="m10 6 6 6-6 6" />,
    external: (
      <>
        <path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
      </>
    ),
    document: (
      <>
        <path d="M13 3H5v18h14V9ZM13 3v6h6M8 13h8M8 17h6" />
      </>
    ),
    education: (
      <>
        <path d="m2 9 10-6 10 6-10 6ZM6 12v5q6 5 12 0v-5M22 9v8" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8 12-2 9 6-3 6 3-2-9" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6m2 4q4 1 4 7" />
      </>
    ),
    terminal: (
      <>
        <path d="m4 5 6 7-6 7M13 19h8" />
      </>
    ),
    settings: (
      <>
        <path d="M3 6h18M3 12h18M3 18h18" />
        <circle cx="8" cy="6" r="2" fill="currentColor" />
        <circle cx="16" cy="12" r="2" fill="currentColor" />
        <circle cx="10" cy="18" r="2" fill="currentColor" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
      </>
    ),
    moon: <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z" />,
    wifi: (
      <>
        <path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </>
    ),
    battery: (
      <>
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M23 10v4" />
        <rect
          x="5"
          y="10"
          width="12"
          height="4"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    github: (
      <>
        <path d="M9 21v-4c-4 1-5-2-6-3m12 7v-4c0-1-.3-1.5-1-2 4-.5 6-2 6-6 0-1.5-.5-2.5-1.5-3.5.3-1 .3-2-.1-3-2 0-3 1-3 1a12 12 0 0 0-6.8 0s-1-1-3-1c-.4 1-.4 2-.1 3C4.5 6.5 4 7.5 4 9c0 4 2 5.5 6 6-.7.5-1 1-1 2" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 10v7m0-11v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
      </>
    ),
    heart: <path d="M12 21 3 12A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9 6Z" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.folder}
    </svg>
  );
}

export function AppIcon({ app, small = false }) {
  if (app === "finder")
    return (
      <span
        className={`app-icon finder-icon ${small ? "small" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64">
          <path d="M34 0h30v64H27c-2-12-2-22 5-33h-8Z" fill="#d9efff" />
          <path
            d="M16 22v7m30-7v7M15 42q16 13 34-1M34 3l-9 28h9v30"
            fill="none"
            stroke="#183655"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  if (app === "photos")
    return (
      <span
        className={`app-icon photos-icon ${small ? "small" : ""}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64">
          {[
            "#fdba37",
            "#ff862e",
            "#f75771",
            "#bd6fd8",
            "#7595ed",
            "#64c5e9",
            "#6dcc9a",
            "#c5d454",
          ].map((color, i) => (
            <ellipse
              key={color}
              cx="32"
              cy="20"
              rx="9"
              ry="16"
              fill={color}
              opacity=".85"
              transform={`rotate(${i * 45} 32 32)`}
            />
          ))}
        </svg>
      </span>
    );
  return (
    <span
      className={`app-icon ${app}-icon ${small ? "small" : ""}`}
      aria-hidden="true"
    >
      {app === "about" ? (
        <img src="/src/will_emoji.png" alt="" />
      ) : (
        <Icon
          name={
            {
              contact: "mail",
              resume: "document",
              notes: "document",
              settings: "settings",
              terminal: "terminal",
              projects: "folder",
            }[app] || app
          }
          size={36}
        />
      )}
    </span>
  );
}
