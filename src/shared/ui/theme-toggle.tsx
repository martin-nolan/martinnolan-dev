import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useTheme } from "@/shared/ui/theme-context";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="p-2 transition-colors hover:bg-surface-hover"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
};
