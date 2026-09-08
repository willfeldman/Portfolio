export function fitWindow(rect, viewport) {
  const w = Math.min(
    Math.max(rect.minWidth || 360, rect.w),
    Math.max(300, viewport.w - 24)
  );
  const h = Math.min(Math.max(280, rect.h), Math.max(260, viewport.h - 154));
  return {
    ...rect,
    w,
    h,
    x: Math.max(12, Math.min(rect.x, viewport.w - w - 12)),
    y: Math.max(42, Math.min(rect.y, viewport.h - h - 112)),
  };
}
export function activateWindow(windows, id) {
  const target = windows.find((win) => win.id === id);
  return target
    ? [
        ...windows.filter((win) => win.id !== id),
        { ...target, minimized: false },
      ]
    : windows;
}
export function activeWindow(windows) {
  return [...windows].reverse().find((win) => !win.minimized);
}
export function initialRect(id, viewport, offset = 0) {
  const wide = ["finder", "photos", "detail"].includes(id);
  const w = wide ? 1000 : id === "preview" ? 880 : 580;
  const h = wide ? 730 : id === "preview" ? 720 : 610;
  return fitWindow(
    {
      x: (viewport.w - w) / 2 + offset,
      y: Math.max(75, (viewport.h - h) / 2 - 8) + offset,
      w,
      h,
      minWidth: wide ? 820 : 360,
    },
    viewport
  );
}
