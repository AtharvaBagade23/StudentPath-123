"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Filter } from "lucide-react"

export default function AdminStudentsPage() {
  return (
    <AdminShell title="Student Management" description="Search, filter, and manage student records.">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Search students by name, email, or ID" className="max-w-md" />
        <Button variant="outline" className="bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Student list table placeholder. Importing/exporting, bulk actions, and detail drawer can live here.
      </div>
    </AdminShell>
  )
}
