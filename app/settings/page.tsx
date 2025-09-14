"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Palette, Globe, Save, Camera } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [profile, setProfile] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@iitdelhi.ac.in",
    phone: "+91 98765 43210",
    college: "IIT Delhi",
    program: "Computer Science Engineering",
    semester: 3,
    bio: "Passionate computer science student interested in web development and AI.",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    assignmentReminders: true,
    goalUpdates: true,
    weeklyReports: false,
    courseUpdates: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    progressSharing: false,
    analyticsOptIn: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "Asia/Kolkata",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DashboardLayout currentPage="settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and application preferences</p>
          </div>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="space-y-2">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="default" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Palette className="w-4 h-4 mr-2" />
                    Appearance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Language & Region
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/student-avatar.png" alt={profile.name} />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input
                      id="college"
                      value={profile.college}
                      onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Input
                      id="program"
                      value={profile.program}
                      onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Current Semester</Label>
                    <Input
                      id="semester"
                      type="number"
                      value={profile.semester}
                      onChange={(e) => setProfile({ ...profile, semester: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full p-3 border rounded-md resize-none h-20"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="assignment-reminders">Assignment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming deadlines</p>
                  </div>
                  <Switch
                    id="assignment-reminders"
                    checked={notifications.assignmentReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, assignmentReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="goal-updates">Goal Progress Updates</Label>
                    <p className="text-sm text-muted-foreground">Updates on your learning goals</p>
                  </div>
                  <Switch
                    id="goal-updates"
                    checked={notifications.goalUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, goalUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Progress Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of your activities</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="course-updates">Course Updates</Label>
                    <p className="text-sm text-muted-foreground">New materials and announcements</p>
                  </div>
                  <Switch
                    id="course-updates"
                    checked={notifications.courseUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other students</p>
                  </div>
                  <Switch
                    id="profile-visibility"
                    checked={privacy.profileVisibility}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisibility: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="progress-sharing">Share Progress</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your learning progress</p>
                  </div>
                  <Switch
                    id="progress-sharing"
                    checked={privacy.progressSharing}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, progressSharing: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics & Insights</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform with usage data</p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={privacy.analyticsOptIn}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, analyticsOptIn: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme or use system setting to match your device
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
