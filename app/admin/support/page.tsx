"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare } from "lucide-react"

export default function AdminSupportPage() {
  return (
    <AdminShell title="Support Center" description="Help docs, tickets, and contact.">
      <div className="grid gap-4 max-w-2xl">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Subject</span>
          <Input placeholder="Issue with course uploads" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Details</span>
          <textarea
            className="min-h-32 rounded-md border bg-background p-3 text-sm"
            placeholder="Describe the issue..."
          />
        </label>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Submit Ticket
        </Button>
      </div>
    </AdminShell>
  )
}
