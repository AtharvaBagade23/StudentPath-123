"use client"

import AdminShell from "@/components/admin-shell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminShell title="College Settings" description="Branding, domains, and preferences.">
      <div className="grid gap-4 max-w-xl">
        <label className="grid gap-2">
          <span className="text-sm font-medium">College Name</span>
          <Input placeholder="IIT Delhi" defaultValue="IIT Delhi" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Support Email</span>
          <Input placeholder="support@iitdelhi.ac.in" defaultValue="support@iitdelhi.ac.in" />
        </label>
        <Button className="mt-2">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </AdminShell>
  )
}
