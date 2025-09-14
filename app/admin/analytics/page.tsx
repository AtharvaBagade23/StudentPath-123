"use client"

import AdminShell from "@/components/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <AdminShell title="Analytics & Reports" description="Usage, performance, and outcomes." showRange>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Enrollment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>Charts placeholder.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exports</CardTitle>
          </CardHeader>
          <CardContent>CSV/PDF exports placeholder.</CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
