import { describe, expect, it } from "vitest";
import { APPEARANCE_THEMES, applyAppearanceTheme, parseAppearanceTheme } from "./appearanceTheme";

describe("parseAppearanceTheme", () => {
  it.each(APPEARANCE_THEMES)("round-trips %s", (theme) => {
    expect(parseAppearanceTheme(theme)).toBe(theme);
  });

  it("falls back to light for null", () => {
    expect(parseAppearanceTheme(null)).toBe("light");
  });

  it.each(["", "banana", "DARK", "Dark", "high_contrast"])("falls back to light for %j", (raw) => {
    expect(parseAppearanceTheme(raw)).toBe("light");
  });
});

describe("applyAppearanceTheme", () => {
  it("marks the root dark for the dark theme", () => {
    const root = document.createElement("html");
    applyAppearanceTheme(root, "dark");
    expect(root.classList.contains("dark")).toBe(true);
    expect(root.classList.contains("high-contrast")).toBe(false);
    expect(root.style.colorScheme).toBe("dark");
  });

  it("marks the root high-contrast with a light color scheme", () => {
    const root = document.createElement("html");
    applyAppearanceTheme(root, "high-contrast");
    expect(root.classList.contains("high-contrast")).toBe(true);
    expect(root.classList.contains("dark")).toBe(false);
    expect(root.style.colorScheme).toBe("light");
  });

  it("clears previous theme markers when switching back to light", () => {
    const root = document.createElement("html");
    applyAppearanceTheme(root, "dark");
    applyAppearanceTheme(root, "light");
    expect(root.classList.contains("dark")).toBe(false);
    expect(root.classList.contains("high-contrast")).toBe(false);
    expect(root.style.colorScheme).toBe("light");
  });

  it("replaces dark with high-contrast when switching between non-light themes", () => {
    const root = document.createElement("html");
    applyAppearanceTheme(root, "dark");
    applyAppearanceTheme(root, "high-contrast");
    expect(root.classList.contains("dark")).toBe(false);
    expect(root.classList.contains("high-contrast")).toBe(true);
  });
});
