"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Bell,
  Search,
  Home,
  BookOpen,
  Target,
  Award,
  Lightbulb,
  TrendingUp,
  Bot,
  Settings,
  Menu,
  X,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage?: string
  userData?: {
    first_name: string
    last_name: string
    email: string
    college_name: string
    program: string
    current_semester: string
    current_gpa: number
    avatar?: string
  }
}

export default function DashboardLayout({ children, currentPage = "dashboard", userData }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", key: "dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/courses", key: "courses" },
    { icon: Target, label: "Career Goals", href: "/goals", key: "goals" },
    { icon: Award, label: "Skills Tracker", href: "/skills", key: "skills" },
    { icon: Lightbulb, label: "Recommendations", href: "/recommendations", key: "recommendations" },
    { icon: TrendingUp, label: "Progress Reports", href: "/reports", key: "reports" },
    { icon: Bot, label: "AI Assistant", href: "/assistant", key: "assistant" },
    { icon: Bell, label: "Notifications", href: "/notifications", key: "notifications" },
    { icon: Settings, label: "Settings", href: "/settings", key: "settings" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-muted/80 transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <div className="transition-transform duration-200">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </div>
            </Button>
            <div className="flex items-center gap-3">
              
              <div className="hidden sm:block">
                <img
                  src="/logo.png"
                  alt="StudentPath Logo"
                  className="h-15 w-auto"
                  />
                {/* <p className="text-xs text-muted-foreground">{mockUser.college}</p> */}
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className={`relative transition-all duration-300 ${searchFocused ? "scale-105" : ""}`}>
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${searchFocused ? "text-primary" : "text-muted-foreground"}`}
              />
              <Input
                placeholder="Search courses, skills, resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`pl-10 transition-all duration-200 ${searchFocused ? "ring-2 ring-primary/20 border-primary/50" : ""}`}
              />
            </div>
          </div>

          {/* Right: Theme Toggle, Notifications and User */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-muted/80 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </Button>
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 hover:bg-muted/80 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Avatar className="w-8 h-8 transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-primary/20">
                    <AvatarImage src={userData?.avatar || "/placeholder.svg"} alt={userData ? `${userData.first_name} ${userData.last_name}` : "User"} />
                    <AvatarFallback>{userData ? `${userData.first_name[0]}${userData.last_name[0]}` : "U"}</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-foreground">{userData ? `${userData.first_name} ${userData.last_name}` : "Loading..."}</p>
                    <p className="text-xs text-muted-foreground">Semester {userData?.current_semester || "-"}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData ? `${userData.first_name} ${userData.last_name}` : "Loading..."}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email || "Loading..."}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-all duration-300 ease-out
          ${sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0 lg:shadow-none"}
        `}
        >
          <div className="flex flex-col h-full">
            {/* User Profile Section */}
            <div className="p-4 border-b hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-primary/20">
                  <AvatarImage src={userData?.avatar || "/placeholder.svg"} alt={userData ? `${userData.first_name} ${userData.last_name}` : "User"} />
                  <AvatarFallback>{userData ? `${userData.first_name[0]}${userData.last_name[0]}` : "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userData ? `${userData.first_name} ${userData.last_name}` : "Loading..."}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{userData?.program || "Loading..."}</p>
                  <p className="text-xs font-medium text-primary transition-colors duration-200">
                    CGPA: {userData ? Number(userData.current_gpa).toFixed(2) : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={`
                        group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 relative overflow-hidden
                        ${
                          item.key === currentPage
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:translate-x-1"
                        }
                      `}
                    >
                      <item.icon
                        className={`w-4 h-4 transition-all duration-200 ${item.key === currentPage ? "" : "group-hover:scale-110"}`}
                      />
                      {item.label}
                      {item.key === currentPage && (
                        <div className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 transition-all duration-300">{children}</main>
      </div>
    </div>
  )
}
