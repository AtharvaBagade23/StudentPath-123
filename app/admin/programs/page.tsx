"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AdminProgramsPage() {
  return (
    <AdminShell title="Program Management" description="Define programs, semesters, and degree requirements.">
      <div className="flex items-center gap-2 mb-4">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Program
        </Button>
      </div>
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Programs list and requirement editor placeholder.
      </div>
    </AdminShell>
  )
}
