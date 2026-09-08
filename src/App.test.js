import {
  activateWindow,
  activeWindow,
  fitWindow,
  initialRect,
} from "./macos/windowState";

test("restoring a minimized app brings it to the front without creating a duplicate", () => {
  const windows = [
    { id: "finder", minimized: true },
    { id: "photos", minimized: false },
  ];
  const next = activateWindow(windows, "finder");
  expect(next).toHaveLength(2);
  expect(activeWindow(next)).toEqual({ id: "finder", minimized: false });
  expect(windows[0].minimized).toBe(true);
});

test("minimized apps cannot become the active window", () => {
  expect(
    activeWindow([{ id: "finder" }, { id: "photos", minimized: true }]).id
  ).toBe("finder");
  expect(activeWindow([{ id: "photos", minimized: true }])).toBeUndefined();
});

test("moving or resizing a window keeps its controls reachable", () => {
  const fitted = fitWindow(
    { x: -300, y: -100, w: 1400, h: 1400 },
    { w: 1024, h: 768 }
  );
  expect(fitted.x).toBeGreaterThanOrEqual(12);
  expect(fitted.y).toBeGreaterThanOrEqual(42);
  expect(fitted.x + fitted.w).toBeLessThanOrEqual(1012);
  expect(fitted.y + fitted.h).toBeLessThanOrEqual(672);
});

test("new windows fit tablet-sized desktop viewports", () => {
  const rect = initialRect("finder", { w: 768, h: 1024 }, 72);
  expect(rect.x + rect.w).toBeLessThanOrEqual(756);
  expect(rect.y + rect.h).toBeLessThanOrEqual(928);
});

test("requesting a missing window preserves the current workspace", () => {
  const windows = [{ id: "finder" }];
  expect(activateWindow(windows, "missing")).toBe(windows);
});
