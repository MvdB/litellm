import { Contrast, Moon, Sun } from "lucide-react";
import React from "react";
import { useAppearanceTheme } from "@/hooks/useAppearanceTheme";
import type { AppearanceTheme } from "@/utils/appearanceTheme";
import { cn } from "@/lib/cva.config";

const THEME_OPTIONS: readonly { value: AppearanceTheme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun className="size-4" /> },
  { value: "dark", label: "Dark", icon: <Moon className="size-4" /> },
  { value: "high-contrast", label: "High contrast", icon: <Contrast className="size-4" /> },
];

const AppearanceThemeSelector: React.FC<{ showLabels?: boolean }> = ({ showLabels = false }) => {
  const [appearanceTheme, setAppearanceTheme] = useAppearanceTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex w-fit gap-0.5 rounded-md border border-border p-0.5"
    >
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={appearanceTheme === option.value}
          aria-label={`${option.label} theme`}
          title={option.label}
          onClick={() => setAppearanceTheme(option.value)}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded transition-colors",
            showLabels ? "px-3 py-1.5 text-[13px]" : "size-7",
            appearanceTheme === option.value
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.icon}
          {showLabels && option.label}
        </button>
      ))}
    </div>
  );
};

export default AppearanceThemeSelector;
