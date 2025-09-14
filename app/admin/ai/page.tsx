"use client"

import AdminShell from "@/components/admin-shell"
import { Button } from "@/components/ui/button"
import { Bot, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminAIConfigPage() {
  return (
    <AdminShell title="AI Configuration" description="Manage AI models, prompts, and safety settings.">
      <div className="grid gap-4 max-w-2xl">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Provider API Key</span>
          <Input placeholder="sk-********" type="password" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Default System Prompt</span>
          <Input placeholder="You are a helpful assistant for academic guidance..." />
        </label>
        <div className="flex gap-2">
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Bot className="w-4 h-4 mr-2" />
            Test
          </Button>
        </div>
      </div>
    </AdminShell>
  )
}
