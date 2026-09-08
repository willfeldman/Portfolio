# Will’s desktop portfolio

This version lives in **Portfolio copy**. The original Portfolio folder is unchanged.

## Run locally

```sh
npm start
```

Use a current Node.js runtime. To use the bundled runtime on this Mac:

```sh
PATH="/Users/wf/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" npm start
```

`npm run build` produces the static site in `build/`. `CI=true npm test -- --watchAll=false --runInBand` runs the window-management checks.

## Explore

- Finder contains the introduction, experience, all projects, education, awards, and organizations.
- Click Dock apps to open or restore them. Drag window title bars, resize from the lower-right corner, and use the traffic lights to close, minimize, or maximize.
- Double-click a title bar to maximize or restore. View → Show Desktop hides all windows; Window → Arrange Windows restores and arranges them.
- Press Command/Ctrl+K for Spotlight; use arrows and Enter to select a result. Escape dismisses it. Command/Ctrl+W closes the active window; Command/Ctrl+M minimizes it.
- Photos includes the existing 142-image collection with progressive loading and image previews.
- Mail opens the visitor’s email app, and Résumé opens the existing Google Drive document. Neither sends a message automatically.
- Terminal supports `help`, `whoami`, `ls`, `date`, `clear`, and `open projects`, `open experience`, `open photos`, `open about`, `open contact`, or `open resume`. Commands only operate the portfolio interface.
- Settings saves light/dark/system appearance and one of three wallpapers locally in the visitor’s browser.
- Phones use one full-screen app at a time, a Back button, a section picker, and a persistent Dock.

## Content and implementation

The existing files in `src/data/` remain the content source. Existing local images are reused; career dates and résumé links have not been independently refreshed. The interface is in `src/macos/`, with window-boundary and focus helpers in `windowState.js`. No new package dependencies were added.

Existing `/project/:id`, `/experience/:id`, `/organization/:id`, and `/award/:id` links open their corresponding detail windows. Static hosting must return `index.html` for these routes; JavaScript and stylesheet URLs are rooted at `/`.

The copy no longer loads the legacy jQuery, CSS reset, external font, or production analytics snippet. Reduced-motion, reduced-transparency, and increased-contrast preferences have CSS alternatives.

This is a browser-based portfolio inspired by macOS. It has no access to visitors’ local files, operating-system settings, or shell.
