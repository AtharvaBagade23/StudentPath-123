"use client"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    console.log("[v0] Theme changing from", theme, "to", newTheme)
    setTheme(newTheme)

    // Force immediate DOM class update
    setTimeout(() => {
      const html = document.documentElement
      html.classList.remove("light", "dark")
      if (newTheme !== "system") {
        html.classList.add(newTheme)
      }
      console.log("[v0] DOM classes after change:", html.classList.toString())
    }, 0)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = resolvedTheme || theme
  console.log("[v0] Current theme:", currentTheme, "Theme:", theme, "Resolved:", resolvedTheme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-9 h-9 hover:bg-muted/80 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {currentTheme === "dark" ? (
            <Moon className="h-4 w-4 transition-all duration-300" />
          ) : (
            <Sun className="h-4 w-4 transition-all duration-300" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => handleThemeChange("light")} className="flex items-center gap-2 cursor-pointer">
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="flex items-center gap-2 cursor-pointer">
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
