import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { APPEARANCE_THEME_STORAGE_KEY } from "@/utils/appearanceTheme";
import { useAppearanceTheme } from "./useAppearanceTheme";

describe("useAppearanceTheme", () => {
  afterEach(() => {
    window.localStorage.removeItem(APPEARANCE_THEME_STORAGE_KEY);
  });

  it("defaults to light when nothing is stored", () => {
    const { result } = renderHook(() => useAppearanceTheme());
    expect(result.current[0]).toBe("light");
  });

  it("falls back to light for an invalid stored value", () => {
    window.localStorage.setItem(APPEARANCE_THEME_STORAGE_KEY, "neon");
    const { result } = renderHook(() => useAppearanceTheme());
    expect(result.current[0]).toBe("light");
  });

  it("reads a stored theme", () => {
    window.localStorage.setItem(APPEARANCE_THEME_STORAGE_KEY, "high-contrast");
    const { result } = renderHook(() => useAppearanceTheme());
    expect(result.current[0]).toBe("high-contrast");
  });

  it("persists and propagates a theme change", () => {
    const { result } = renderHook(() => useAppearanceTheme());

    act(() => {
      result.current[1]("dark");
    });

    expect(result.current[0]).toBe("dark");
    expect(window.localStorage.getItem(APPEARANCE_THEME_STORAGE_KEY)).toBe("dark");
  });

  it("updates every hook instance when one of them changes the theme", () => {
    const first = renderHook(() => useAppearanceTheme());
    const second = renderHook(() => useAppearanceTheme());

    act(() => {
      first.result.current[1]("dark");
    });

    expect(second.result.current[0]).toBe("dark");
  });
});
