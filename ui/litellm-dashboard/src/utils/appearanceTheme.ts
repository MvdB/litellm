export const APPEARANCE_THEMES = ["light", "dark", "high-contrast"] as const;

export type AppearanceTheme = (typeof APPEARANCE_THEMES)[number];

export const APPEARANCE_THEME_STORAGE_KEY = "appearanceTheme";

export function parseAppearanceTheme(raw: string | null): AppearanceTheme {
  return APPEARANCE_THEMES.includes(raw as AppearanceTheme) ? (raw as AppearanceTheme) : "light";
}

export function applyAppearanceTheme(root: HTMLElement, theme: AppearanceTheme): void {
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("high-contrast", theme === "high-contrast");
  root.style.colorScheme = theme === "dark" ? "dark" : "light";
}
