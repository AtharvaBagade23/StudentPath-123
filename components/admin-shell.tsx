"use client"

import { useState, type PropsWithChildren } from "react"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  BookOpen,
  GraduationCap,
  Bot,
  DollarSign,
  TrendingUp,
  Bell,
  Database,
  SettingsIcon,
  UserCheck,
  Shield,
  Menu,
  X,
  Download,
  Search,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeToggle from "@/components/theme-toggle"

type AdminShellProps = PropsWithChildren<{
  title?: string
  description?: string
  showRange?: boolean
}>

const adminNav = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Student Management", href: "/admin/students" },
  { icon: BookOpen, label: "Course Catalog", href: "/admin/courses" },
  { icon: GraduationCap, label: "Program Management", href: "/admin/programs" },
  { icon: Bot, label: "AI Configuration", href: "/admin/ai" },
  { icon: DollarSign, label: "Affiliate Dashboard", href: "/admin/affiliate" },
  { icon: TrendingUp, label: "Analytics & Reports", href: "/admin/analytics" },
  { icon: Bell, label: "Notification Center", href: "/admin/notifications" },
  { icon: Database, label: "System Integrations", href: "/admin/integrations" },
  { icon: SettingsIcon, label: "College Settings", href: "/admin/settings" },
  { icon: UserCheck, label: "Admin Users", href: "/admin/users" },
  { icon: Shield, label: "Support Center", href: "/admin/support" },
]

export default function AdminShell({ title, description, showRange = false, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen((v) => !v)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">IIT Delhi</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students, courses, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right: status, notifications, theme toggle, profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">System Healthy</span>
            </div>
            <Button variant="ghost" size="sm" className="relative" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </Button>

            {/* Theme toggle beside alerts on all pages */}
            <ThemeToggle />

            <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            {/* Profile dropdown like the provided screenshot */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Open profile menu"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/admin-avatar.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/admin-avatar.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium truncate">Dr. Admin</p>
                    <p className="text-xs text-muted-foreground truncate">admin@iitdelhi.ac.in</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <a href="/admin/users">
                      <UserCheck className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/admin/settings">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/admin/support">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/logout">
                    <Eye className="mr-2 h-4 w-4 rotate-180" />
                    <span>Sign out</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {adminNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {(title || description || showRange) && (
            <div className="flex items-center justify-between mb-6">
              <div>
                {title && <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>}
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
              {showRange && (
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
