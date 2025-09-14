"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function AdminNotificationsPage() {
  return (
    <AdminShell title="Notification Center" description="Broadcast updates and manage templates.">
      <div className="grid gap-4 max-w-2xl">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Subject</span>
          <Input placeholder="System maintenance tonight" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Message</span>
          <textarea
            className="min-h-32 rounded-md border bg-background p-3 text-sm"
            placeholder="Write your message..."
          />
        </label>
        <div className="flex gap-2">
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" className="bg-transparent">
            Save as Template
          </Button>
        </div>
      </div>
    </AdminShell>
  )
}
