"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Filter } from "lucide-react"

export default function AdminCoursesPage() {
  return (
    <AdminShell title="Course Catalog" description="Create, edit, and organize courses.">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Search courses" className="max-w-md" />
        <Button variant="outline" className="bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Course
        </Button>
      </div>
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Course catalog grid/list placeholder. Use tags, departments, and credits filters.
      </div>
    </AdminShell>
  )
}
