"use client"

import AdminShell from "@/components/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export default function AdminAffiliatePage() {
  return (
    <AdminShell title="Affiliate Dashboard" description="Track partners, payouts, and referrals." showRange>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-secondary" /> ₹45,230
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Active Partners</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">18</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Payouts Pending</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">₹8,400</CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
