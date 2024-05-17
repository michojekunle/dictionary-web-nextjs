"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle: () => void = () => {
    return theme === "light" || theme === 'system' ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="flex items-center gap-3">
      <Switch checked={theme !== "light"} onCheckedChange={handleThemeToggle} className="transition" aria-label="switch-btn"/>
      {theme === "light" ? <Sun className="" /> : <Moon className="" />}
    </div>
  );
}