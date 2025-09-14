"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Shield } from "lucide-react"

export default function AdminUsersPage() {
  return (
    <AdminShell title="Admin Users" description="Invite and manage admin accounts.">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Search admins" className="max-w-md" />
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Admin
        </Button>
      </div>
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Admin user list placeholder with roles and permissions <Shield className="inline w-4 h-4" />.
      </div>
    </AdminShell>
  )
}
