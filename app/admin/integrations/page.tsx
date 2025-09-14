"use client"

import AdminShell from "@/components/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminIntegrationsPage() {
  return (
    <AdminShell title="System Integrations" description="Connect external services and data sources.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" /> Supabase
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status: Connected</span>
            <Button variant="outline" className="bg-transparent">
              Manage
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" /> Neon
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status: Not Connected</span>
            <Button>Connect</Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
